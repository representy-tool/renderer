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
      case 'html': {
        return new Promise((resolve, reject) => {
          ejs.renderFile(filePath, payload, opts, (err, output) => {
            if (err) {
              return reject(err);
            }
            return resolve(output);
          });
        });
      }
      case 'markdown':
      case 'md': {
        const input = fs.readFileSync(filePath);
        return markdown.parse(input);
      }
      case 'pug':
      case 'jade': {
        return pug.renderFile(filePath, payload);
      }
      default:
        logger.error('Not supported ext for template engine');
    }
    return null;
  }
}

export default Renderer;
