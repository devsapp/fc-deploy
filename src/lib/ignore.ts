import path from 'path';
import globby from 'globby';
import { fse, lodash as _ } from '@serverless-devs/core';
import logger from '../common/logger';

const ignoredFile = ['.git', '.svn', '.env', '.DS_Store', 'template.packaged.yml', '.nas.yml', '.s/nas', '.s/tmp', '.s/package'];

function selectIgnored(runtime) {
  switch (runtime) {
    case 'nodejs6':
    case 'nodejs8':
    case 'nodejs10':
    case 'nodejs12':

      return ['.s/python'];
    case 'python2.7':
    case 'python3':

      return ['node_modules'];
    case 'php7.2':

      return ['node_modules', '.s/python'];
    default:
      return [];
  }
}

async function getIgnoreContent(ignoreFilePath: string): Promise<string> {
  let fileContent = '';

  if (fse.existsSync(ignoreFilePath)) {
    fileContent = await fse.readFile(ignoreFilePath, 'utf8');
  }
  return fileContent;
}

export async function isIgnoredInCodeUri(actualCodeUri: string, runtime: string): Promise<Function> {
  const ignoreFilePath = path.join(actualCodeUri, '.fcignore');

  const fileContent: string = await getIgnoreContent(ignoreFilePath);
  const fileContentList: string[] = fileContent.split('\n').filter((v) => !_.isEmpty(v));
  const ignoreDependencies = selectIgnored(runtime);

  const packageJsonFilePaths = (await globby([...ignoredFile, ...ignoreDependencies, ...fileContentList], {
    cwd: actualCodeUri,
    dot: true,
    absolute: true,
    onlyFiles: false,
    onlyDirectories: false,
    expandDirectories: false,
  })).map(item => path.resolve(item));

  return function (f) {
    return packageJsonFilePaths.includes(f);
  };
}

export async function isIgnored(baseDir: string, runtime: string, actualCodeUri: string, ignoreRelativePath?: string): Promise<Function> {
  const ignoreFilePath = path.join(baseDir, '.fcignore');

  const fileContent: string = await getIgnoreContent(ignoreFilePath);
  const fileContentList: string[] = fileContent.split('\n').filter((v) => !_.isEmpty(v));
  // 对于 build 后的构建物，会将 codeUri 中包含的子目录消除
  // 例如 codeUri: ./code，则 build 后，生成的 codeUri 为 ./.s/build/artifacts/${serviceName}/${functionName}
  // 因此需要将 .fcjgnore 中的路径对原始 codeUri 求相对路径后作为新的 ignore 内容
  if (ignoreRelativePath) {
    for (let i = 0; i < fileContentList.length; i++) {
      const fileIgnoreRelativePath = path.relative(ignoreRelativePath, fileContentList[i]);
      if (!fileIgnoreRelativePath.startsWith('..')) {
        fileContentList[i] = fileIgnoreRelativePath;
      } else {
        logger.debug(`Error: ignore start '..', fileIgnoreRelativePath: ${fileIgnoreRelativePath}, ignoreRelativePath: ${ignoreRelativePath}, fileContentList[i]: ${fileContentList[i]}`);
      }
    }
  }
  const ignoreDependencies = selectIgnored(runtime);

  const packageJsonFilePaths = (await globby([...ignoredFile, ...ignoreDependencies, ...fileContentList], {
    cwd: actualCodeUri,
    dot: true,
    absolute: true,
    onlyFiles: false,
  })).map(item => path.resolve(item));;

  return function (f) {
    return packageJsonFilePaths.includes(f);
  };
}
