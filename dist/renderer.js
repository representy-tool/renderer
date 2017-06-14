'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logWith = require('log-with');

var _logWith2 = _interopRequireDefault(_logWith);

var _markdown = require('markdown');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pug = require('pug');

var _pug2 = _interopRequireDefault(_pug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = (0, _logWith2.default)(module);

class Renderer {

  static render(payload, options = {}) {
    const file = options.file;
    if (_lodash2.default.isEmpty(file)) {
      return null;
    }
    const context = Renderer.readFile(file);
    if (!context) {
      return null;
    }
    const engine = Renderer.getEngine(options, file);
    return Renderer.renderByEngine(engine, context, payload);
  }

  static renderByEngine(engine, context, payload) {
    switch (engine) {
      case 'ejs':
      case 'html':
        return Renderer.ejs(context, payload);
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
    if (_lodash2.default.isEmpty(engine)) {
      engine = _path2.default.extname(file).slice(1);
    }
    return engine;
  }

  static readFile(file) {
    try {
      const filePath = _path2.default.resolve(process.cwd(), file);
      return _fs2.default.readFileSync(filePath).toString();
    } catch (e) {
      return null;
    }
  }

  static ejs(context, payload, opts) {
    return _ejs2.default.render(context, payload, opts).trim();
  }

  static md(context, payload) {
    return _lodash2.default.template(_markdown.markdown.toHTML(context))(payload);
  }

  static pug(context, payload) {
    return _pug2.default.render(context, payload);
  }
}

exports.default = Renderer;