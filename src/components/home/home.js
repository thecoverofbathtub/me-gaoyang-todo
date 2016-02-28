import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Modules
import { storiesActions } from 'modules/stories';

// Components
import { StoryList } from './story-list';

export class Home extends Component {

	componentWillMount() {
		this.props.registerFirebaseListeners();
	}

	render() {
		const { stories, createStory, deleteStory } = this.props;

		return (
			<div className="g-row">
				<div className="g-col">
					<input
						autoComplete="off"
						autoFocus
						className="story-form__input"
						maxLength="128"
						placeholder="Show me what you got!"
						type="text"
						ref="titleInput"
						onKeyPress={e => {
							if (e.key === 'Enter') {
								var title = this.refs.titleInput.value;
								if (title) {
									createStory(this.refs.titleInput.value);
								}
								this.refs.titleInput.value = "";
							}
						}}
					/>
				</div>

				<div className="g-col">
					<StoryList
						stories={stories}
                        deleteStory={deleteStory}
					/>
				</div>
			</div>
		);
	}
}

Home.propTypes = {
	stories: PropTypes.array.isRequired
};

export default connect(state => ({
	stories : state.stories.items    // use items instead of entire state
}), storiesActions)(Home);