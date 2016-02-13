import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';

// Config
import { SIGN_IN_PATH, HOME_PATH } from 'config';

// Components
import App from './app/app';
import SignIn from './sign-in/sign-in'
import Home from './home/home'

export class Root extends Component {
	
	render() {
		const { store, history, onEnter } = this.props;

		return (
			<Provider store={store}>
				<Router history={history}>
					<Route component={App} onEnter={onEnter} path="/">
						<Route component={SignIn} path={SIGN_IN_PATH} />
						<Route component={Home} path={HOME_PATH} />
					</Route>
				</Router>
			</Provider>
		);
	}
}

Root.propTypes = {
	store: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	onEnter: PropTypes.func.isRequired
};