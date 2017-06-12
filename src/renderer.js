import _ from 'lodash';
import logWith from 'log-with';
import path from 'path';

const logger = logWith(module);

class Renderer {

  static async render(payload, options) {
    if (_.isEmpty(options.engine)) {
      options.engine = path.extname(options.file).slice(1);
    }
    switch (options.engine) {
      case 'ejs':
      case 'html':
        options.engine = 'ejs';
        break;
      case 'markdown':
      case 'md':
        options.engine = 'markdown';
        break;
      case 'pug':
      case 'jade':
        options.engine = 'pug';
        break;
      default:
        logger.error('Not supported ext for template engine');
    }

  }
}

export default Renderer;
