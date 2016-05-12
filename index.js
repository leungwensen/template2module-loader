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

var lang = require('zero-lang');
var loaderUtils = require('loader-utils');
var tpl2mod = require('template2module');

module.exports = function (source) {
    var loaderContext = this;

    var loaderOptions = loaderUtils.parseQuery(loaderContext.query);
    var userOptions = loaderContext.options['template2module-loader'];
    var defaultOptions = {
        engine: 'underscore',
        format: 'commonjs',
        outerScopeVars: [],
        preOuterScope: 'var _ = require("underscore");',
    };

    var options = lang.extend({}, defaultOptions, loaderOptions, userOptions);

    loaderContext.cacheable && loaderContext.cacheable();

    var tplEngine = tpl2mod.engines[options.engine] || tpl2mod.engines.underscore;
    var modFormat = options.format || 'commonjs';
    var preOuterScope = options.preOuterScope;

    lang.each(options.outerScopeVars || [], function (name) {
        tplEngine.outerScopeVars[name] = true;
    });
    tplEngine.render = function (str, moduleName) {
        var resultStr = tpl2mod.Engine.prototype.render.call(this, str, moduleName, modFormat);
        return preOuterScope + resultStr;
    };
    return tplEngine.render(source);
};

