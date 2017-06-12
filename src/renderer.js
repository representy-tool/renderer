import ejs from 'ejs';
import _ from 'lodash';
import logWith from 'log-with';
import { markdown } from 'markdown';
import path from 'path';
import pug from 'pug';

const logger = logWith(module);

class Renderer {

  static async render(payload, options) {
    if (_.isEmpty(options.engine)) {
      options.engine = path.extname(options.file).slice(1);
    }
    const filePath = path.resolve(process.cwd(), options.file);
    switch (options.engine) {
      case 'ejs':
      case 'html':
        options.engine = 'ejs';
        return new Promise((resolve, reject) => {
          ejs.renderFile(filePath, payload, options.options, (err, output) => {
            if (err) {
              return reject(err);
            }
            return resolve(output);
          })
        });
        break;
      case 'markdown':
      case 'md':
        options.engine = 'markdown';
        const input = fs.readFileSync(filePath);
        return markdown.parse(input);
        break;
      case 'pug':
      case 'jade':
        options.engine = 'pug';
        return pug.renderFile(filePath, payload);
        break;
      default:
        logger.error('Not supported ext for template engine');
    }

  }
}

export default Renderer;
