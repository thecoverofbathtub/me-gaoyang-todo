import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export class Home extends Component {

	render() {
		return (
			<div>HOME</div>
		);
	}
}

// uses auth modules
export default connect(state => ({
	auth: state.auth
}))(Home);