import React from 'react';
import ReactDOM from 'react-dom/server';
interface iHead {title:string,meta:any}
const htmlTemplate = (content:string, head:iHead, state:any) => {
  return `
    <html lang="en">
      <head>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
        <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon">
        ${(process.env.NODE_ENV === 'development')? "":"<link rel='stylesheet' href='/bundle.css'/>"}
        ${head.title.toString()}
        ${head.meta.toString()}
      </head>
      <body>
        ${ReactDOM.renderToStaticMarkup(<div id="root" dangerouslySetInnerHTML={{ __html: content }}></div>)}
        ${ReactDOM.renderToStaticMarkup(<script dangerouslySetInnerHTML={{__html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')}`}}/>)}
        <script src="/bundle.js"></script>
      </body>
    </html>s
  `;
};

export default htmlTemplate;