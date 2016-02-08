import {
  CREATE_TASK_ERROR,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
  DELETE_TASK_SUCCESS,
  UPDATE_TASK_ERROR,
  UPDATE_TASK_SUCCESS
} from './action-types';

const initialState = {
	items: []
};

export function storiesReducer(state=initialState, action) {
	switch(action.type) {
		case CREATE_TASK_SUCCESS:
			return {
				items: [ action.payload, ...state.items ]
			};

		case UPDATE_TASK_SUCCESS:
			return {
				items: items.map(i => {
					return i.key === action.payload.key ? action.payload : i;
				})
			}

		case DELETE_TASK_SUCCESS:
			return {
				items: items.filter(i => {
					return i.key !== action.payload.key;
				})
			}

		// ???
		/*
		case SIGN_OUT_SUCCESS:
			return state;
		*/

		default:
			return state;
	}
}