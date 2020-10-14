/* eslint-disable global-require */
import express from 'express';
import webpack from 'webpack';
import React from 'react';
import { renderToString } from 'react-dom/server'; //Funcion para renderear los componentes como string
import { Provider } from 'react-redux'; //redux
import { createStore } from 'redux'; //redux
import { renderRoutes } from 'react-router-config'; //router
import { StaticRouter } from 'react-router-dom'; //router
import serverRoutes from '../frontend/routes/serverRoutes';
import reducer from '../frontend/reducers'; //redux
import initialState from '../frontend/initialState'; //redux

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

const setResponse = (html, preloadedState) => {
  return `<!DOCTYPE html>
  <html>
    <head>
      <link rel="stylesheet" href="assets/app.css" type="text/css"/> 
      <title>Platzi Video</title>
    </head>
    <body>
      <div id="app">${html}</div>
    </body>
    <script src="assets/app.js" type="text/javascript"></script>
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
        /</g,
        '\\u003c'
      )}
    </script>
  </html>`;
};

const renderApp = (req, res) => {
  const store = createStore(reducer, initialState);
  const preloadedState = store.getState(); //preparing the state to be send via response
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        {renderRoutes(serverRoutes)}
      </StaticRouter>
    </Provider>
  );
  //con esta funcion preparamos el provider para el redux y el router,
  //dentro del router colocamos la funcion renderRoutes y le pasamos el archivo de las rutas
  res.send(setResponse(html, preloadedState)); // Sending the component and the state
};

app.get('*', renderApp);

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  else {
    console.log(
      // eslint-disable-next-line comma-dangle
      `Server is running on port ${process.env.PORT} and in ${process.env.ENV} mode`
    );
  }
});
