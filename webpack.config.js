const webpack = require('webpack');
module.exports = {
    entry: {
        example: "./public/scripts/example/main",
        main: ["./public/scripts/dashboard/Dashboard"]
    },
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
    devtool: "#source-map",
    output: {
        path: "./dist/",
        filename: '[name].js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
};