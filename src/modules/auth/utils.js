import {
	INIT_AUTH,
	SIGN_IN_SUCCESS,
	SIGN_OUT_SUCCESS
} from './action-types';

import {
	POST_SIGN_IN_PATH,
	SIGN_IN_PATH
} from 'config';

const initialState = {
	authenticated: false,
	id: null
};

export function authReducer(state = initialState, action) {
	const { payload, meta } = action;

	switch (action.type) {
		case INIT_AUTH:
			let authenticated = payload !== null && (payload.expires * 1000) > meta.timestamp;
			return {
				authenticated,
				id: authenticated ? payload.uid : null
			}
		case SIGN_IN_SUCCESS:
			return {
				authenticated: true,
				id: payload.uid
			}
		case SIGN_OUT_SUCCESS:
			return {
				authenticated: false,
				id: null
			}
		default:
			return state;
	}
}

export function authRouteResolver(getState) {
	return (nextState, replace) => {
		const { auth } = getState();
		const { pathname } = nextState.location;
		
		if (!auth.authenticated && pathname !== SIGN_IN_PATH) {
			replace(null, SIGN_IN_PATH);
		}
		else if (auth.authenticated && pathname !== POST_SIGN_IN_PATH) {
			replace(null, POST_SIGN_IN_PATH);
		}
	};
}