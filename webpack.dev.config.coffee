_ = require 'underscore'

module.exports = _(require './webpack.config')
.chain()
.clone()
.extend
    output:
        path: '/',
        filename: '/dashboard/scripts/[name].js'
    devtool: 'cheap-module-inline-source-map'
    plugins: []
.value()