import path from 'path';
import globby from 'globby';
import { fse, lodash as _ } from '@serverless-devs/core';
import readline from 'readline';
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

async function getIgnoreContent(ignoreFilePath: string): Promise<string[]> {
  if (fse.existsSync(ignoreFilePath)) {
    return await new Promise((resolve, reject) => {
      const lines = [];

      readline.createInterface({ input: fse.createReadStream(ignoreFilePath) })
        .on('line', (line) => {
          if (line?.length > 0) {
            lines.push(line);
          }
        })
        .on('close', () => resolve(lines))
        .on('error', reject);
    });
  }
  return [];
}

export async function isIgnoredInCodeUri(actualCodeUri: string, runtime: string): Promise<Function> {
  const ignoreFilePath = path.join(actualCodeUri, '.fcignore');

  const fileContentList: string[] = await getIgnoreContent(ignoreFilePath);
  const ignoreDependencies = selectIgnored(runtime);

  const packageJsonFilePaths = (await globby([...ignoredFile, ...ignoreDependencies, ...fileContentList], {
    cwd: actualCodeUri,
    dot: true,
    absolute: true,
    onlyFiles: false,
    onlyDirectories: false,
    expandDirectories: false,
  })).map((item) => path.resolve(item));

  return function (f) {
    return packageJsonFilePaths.includes(f);
  };
}

export async function isIgnored(baseDir: string, runtime: string, actualCodeUri: string, ignoreRelativePath?: string): Promise<Function> {
  const ignoreFilePath = path.join(baseDir, '.fcignore');

  const fileContentList: string[] = await getIgnoreContent(ignoreFilePath);
  // ?????? build ???????????????????????? codeUri ???????????????????????????
  // ?????? codeUri: ./code?????? build ??????????????? codeUri ??? ./.s/build/artifacts/${serviceName}/${functionName}
  // ??????????????? .fcjgnore ????????????????????? codeUri ?????????????????????????????? ignore ??????
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
    onlyDirectories: false,
    expandDirectories: false,
  })).map((item) => path.resolve(item));

  return function (f) {
    return packageJsonFilePaths.includes(f);
  };
}
