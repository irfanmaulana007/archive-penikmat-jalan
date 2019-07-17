import React, { Component } from 'react'

class FormGroup extends Component {
	render () {
		return (
			<div className="form-group">
				<label htmlFor={this.props.name} className="text-capitalize">{this.props.name}</label>
				<input type={this.props.type} id={this.props.name} className="form-control" name={this.props.name} value={this.props.value} placeholder={this.props.placeholder} onChange={this.props.change} />
			</div>
		)
	}
}

export default FormGroup