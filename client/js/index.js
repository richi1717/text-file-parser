import '@richi1717/easter-eggs';
import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

Object.defineProperty(window, 'isProd', {
  value: process.env.NODE_ENV === 'production'
});

const render = () => {
  ReactDOM.render(
    <div>
      <App />
    </div>,
    document.getElementById('container')
  );
};

render();
