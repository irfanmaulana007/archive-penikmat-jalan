import React, { Component } from 'react'

class FormGroup extends Component {
	render () {
		return (
			<div className="form-group">
				<label htmlFor={this.props.name} className="text-capitalize">{this.props.name}</label>

				{this.props.type === "textarea" ?
					<textarea 
						className="form-control" 
						name={this.props.name} 
						rows={this.props.rows} 
						onChange={this.props.onChange}>
							{this.props.value}
					</textarea>
				:
					<input 
						className={`form-control ` + this.props.class}
						type={this.props.type} 
						ref={this.props.refs}
						name={this.props.name}
						value={this.props.value}
						placeholder={this.props.placeholder}
						multiple={this.props.multiple}
						onChange={this.props.onChange} />
				} 
			</div>
		)
	}
}

export default FormGroup