// main.js
import Firebase from 'firebase'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import { FIREBASE_URL } from 'config';
import { Root } from 'components/root';
import { authActions, authRouteResolver } from 'modules/auth';
import createStore, { history } from 'init'

const store = createStore({
	firebase: new Firebase(FIREBASE_URL)
});

store.dispatch(authActions.initAuth());

ReactDOM.render(
	<Root store={store} history={history} onEnter={authRouteResolver(store.getState)} />,
    document.getElementById('app-root')
);
