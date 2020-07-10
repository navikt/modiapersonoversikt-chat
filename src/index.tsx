import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.less';
import Application from './application';
import store from './redux';

if (process.env.REACT_APP_MOCK_ENABLED === 'true') {
    require('./mock');
}


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Application />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
