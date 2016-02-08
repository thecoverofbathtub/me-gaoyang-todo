import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { storiesActions } from 'modules/stories';

export class Home extends Component {

	componentWillMount() {
		this.props.registerFirebaseListeners();
	}

	render() {
		return (
			<div>HOME</div>
		);
	}
}

export default connect(state => ({
	stories : state.stories.items    // use items instead of entire stories state
}), storiesActions)(Home);