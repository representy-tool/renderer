import ejs from 'ejs';
import fs from 'fs';
import _ from 'lodash';
import logWith from 'log-with';
import { markdown } from 'markdown';
import path from 'path';
import pug from 'pug';

const logger = logWith(module);

class Renderer {

  static async render(payload, options = {}) {
    const file = options.file;
    if (_.isEmpty(file)) {
      return null;
    }
    let engine = options.engine;
    if (_.isEmpty(engine)) {
      engine = path.extname(file).slice(1);
    }
    const filePath = path.resolve(process.cwd(), file);
    switch (engine) {
      case 'ejs':
      case 'html':
        return this.ejs(filePath, payload, options.options);
      case 'markdown':
      case 'md':
        return this.md(filePath);
      case 'pug':
      case 'jade':
        return this.pug(filePath, payload);
      default:
        logger.error('Not supported ext for template engine');
        return null;
    }
  }

  static ejs(filePath, payload, opts) {
    return new Promise((resolve, reject) => {
      ejs.renderFile(filePath, payload, opts,
        (err, output) => (err ? reject(err) : resolve(output)));
    });
  }

  static md(filePath) {
    return markdown.parse(fs.readFileSync(filePath));
  }

  static pug(filePath, payload) {
    return pug.renderFile(filePath, payload);
  }
}

export default Renderer;
