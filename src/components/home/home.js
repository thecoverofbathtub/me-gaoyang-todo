import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Modules
import { storiesActions } from 'modules/stories';

// Components
import { StoryList } from './story-list';

export class Home extends Component {

    constructor(props, context) {
        super(props, context);

        this.onKeyUp = this.onKeyUp.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

	componentWillMount() {
		this.props.registerFirebaseListeners();
	}

    clearInput() {
        this.refs.titleInput.value = "";
    }

    onKeyUp(e) {
        switch (e.key) {
            case 'Escape': this.clearInput(); break;
            case 'Enter': this.onSubmit(); break;
            default: return;
        }
    }

    onSubmit() {
        var title = this.refs.titleInput.value;
        if (title) {
            const { createStory } = this.props;
            createStory(this.refs.titleInput.value);
        }
        this.clearInput();
    }

	render() {
		const { stories, deleteStory } = this.props;

		return (
			<div className="g-row">
				<div className="g-col">
					<div className="story-form">
                        <input
                        autoComplete="off"
                        autoFocus
                        className="story-form__input"
                        maxLength="128"
                        placeholder="Show me what you got!"
                        type="text"
                        ref="titleInput"
                        onKeyUp={this.onKeyUp}
                        />
                    </div>
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