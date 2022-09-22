import {IsIgnored, isIgnoredInCodeUri} from "../../src/lib/ignore";

import os from "os";
import fs from "fs";
import path from "path";

let workspace: string;
let dotFcIgnore: string;

beforeEach(async () => {
  workspace = path.join(os.tmpdir(), '/fc-deploy/is-ignored-playground');
  fs.rmSync(workspace, {recursive: true, force: true});
  fs.mkdirSync(workspace, {recursive: true});
  dotFcIgnore = `${workspace}/.fcignore`;
})

describe('isIgnoredInCodeUri should works', function () {

  test('it can ignore js map in sub dir', async function () {
    let pattern = 'dist/**/**.js.map';
    fs.writeFileSync(dotFcIgnore, pattern);

    fs.mkdirSync(`${workspace}/dist/abc`, {recursive: true});

    let file = path.join(workspace, '/dist/abc/index.js.map');
    fs.writeFileSync(file, '');

    let isIgnored: IsIgnored = await isIgnoredInCodeUri(workspace, 'custom');
    expect(isIgnored(file)).toBeTruthy();
  });
});
