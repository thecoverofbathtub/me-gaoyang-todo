import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export class Home extends Component {

	componentWillMount() {
		this.props.registerListeners();
	}

	render() {
		return (
			<div>HOME</div>
		);
	}
}

export default connect(state => ({
	stories : state.stories.items    // use items instead of entire stories state
}))(Home);