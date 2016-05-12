/**
 * transforming templates into js modules
 * @function
 * @param {string} content, string format of the file content
 * @return {string} compiled module
 * @example
 * // in webpack.config.js
 * loaders: [{
 *   test: /\.(apl|html|tpl|ztpl)(\?.+)?$/,
 *   loader: 'template2module-loader',
 *   exclude: /demo/,
 *   query: {
 *     engine: 'underscore',
 *     format: 'commonjs',
 *     outerScopeVars: [
 *       'translate',
 *       '_',
 *     ],
 *     preOuterScope: [
 *       'var translate = require("zero-text/i18n").translate;',
 *       'var _ = require("underscore");',
 *     ].join('\n'),
 *   }
 * }]
 */

var tpl2mod = require('template2module');
var lang = require('zero-lang');

module.exports = function (content) {
    var self = this;
    var query = self.query;
    var tplEngine = tpl2mod.engines[query.engine] || tpl2mod.engines.zero;
    var modFormat = query.format || 'commonjs';
    var preOuterScope = query.preOuterScope || '';

    lang.each(query.outerScopeVars || [], function (name) {
        tplEngine.outerScopeVars[name] = true;
    });
    tplEngine.render = function (str, moduleName) {
        var resultStr = Engine.prototype.render.call(this, str, moduleName, modFormat);
        return preOuterScope + resultStr;
    };
    return tplEngine.render(content);
};

