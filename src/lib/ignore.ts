import path from 'path';
import globby from 'globby';
import { fse } from '@serverless-devs/core';
import readline from 'readline';
import logger from '../common/logger';


function selectIgnored(runtime: string) {
  const ignoredFile = ['.git', '.svn', '.env', '.DS_Store', 'template.packaged.yml', '.nas.yml', '.s/nas', '.s/tmp', '.s/package'];
  switch (runtime) {
    case 'nodejs6':
    case 'nodejs8':
    case 'nodejs10':
    case 'nodejs12':
      ignoredFile.push('.s/python');
      break;
    case 'python2.7':
    case 'python3':
      ignoredFile.push('node_modules');
      break;
    case 'php7.2':
      ignoredFile.push('node_modules', '.s/python');
      break;
    default:
      break;
  }
  logger.info(`Inject built in .fcignore rules: ${ignoredFile}`);
  return ignoredFile;
}

async function getIgnoreContent(ignoreFilePath: string): Promise<string[]> {
  if (fse.existsSync(ignoreFilePath)) {
    logger.debug(`Found ignore file at ${ignoreFilePath}`);
    return await new Promise((resolve, reject) => {
      const lines: string[] = [];

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

export async function isIgnoredInCodeUri(actualCodeUri: string, runtime: string): Promise<IsIgnored> {
  const ignoreFilePath = path.join(actualCodeUri, '.fcignore');

  const fileContentList: string[] = await getIgnoreContent(ignoreFilePath);
  const ignoreDependencies = selectIgnored(runtime);

  const packageJsonFilePaths = (await globby([...ignoreDependencies, ...fileContentList], {
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

export async function isIgnored(baseDir: string, runtime: string, actualCodeUri: string, ignoreRelativePath?: string): Promise<IsIgnored> {
  const ignoreFilePath = path.join(baseDir, '.fcignore');

  const fileContentList: string[] = await getIgnoreContent(ignoreFilePath);
  // 对于 build 后的构建物，会将 codeUri 中包含的子目录消除
  // 例如 codeUri: ./code，则 build 后，生成的 codeUri 为 ./.s/build/artifacts/${serviceName}/${functionName}
  // 因此需要将 .fcignore 中的路径对原始 codeUri 求相对路径后作为新的 ignore 内容
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

  const packageJsonFilePaths = (await globby([...ignoreDependencies, ...fileContentList], {
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

/**
 * A function used to test whether a file is ignored when deploying or not.
 *
 * @param file the file to be test
 * @return true: it is ignored. Otherwise it will be deployed to the remote.
 */
export type IsIgnored = (file: string) => boolean;
