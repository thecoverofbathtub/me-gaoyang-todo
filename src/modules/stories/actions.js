import {
  CREATE_TASK_ERROR,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
  DELETE_TASK_SUCCESS,
  UPDATE_TASK_ERROR,
  UPDATE_TASK_SUCCESS
} from './action-types';

export function createStory(title) {
	return (dispatch, getState) => {
		const { auth, firebase } = getState();

		firebase.child(`stories/${auth.id}`)
			.push({completed: false, title}, error => {
				if (error) {
					console.error('ERROR @ createStory :', error);
					dispatch({
						type: CREATE_TASK_ERROR,
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
						type: UPDATE_TASK_ERROR,
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
						type: DELETE_TASK_ERROR,
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

		ref.on('child_deleted', snapshot => dispatch({
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