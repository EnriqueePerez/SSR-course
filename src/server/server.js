/* eslint-disable global-require */
import express from 'express';
import webpack from 'webpack';

require('dotenv').config();

const app = express();

if (process.env.ENV === 'development') {
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig); //executing webpack with its configurations
  const serverConfig = { port: process.env.PORT, hot: true }; //declaring the port and enabling hot reload in dev server

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
}

app.get('*', (req, res) => {
  res.send(`<!DOCTYPE html>
  <html>
    <head>
      <link rel="stylesheet" href="assets/app.css" type="text/css"/>  
      <title>Platzi Video</title>
    </head>
    <body>
      <div id="app"></div>
    </body>
    <script src="assets/app.js" type="text/javascript"></script>
  </html>`);
});

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  else {
    console.log(
      // eslint-disable-next-line comma-dangle
      `Server is running on port ${process.env.PORT} and in ${process.env.ENV} mode`
    );
  }
});
