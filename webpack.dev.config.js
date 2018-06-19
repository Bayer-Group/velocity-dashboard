const _ = require("lodash")
const path = require("path")

module.exports = _
    .chain(require("./webpack.config")[0])
    .clone()
    .extend({
        mode: "development",
        output: {
            path: `${path.dirname(__filename)}/public/scripts/`,
            filename: "[name].js"
        },
        devtool: "cheap-module-inline-source-map",
        plugins: []
    })
    .value()
