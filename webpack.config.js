var path = require('path');

module.exports = {
    entry: {
        'index': path.resolve(__dirname, './test/index.js')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    resolveLoader: {
        alias: {
            'template2module-loader': path.resolve('./index')
        }
    },
    module: {
        loaders: [
            {
                test: /\.(html|tpl)$/,
                loader: 'template2module-loader',
                exclude: /demo/,
                query: {
                    engine: 'underscore',
                    format: 'commonjs',
                    outerScopeVars: [
                        '_'
                    ],
                    preOuterScope: [
                        'var _ = require("underscore");'
                    ].join('\n')
                }
            }
        ]
    }
};
