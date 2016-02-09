import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export class StoryList extends Component {

	render() {
		const { stories } = this.props;

		return (
			<div className="story-list">
				{
					stories.map(s =>
						<div key={s.key}>{s.title}</div>
					)
				}
			</div>
		);
	}
}

StoryList.propTypes = {
	stories: PropTypes.array.isRequired
};