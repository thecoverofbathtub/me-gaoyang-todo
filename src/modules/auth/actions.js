import {
	INIT_AUTH,
	SIGN_IN_SUCCESS,
	SIGN_OUT_SUCCESS
} from './action-types';

function authenticateWithThirdParty(provider) {
	return (dispatch, getState) => {
		const { firebase } = getState();

		firebase.authWithOAuthPopup(provider, (error, authData) => {
			if (error) {
				console.error('ERROR @ authWithOAuthPopup :', error);
				// alert('Unable to sign in with ' + provider);
			}
			else {
				dispatch({
					type: SIGN_IN_SUCCESS,
					payload: authData,
					meta: {
						timestamp: Date.now()
					}
				});
			}
		});
	};
}

export function initAuth() {
	return (dispatch, getState) => {
		const { firebase } = getState();
		dispatch({
			type: INIT_AUTH,
			payload: firebase.getAuth(),
			meta: {
				timestamp: Date.now()
			}
		});
	};
}

export function signInWithGoogle() {
	return authenticateWithThirdParty('google');
}

export function signInWithFacebook() {
	return authenticateWithThirdParty('facebook');
}

export function signOut() {
	return (dispatch, getState) => {
		const { firebase } = getState();
		firebase.unauth();
		dispatch({
			type: SIGN_OUT_SUCCESS
		});
	};
}