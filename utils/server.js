'use strict';

var downsize = require('downsize');
var React = require('react');
var HtmlComponent = React.createFactory(require('../content/themes/blablabla/Html'));

module.exports = {
  detectEnvironment: function() {
    return process.env.NODE_ENV || 'development';
  },
  excerpt: function(md) {
    var res;
    res = md.replace(/<\/?[^>]+>/gi, '');
    res = res.replace(/(\r\n|\n|\r)+/gm, ' ');
    return downsize(res, {
      'words': 50
    });
  },
  render: function(res, markup, state) {
    state = state || res.locals.state;
    var html = React.renderToStaticMarkup(HtmlComponent({ //jshint ignore:line
      state: state,
      markup: markup
    }));
    res.set({
      'content-type': 'text/html; charset=utf-8'
    });
    res.write('<!doctype>' + html);
    res.end();
  }
};
