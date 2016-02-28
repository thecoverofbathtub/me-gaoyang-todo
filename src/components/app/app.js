import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { POST_SIGN_IN_PATH, POST_SIGN_OUT_PATH } from 'config';
import { authActions } from 'modules/auth';

export class App extends Component {

	constructor(props, context) {
		super(props, context);
		this.signOut = this.signOut.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const { auth, history } = this.props;

		// signing out
		if (auth.authenticated && !nextProps.auth.authenticated) {
			history.replaceState(null, POST_SIGN_OUT_PATH);
		}
		else if (!auth.authenticated && nextProps.auth.authenticated) {
			history.replaceState(null, POST_SIGN_IN_PATH);
		}
	}

	signOut() {
		this.props.signOut();
		window.location.replace('/');
	}

	render() {
		const { auth, children } = this.props;
		return (
			<div>
				<header className="header">
					<div className="g-row">
						<div className="g-col">
                            <div className="header__title">
                                <i className="header__title fi-checkbox"></i>
							    <a href="http://todo.gaoyang.me">
									<h1 className="header__title">TODO</h1>
								</a>
                            </div>
                            <ul className="header__links">
                                {
                                    auth.authenticated ?
                                    <li><button className="header__button" onClick={this.signOut} type="button">
                                        Log out
                                    </button></li> :
                                    null
                                }
                                <li><a className="header__link--author" href="http://gaoyang.me">
                                    <i className="header__link--author fi-home"></i>
                                </a></li>
                            </ul>
						</div>
					</div>
				</header>

				<main className="main">{children}</main>
			</div>
		);
	}
}

// history is auto inherited with react-router set up
App.propTypes = {
	auth: PropTypes.object.isRequired,
	children: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	signOut: PropTypes.func.isRequired
};

// uses auth modules
export default connect(state => ({
	auth: state.auth
}), authActions)(App);