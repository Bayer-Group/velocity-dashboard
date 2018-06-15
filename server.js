
const express = require('express');
const compression = require('compression');
const path = require("path")

const appBaseUrl = '/dashboard';

const app = express();
app.use(compression());

if (process.env.NODE_ENV !== 'production') {
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const middlewareOptions = {
        stats: {colors: true},
        noInfo: true, // Comment this out for more verbose webpack information
        publicPath: `${appBaseUrl}/scripts/`
    }
    
    const compiler = webpack(require('./webpack.dev.config'))
    app.use(webpackDevMiddleware(compiler, middlewareOptions));

    const lessMiddleware = require('less-middleware');
    app.use(`${appBaseUrl}/styles`, lessMiddleware('./public/styles'));
}

app.use(`${appBaseUrl}/styles`, express.static(path.join(__dirname, 'public/styles')));
app.use(`${appBaseUrl}/scripts`, express.static(path.join(__dirname, 'public/scripts')));
app.use(`${appBaseUrl}/font`, express.static(path.join(__dirname, './node_modules/weather-icons/font')));
app.use(`${appBaseUrl}/styles/fonts`, express.static(path.join(__dirname, './node_modules/font-awesome/fonts')));

const generateHtml = () => `
    <!DOCTYPE html>
    <html>
    <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <title>velocity-dashboard</title>
    <link rel="stylesheet" href="${appBaseUrl}/styles/font-awesome.css"/>
    <link rel="stylesheet" href="${appBaseUrl}/styles/style.css"/>
    </head>
            <body>
                <div class="nav"></div>
                <div class="contents"></div>
                <script type="text/javascript" src="${appBaseUrl}/scripts/example.js"></script>
            </body>
    </html>
    `

app.get(`/*`, (req, res) => {
    res.send(generateHtml())
})

const port = parseInt((process.env.PORT || 3000), 10);

var server = app.listen(port, function() {
    const address = server.address();
    const url = `http://${address.host || 'localhost'}:${port}`;
    return console.info(`Listening at ${url}`);
});