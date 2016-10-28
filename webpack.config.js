const webpack = require('webpack');
const _ = require('underscore');

const base = {
    module: {
        loaders: [
            {test: /.json/, loader: 'json'},
            {test: /.coffee$/, loader: 'coffee'},
            {test: /.cjsx$/, loaders: ['coffee', 'cjsx']}
        ]
    },
    resolve: {
        extensions: [
            '',
            '.js',
            '.json',
            '.coffee',
            '.cjsx'
        ]
    },
};

const example = _.extend({}, base, {
    entry: {
        example: "./public/scripts/example/main"
    },
    output: {
        path: "./dist/",
        filename: '[name].js',
        libraryTarget: 'var'
    }
});

const lib = _.extend({}, base, {
    entry: {
        main: ["./public/scripts/dashboard/index"]
    },
    output: {
        path: "./dist/",
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        'react': 'react',
        'react-dom' : 'react-dom',
        'react-addons-css-transition-group' : 'react-addons-css-transition-group'
    }
});

module.exports = [example, lib];