import React from 'react'

const FormGroup = (props) => {
	let inputElement = null

	switch (props.type) {
		case ('file'):
			inputElement = <input className={`form-control ` + props.className} {...props} />
			break

		case ('textarea'):
			inputElement = <textarea className={`form-control ` + props.className} {...props} />
			break

		default:
			inputElement = <input className={`form-control ` + props.className} {...props} autoComplete="off" />
	}

	return (
		<div>
			<div className="form-group">
				<label htmlFor={props.name} className="text-capitalize">{props.name}</label>
				{inputElement}
			</div>
		</div>
	)
	
}

export default FormGroup