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
    let engine = options.engine;
    if (_.isEmpty(engine)) {
      engine = path.extname(options.file).slice(1);
    }
    const filePath = path.resolve(process.cwd(), options.file);
    switch (engine) {
      case 'ejs':
      case 'html': {
        return new Promise((resolve, reject) => {
          ejs.renderFile(filePath, payload, options.options, (err, output) => {
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
