express = require 'express'
compression = require 'compression'
require 'jade'
_ = require 'underscore'

appBaseUrl = '/dashboard'

app = express()
app.set 'view engine', 'jade'
app.use compression()

if process.env.NODE_ENV isnt 'production'
    webpackDevMiddleware = require 'webpack-dev-middleware'
    webpack = require 'webpack'
    middlewareOptions =
        stats:
            colors: true
        noInfo: true  # Comment this out for more verbose webpack information
    app.use webpackDevMiddleware(webpack(require './webpack.dev.config'), middlewareOptions)

    lessMiddleware = require 'less-middleware'
    app.use "#{appBaseUrl}/styles", lessMiddleware('./public/styles')

app.use "#{appBaseUrl}/styles", express.static('./public/styles')
app.use "#{appBaseUrl}/scripts", express.static('./public/scripts')
app.use "#{appBaseUrl}/font", express.static('./node_modules/weather-icons/font')
app.use "#{appBaseUrl}/styles/fonts", express.static('./node_modules/font-awesome/fonts')

app.get '/*', (req, res) ->
    # template is not actually needed because we're not doing server-side rendering... you could pre-render
    # the template and send a string or just use a static page in coffeescript
    res.render 'page', {appBaseUrl, title: 'velocity-dashboard'}

port = parseInt (process.env.PORT or 3000), 10

server = app.listen port, ->
    address = server.address()
    url = "http://#{address.host or 'localhost'}:#{port}"
    console.info "Listening at #{url}"