import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './App.container';

import { Provider } from 'react-redux';
import store  from './redux/store';

if (process.env.NODE_ENV !== 'production') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {include: [/task/i]});
}

ReactDOM.render(
    <Provider store={store()}>
        <AppContainer />
    </Provider>,
    document.getElementById('root')
);