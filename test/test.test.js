import Renderer from '../src/renderer';

const files = {
  engine: {
    file: 'test/files/test.ejs',
    engine: 'html',
  },
  ejs: {
    file: 'test/files/test.ejs',
  },
  html: {
    file: 'test/files/test.html',
  },
  jade: {
    file: 'test/files/test.jade',
  },
  md: {
    file: 'test/files/test.md',
  },
  markdown: {
    file: 'test/files/test.markdown',
  },
  pug: {
    file: 'test/files/test.pug',
  },
  unknown: {
    file: 'test/files/test.unknown',
  },
  notExist: {
    file: 'test/files/test.notExist',
  },
};

const payload = {
  test: 'HMTL TEST',
};

const output = '<h6>HMTL TEST</h6>';

describe('Renderer.render', () => {
  test('no fıle', async () => {
    const result = await Renderer.render(payload);
    expect(result).toBeNull();
  });
  test('unknown fıle ext', async () => {
    const result = await Renderer.render(payload, files.unknown);
    expect(result).toBeNull();
  });
  test('unknown fıle path', async () => {
    const result = await Renderer.render(payload, files.notExist);
    expect(result).toBeNull();
  });
  test('with engine', async () => {
    const result = await Renderer.render(payload, files.engine);
    expect(result).toBe(output);
  });
  test('ejs', async () => {
    const result = await Renderer.render(payload, files.ejs);
    expect(result).toBe(output);
  });
  test('html', async () => {
    const result = await Renderer.render(payload, files.html);
    expect(result).toBe(output);
  });
  test('jade', async () => {
    const result = await Renderer.render(payload, files.jade);
    expect(result).toBe(output);
  });
  test('md', async () => {
    const result = await Renderer.render(payload, files.md);
    expect(result).toBe(output);
  });
  test('markdown', async () => {
    const result = await Renderer.render(payload, files.markdown);
    expect(result).toBe(output);
  });
  test('pug', async () => {
    const result = await Renderer.render(payload, files.pug);
    expect(result).toBe(output);
  });
});
