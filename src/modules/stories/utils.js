import {
  CREATE_STORY_ERROR,
  CREATE_STORY_SUCCESS,
  DELETE_STORY_ERROR,
  DELETE_STORY_SUCCESS,
  UPDATE_STORY_ERROR,
  UPDATE_STORY_SUCCESS
} from './action-types';

const initialState = {
	items: []
};

export function storiesReducer(state=initialState, action) {
	switch(action.type) {
		case CREATE_STORY_SUCCESS:
			return {
				items: [ action.payload, ...state.items ]
			};

		case UPDATE_STORY_SUCCESS:
			return {
				items: items.map(i => {
					return i.key === action.payload.key ? action.payload : i;
				})
			}

		case DELETE_STORY_SUCCESS:
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