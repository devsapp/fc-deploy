
import parser from 'git-ignore-parser';
import ignore from 'ignore';
import * as fse from 'fs-extra';
import path from 'path';
import * as _ from 'lodash';

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

async function getIgnoreContent(ignoreFilePath) {
  let fileContent = '';

  if (fse.existsSync(ignoreFilePath)) {
    fileContent = await fse.readFile(ignoreFilePath, 'utf8');
  }
  return fileContent;
}

export async function isIgnored(baseDir, runtime) {
  const ignoreFilePath = path.join(baseDir, '.fcignore');

  const fileContent = await getIgnoreContent(ignoreFilePath);

  const ignoreDependencies = selectIgnored(runtime);

  // const ignoreList = await generateIgnoreFileFromNasYml(baseDir);

  const ignoredPaths = parser(`${[...ignoredFile, ...ignoreDependencies].join('\n')}\n${fileContent}`);

  const ig = ignore().add(ignoredPaths);
  return function (f) {
    const relativePath = path.relative(baseDir, f);

    if (relativePath === '') { return false; }
    return ig.ignores(relativePath);
  };
}

export async function updateIgnore(baseDir, patterns) {
  const ignoreFilePath = `${baseDir}/.fcignore`;

  const fileContent = await getIgnoreContent(ignoreFilePath);

  const lines = fileContent.split(/\r?\n/);

  for (let i = 0; i < patterns.length; i++) {
    if (!_.includes(lines, patterns[i])) {
      lines.push(patterns[i]);
    }
  }

  await fse.writeFile(ignoreFilePath, lines.join('\n'));
}
