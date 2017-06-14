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
    const context = Renderer.readFile(file);
    if (!context) {
      return null;
    }
    const engine = Renderer.getEngine(options, file);
    switch (engine) {
      case 'ejs':
      case 'html':
        return Renderer.ejs(context, payload, options.options);
      case 'markdown':
      case 'md':
        return Renderer.md(context, payload);
      case 'pug':
      case 'jade':
        return Renderer.pug(context, payload);
      default:
        logger.error('Not supported ext for template engine');
        return null;
    }
  }

  static getEngine(options, file) {
    let engine = options.engine;
    if (_.isEmpty(engine)) {
      engine = path.extname(file).slice(1);
    }
    return engine;
  }

  static readFile(file) {
    try {
      const filePath = path.resolve(process.cwd(), file);
      return fs.readFileSync(filePath).toString();
    } catch (e) {
      return null;
    }
  }

  static ejs(context, payload, opts) {
    return ejs.render(context, payload, opts).trim();
  }

  static md(context, payload) {
    return _.template(markdown.toHTML(context))(payload);
  }

  static pug(context, payload) {
    return pug.render(context, payload);
  }
}

export default Renderer;
