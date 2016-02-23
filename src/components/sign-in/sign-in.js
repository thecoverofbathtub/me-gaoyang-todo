import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { POST_SIGN_IN_PATH, POST_SIGN_OUT_PATH } from 'config';
import { authActions } from 'modules/auth';

export class SignIn extends Component {

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

	render() {
		const {
			auth,
			history,
			signInWithFacebook,
			signInWithGoogle,
			signOut
		} = this.props;

		return (
			<div className="g-row sign-in">
				<div className="g-col">
					<h1 className="sign-in__heading">Log in</h1>
					<button className="sign-in__button" onClick={signInWithFacebook} type="button">Facebook</button>
					<button className="sign-in__button" onClick={signInWithGoogle} type="button">Google</button>
				</div>
			</div>
		);
	}
}

SignIn.propTypes = {
	auth: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	signInWithFacebook: PropTypes.func.isRequired,
	signInWithGoogle: PropTypes.func.isRequired,
	signOut: PropTypes.func.isRequired
};

// uses auth actions to sign in and sign out
export default connect(state => ({
	auth: state.auth
}), authActions)(SignIn);