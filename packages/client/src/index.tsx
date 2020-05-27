import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from 'store';
import 'antd/dist/antd.css';
import history from 'browserHistory';

ReactDOM.render(
  <React.StrictMode>
    <App store={store} history={history} />
  </React.StrictMode>,
  document.getElementById('root')
);
