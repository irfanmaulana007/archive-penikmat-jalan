import React, { Component } from 'react'

class MessageAlert extends Component {
	render () {
		return (
			<div className="form-group">
				<div className="alert alert-danger alert-dismissible fade show">
				    <strong>{this.props.title}!</strong> {this.props.message}
				</div>
			</div>
		)
	}
}

export default MessageAlert