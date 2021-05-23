import * as fse from 'fs-extra';
import * as path from 'path';
import * as core from '@serverless-devs/core';
import * as _ from 'lodash';
import { createProgressBar } from './utils/utils';
import { green, grey } from 'colors';
import archiver from 'archiver';
import { readLines, getFileHash } from './utils/file';


const isWindows: boolean = process.platform === 'win32';

export async function pack(file: string, codeignore: any, zipPath: any) {
  // const { zipPath } = await generateRandomZipPath();

  // const { count, compressedSize } = await packTo(file, codeignore, zipPath);
  await packTo(file, codeignore, zipPath);

  // get md5 of zip file and rename it with md5
  const zipFileHash = await getFileHash(zipPath);
  const zipPathWithMd5 = path.join(path.dirname(zipPath), `${zipFileHash}-${path.basename(zipPath)}`);
  await fse.rename(zipPath, zipPathWithMd5);

  return zipPathWithMd5;
}

async function packTo(file: string, codeignore: any, targetPath: string, prefix = '', zlibOptions = {}) {
  if (!(await fse.pathExists(file))) {
    throw new Error(`Zip file ${file} is not exist.`);
  }

  core.Logger.debug('FC-DEPLOY', `pack file is ${targetPath}, absFilePath is ${file}`);

  const stats = await fse.lstat(file);

  if (codeignore && codeignore(file)) {
    throw new Error(`File ${file} is ignored.`);
  }

  core.Logger.debug('FC-DEPLOY', `append ${stats.isFile() ? 'file' : 'folder'}: ${file}, absolute path is ${path.resolve(file)}`);

  const bar = createProgressBar(`${green(':zipping')} :bar :current/:total :rate files/s, :percent :etas`, { total: 0 });

  const output = fse.createWriteStream(targetPath);
  const zipArchiver = archiver('zip', {
    zlib: _.merge({
      level: 6,
    }, zlibOptions),
  }).on('progress', (progress) => {
    bar.total = progress.entries.total;
    bar.tick({
      total: progress.entries.processed,
    });
  }).on('warning', (err) => {
    console.warn(err);
  }).on('error', (err) => {
    console.error(`    ${green('x')} ${targetPath} - ${grey('zip error')}`);
    throw err;
  });

  // copied from https://github.com/archiverjs/node-archiver/blob/master/lib/core.js#L834-L877
  // but add mode support
  zipArchiver.symlink = function (filepath, target, { mode }) {
    const data = Object.assign({}, {
      type: 'symlink',
      name: filepath.replace(/\\/g, '/'),
      linkname: target.replace(/\\/g, '/'),
      sourceType: 'buffer',
    });

    if (mode) {
      Object.assign(data, {
        mode,
      });
    }

    this._entriesCount++;
    this._queue.push({
      data,
      source: new Buffer(0),
    });

    return this;
  };

  let count;

  zipArchiver.pipe(output);

  const asbFilePath = path.resolve(file);
  const isBootstrap = isBootstrapPath(asbFilePath, asbFilePath, true);

  if (stats.isFile()) {
    zipArchiver.file(asbFilePath, {
      name: path.basename(file),
      prefix,
      mode: (isBootstrap || isWindows) ? stats.mode | 73 : stats.mode, // add execution permission, the binary of 73 is 001001001
    });

    count = 1;
  } else if (stats.isDirectory()) {
    count = await zipFolder(zipArchiver, file, [], codeignore, file, prefix);
  } else {
    throw new Error(`File ${file} must be a regular file or directory.`);
  }

  return await new Promise((resolve, reject) => {
    output.on('close', () => {
      const compressedSize = zipArchiver.pointer();
      resolve({ count, compressedSize });
    });

    try {
      zipArchiver.finalize();
    } catch (err) {
      reject(err);
    }
  });
}

async function zipFolder(zipArchiver, folder, folders, codeignore, codeUri, prefix = '') {
  folders.push(folder);
  const absCodeUri = path.resolve(codeUri);
  const dir = path.join(...folders);
  const dirItems = await fse.readdir(dir);

  const absDir = path.resolve(dir);
  const relativeFromCodeUri = path.relative(absCodeUri, absDir);

  if (!_.isEmpty(relativeFromCodeUri)) {
    zipArchiver.append(null, {
      name: relativeFromCodeUri,
      type: 'directory',
      prefix,
    });
  }

  return (await Promise.all(dirItems.map(async (f) => {
    const fPath = path.join(dir, f);

    core.Logger.debug('FC-DEPLOY', `before zip: lstat fPath: ${fPath}, absolute fPath is ${path.resolve(fPath)}`);

    let s;

    try {
      s = await fse.lstat(fPath);
    } catch (error) {
      core.Logger.debug('FC-DEPLOY', `before zip: could not found fPath ${fPath}, absolute fPath is ${path.resolve(fPath)}, exception is ${error}, skiping`);
      return 0;
    }

    if (codeignore && codeignore(fPath)) {
      core.Logger.debug('FC-DEPLOY', `file ${fPath} is ignored.`);
      return 0;
    }

    const absFilePath = path.resolve(fPath);
    const relative = path.relative(absCodeUri, absFilePath);

    const isBootstrap = isBootstrapPath(absFilePath, absCodeUri, false);
    if (s.size === 1067) {
      const content = await readLines(fPath);
      if (_.head(content) === 'XSym' && content.length === 5) {
        const target = content[3];
        zipArchiver.symlink(relative, target, {
          mode: (isBootstrap || isWindows) ? s.mode | 73 : s.mode,
        });
        return 1;
      }
    }

    if (s.isFile() || s.isSymbolicLink()) {
      zipArchiver.file(fPath, {
        name: relative,
        prefix,
        mode: (isBootstrap || isWindows) ? s.mode | 73 : s.mode,
        stats: s, // The archiver uses fse.stat by default, and pasing the result of lstat to ensure that the symbolic link is properly packaged
      });

      return 1;
    } else if (s.isDirectory()) {
      return await zipFolder(zipArchiver, f, folders.slice(), codeignore, codeUri, prefix);
    }
    console.error(`Ignore file ${absFilePath}, because it isn't a file, symbolic link or directory`);
    return 0;
  }))).reduce(((sum, curr) => sum + curr), 0);
}

function isBootstrapPath(absFilePath, absCodeUri, isFile = true) {
  let absBootstrapDir;
  if (isFile) {
    absBootstrapDir = path.dirname(absCodeUri);
  } else {
    absBootstrapDir = absCodeUri;
  }
  return path.join(absBootstrapDir, 'bootstrap') === absFilePath;
}
