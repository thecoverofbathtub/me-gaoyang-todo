import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Modules
import { storiesActions } from 'modules/stories';

// UI
import Clipboard from 'clipboard';

export class StoryList extends Component {

    componentWillMount() {
        // Clipboard button setup
        const clipboard = new Clipboard('.clipboard', {
            text: function(trigger) {
                return trigger.getAttribute('aria-label');
            }
        });

        clipboard.on('success', function(e) {
            console.info('Action:', e.action);
            console.info('Text:', e.text);
            console.info('Trigger:', e.trigger);

            e.clearSelection();
        });

        clipboard.on('error', function(e) {
            console.error('Action:', e.action);
            console.error('Trigger:', e.trigger);
        });

        this.clipboard = clipboard;
    }

    componentWillUnmount() {
        // Destroy clipboard
        this.clipboard.destroy();
    }

	render() {
		const { stories, deleteStory } = this.props;

		return (
			<div className="story-list">
				{
					stories.map(s =>
						<div className="g-row" key={s.key}>
							<p className="story__item">
                                {s.title}
                            </p>
                            <div className="story__buttons">
                                <button
                                    className="story__button clipboard"
                                    aria-label={s.title}
                                >
                                    Copy to clipboard
                                </button>
                                <button
                                    className="story__button"
                                    onClick={() => {
                                        deleteStory(s);
                                    }}
                                    type="button">
                                    Delete
                                </button>
                            </div>
                        </div>
					)
				}
			</div>
		);
	}
}

StoryList.propTypes = {
	stories: PropTypes.array.isRequired,
    deleteStory: PropTypes.func.isRequired
};

export default connect(state => ({
    stories : state.stories.items    // use items instead of entire state
}), storiesActions)(StoryList);
