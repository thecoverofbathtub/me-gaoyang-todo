import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { POST_SIGN_IN_PATH, POST_SIGN_OUT_PATH } from 'config';
import { authActions } from 'modules/auth';

export class SignIn extends Component {

	constructor(props, context) {
        super(props, context);

        this.onKeyUpEmail = this.onKeyUpEmail.bind(this);
        this.onKeyUpPassword = this.onKeyUpPassword.bind(this);
        this.signIn = this.signIn.bind(this);
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

    onKeyUpEmail(e) {
        switch (e.key) {
            case 'Escape':
                this.refs.signInEmail.value = ""; break;
            default: return;
        }
    }

    onKeyUpPassword(e) {
        switch (e.key) {
            case 'Escape':
                this.refs.signInPassword.value = ""; break;
            case 'Enter':
                this.signIn();
            default: return;
        }
    }

	signIn() {
        // check value
        const email = this.refs.signInEmail.value;
        const pw = this.refs.signInPassword.value;

        if (email.length !== 0 && pw.length !== 0) {
            const { signInWithEmail } = this.props;
            signInWithEmail(email, pw);

            // clear input boxes
            this.refs.signInEmail.value = "";
            this.refs.signInPassword.value = "";
        }
	}

	render() {
		const {
			signInWithFacebook,
			signInWithGoogle
		} = this.props;

		return (
			<div className="g-row sign-in">
				<div className="g-col">
					<h1 className="sign-in__heading">Log in</h1>
                    <input className="sign-in__email"
                           type="email"
                           autoComplete="off"
                           autoFocus
                           maxLength="64"
                           placeholder="Email"
                           ref="signInEmail"
                           onKeyUp={this.onKeyUpEmail}
                    />
                    <input className="sign-in__pw"
                           type="password"
                           autoComplete="off"
                           autoFocus
                           maxLength="64"
                           placeholder="Password"
                           ref="signInPassword"
                           onKeyUp={this.onKeyUpPassword}
                    />
					<button className="sign-in__button" onClick={this.signIn} type="button">Log in</button>
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