import ejs from 'ejs';
import fs from 'fs';
import _ from 'lodash';
import logWith from 'log-with';
import { markdown } from 'markdown';
import path from 'path';
import pug from 'pug';

const logger = logWith(module);

class Renderer {

  static async render(payload, options) {
    let engine = _.get(options, 'engine');
    const file = _.get(options, 'file');
    const opts = _.get(options, 'options') || {};

    if (_.isEmpty(file)) {
      return null;
    }
    if (_.isEmpty(engine)) {
      engine = path.extname(file).slice(1);
    }
    const filePath = path.resolve(process.cwd(), file);
    switch (engine) {
      case 'ejs':
      case 'html':
        return this.ejs(filePath, payload, opts);
      case 'markdown':
      case 'md':
        return this.md(filePath);
      case 'pug':
      case 'jade':
        return this.pug(filePath, payload);
      default:
        logger.error('Not supported ext for template engine');
    }
    return null;
  }

  static ejs(filePath, payload, opts) {
    return new Promise((resolve, reject) => {
      ejs.renderFile(filePath, payload, opts, (err, output) => {
        if (err) {
          return reject(err);
        }
        return resolve(output);
      });
    });
  }

  static md(filePath) {
    const input = fs.readFileSync(filePath);
    return markdown.parse(input);
  }

  static pug(filePath, payload) {
    return pug.renderFile(filePath, payload);
  }
}

export default Renderer;
