import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.scss';
import reportWebVitals from './reportWebVitals';
import smoothscroll from 'smoothscroll-polyfill';

(async function() {
  console.log('polyfill');
  smoothscroll.polyfill();

  if (!("scrollBehavior" in document.documentElement.style)) {
    await import('smoothscroll-anchor-polyfill');
  }
})();

ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('app')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
