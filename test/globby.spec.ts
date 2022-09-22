import globby from "globby";

// globby homepage: https://github.com/sindresorhus/globby
// how to config globby using fast-glob's options: https://github.com/mrmlnc/fast-glob#options-3

describe('it should found all txt under examples folder', function () {
  test('without any config', async function () {
    let found: Array<string> = await globby(['examples/**/**.txt']);
    console.info(`Found ${found}`);
    for (let item of found) {
      expect(item.endsWith('.txt')).toBeTruthy();
    }
  });

  test('with cwd specified', async function () {
    let found: Array<string> = await globby(['**/**.txt'], {
      cwd: 'examples' // https://github.com/mrmlnc/fast-glob#cwd
    });
    console.info(`Found ${found}`);
    for (let item of found) {
      expect(item.endsWith('.txt')).toBeTruthy();
    }
  });
});

describe('it could found files start with a dot', function () {
  test('when {dot: false}, then files start with a dot is ignored', async function () {
    let found = await globby(['*']);
    expect(found.filter(it => it.startsWith('.')).length).toBe(0);
  });

  test('when {dot: true}, then files start with a dot is included', async function () {
    let found = await globby(['*'], {dot: true});
    expect(found.filter(it => it.startsWith('.')).length).not.toBe(0);
  });
});
