import {
  CREATE_STORY_ERROR,
  CREATE_STORY_SUCCESS,
  DELETE_STORY_ERROR,
  DELETE_STORY_SUCCESS,
  UPDATE_STORY_ERROR,
  UPDATE_STORY_SUCCESS
} from './action-types';

export function createStory(title) {
	return (dispatch, getState) => {
		const { auth, firebase } = getState();
        encodeURIComponent(title);

		firebase.child(`stories/${auth.id}`)
			.push({completed: false, title}, error => {
				if (error) {
					console.error('ERROR @ createStory :', error);
					dispatch({
						type: CREATE_STORY_ERROR,
						payload: error
					});
				}
			});
	};
}

// update title or toggle completed
export function updateStory(story) {
	return (dispatch, getState) => {
		const { auth, firebase } = getState();

		firebase.child(`stories/${auth.id}`)
			.update(story, error => {
				if (error) {
					console.error('ERROR @ updateStory :', error);
					dispatch({
						type: UPDATE_STORY_ERROR,
						payload: error
					});
				}
			});
	};
}

export function deleteStory(story) {
	return (dispatch, getState) => {
		const { auth, firebase } = getState();

		firebase.child(`stories/${auth.id}/${story.key}`)
			.remove(error => {
				if (error) {
					console.error('ERROR @ deleteStory :', error);
					dispatch({
						type: DELETE_STORY_ERROR,
						payload: error
					});
				}
			});
	};
}

export function registerFirebaseListeners() {
	return (dispatch, getState) => {
		const { auth, firebase } = getState();
		const ref = firebase.child(`stories/${auth.id}`);

		ref.on('child_added', snapshot => dispatch({
			type: CREATE_STORY_SUCCESS,
			payload: unpackSnapshot(snapshot)
		}));

		ref.on('child_changed', snapshot => dispatch({
			type: UPDATE_STORY_SUCCESS,
			payload: unpackSnapshot(snapshot)
		}));

		ref.on('child_removed', snapshot => dispatch({
			type: DELETE_STORY_SUCCESS,
			payload: unpackSnapshot(snapshot)
		}));
	};
}

function unpackSnapshot(snapshot) {
	let record = snapshot.val();
	record.key = snapshot.key();
	return record;
}