module.exports = {
    entry: {
        'index': path.resolve(__dirname, './test/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.(apl|html|tpl|ztpl)(\?.+)?$/,
                loader: 'template2module-loader',
                exclude: /demo/,
                query: {
                    engine: 'underscore',
                    format: 'commonjs',
                    outerScopeVars: [
                        'translate',
                        '_'
                    ],
                    preOuterScope: [
                        'var translate = require("zero-text/i18n").translate;',
                        'var _ = require("underscore");'
                    ].join('\n')
                }
            }
        ]
    }
};
