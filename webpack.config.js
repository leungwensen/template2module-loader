var path = require('path');

module.exports = {
    entry: {
        'index': path.resolve(__dirname, './test/index.js')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    resolveLoader: { // this part is not necessary in your project.
        alias: {
            'template2module-loader': path.resolve('./index')
        }
    },
    module: {
        loaders: [
            {
                test: /\.(html|tpl)$/, // ext
                loader: 'template2module-loader',
                exclude: /demo/,
                query: {
                    engine: 'underscore', // the template engine you're using [anima|dot|micro|nano|underscore|zero] are supported
                    format: 'commonjs', // modularize format of the output module [amd|commonjs|esnext|umd]
                    // `outerScope` refers to the generated function in the target module
                    outerScopeVars: [ // global variables used in your templates
                        '_'
                    ],
                    preOuterScope: [ // code you want to add to every template (before the function body)
                        'var _ = require("underscore");'
                    ].join('\n')
                }
            }
        ]
    }
};
