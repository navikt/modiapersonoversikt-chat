import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import Application from './application';

if (process.env.REACT_APP_MOCK_ENABLED === 'true') {
    require('./mock');
}

ReactDOM.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>,
  document.getElementById('root')
);
