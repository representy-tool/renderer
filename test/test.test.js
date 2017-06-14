import Renderer from '../src/renderer';

const files = {
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
  pug: {
    file: 'test/files/test.pug',
  },
};

describe('Engines', () => {
  it('html', async () => {
    const payload = {
      test: 'HMTL TEST',
    };
    const result = await Renderer.render(payload, files.html);
    expect(result).toBe('<h6>HMTL TEST</h6>\n');
  });
});
