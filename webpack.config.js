const webpack = require("webpack")
const _ = require("lodash")
const path = require("path")

const base = {
    mode: "production",
    module: {
        rules: [
            { test: /.json/, loader: "json-loader", exclude: /node_modules/ },
            { test: /.jsx$/, loader: "babel-loader", exclude: /node_modules/ }
        ]
    },
    resolve: {
        extensions: [".js", ".json", ".jsx"]
    },
    devtool: "source-map"
}

const example = _.extend({}, base, {
    entry: {
        example: [
            "@babel/polyfill",
            `${path.dirname(__filename)}/public/scripts/example/main`
        ]
    },
    output: {
        path: `${path.dirname(__filename)}/dist/`,
        filename: "[name].js",
        libraryTarget: "var"
    }
})

const lib = _.extend({}, base, {
    entry: {
        main: [
            "@babel/polyfill",
            `${path.dirname(__filename)}/public/scripts/dashboard/index`
        ]
    },
    output: {
        path: `${path.dirname(__filename)}/dist/`,
        filename: "[name].js",
        libraryTarget: "commonjs2"
    },
    externals: {
        react: "react",
        "react-dom": "react-dom",
        "react-transition-group": "react-transition-group"
    }
})

module.exports = [example, lib]
