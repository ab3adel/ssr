import express from 'express';
import path from 'path';
import helmet from 'helmet';
import App from '../client/src/App'
import template from './template'
import React from 'react';
import ReactDOM from 'react-dom/server';

const { JWT_SECRET } = process.env;




const root = path.join(__dirname, '../');

const app = express();

if(process.env.NODE_ENV === 'production') {
  app.use(helmet());
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "*.amazonaws.com"]
    }
  }));
  app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
}
app.use(
  (req, res, next) => {
    const options = { keys: ['Some random keys'] };
  
    next();
  }
);
if(process.env.NODE_ENV === 'development') {
  const devMiddleware = require('webpack-dev-middleware');
  const hotMiddleware = require('webpack-hot-middleware');
  const webpack = require('webpack');
  const config = require('../webpack.server.config');
  const compiler = webpack(config);
  app.use(devMiddleware(compiler));
  app.use(hotMiddleware(compiler));
}

app.use('/', express.static(path.join(root, 'dist/client')));
app.use('/uploads', express.static(path.join(root, 'uploads')));
app.get('*', async (req, res) => {
  
  let thecontext:any= {};
  const theApp = (<App location={req.url} context={thecontext}/>);
  const content = ReactDOM.renderToString(theApp);
  
    if (thecontext.url) {
      res.redirect(301, thecontext.url);
    } else {
      const head = {title:'',meta:''};
      res.status(200);
      res.send(`<!doctype html>\n${template(content, head, {})}`);
      res.end();
    }
 
});



app.listen(8000, () => console.log('Listening on port 8000!'));