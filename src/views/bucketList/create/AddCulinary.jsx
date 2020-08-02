import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import store from './../../../store'
import { startLoading, stopLoading } from './../../../actions';

import FormGroup from './../../../components/utils/FormGroup';
import { culinaryService } from './../../../common/api.service';

let initState = {
	name: '',
	detail: ''
}

class AddCulinary extends Component {
	bucketListId = this.props.match.params.id;
	culinaryId = this.props.match.params.detailId;
    
    constructor (props) {
        super(props);
        this.state = {
            ...initState,
            redirect: false
        }
	}

	getCulinaryDetail = () => {
		store.dispatch(startLoading('Get Culinary Detail . . .'))

		culinaryService.detail(this.culinaryId)
		.then((res) => { 
			this.setState({
				name: res.data.name,
				detail: res.data.detail
			})
		 })
		.finally(() => store.dispatch(stopLoading()) )
	}

	componentDidMount () {
        if (this.culinaryId) {
			this.getCulinaryDetail();
        }
	}
  
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
	}
	
	handleSubmit = () => {
		const payload = {
			bucket_list_id: this.bucketListId,
			name: this.state.name,
			detail: this.state.detail
		}

		store.dispatch(startLoading('Storing data . . .'))

		if (!this.culinaryId) {
			culinaryService.create(payload)
			.finally(() => {
				store.dispatch(stopLoading())
                this.setState({ redirect: true })
			})
		} else {
			culinaryService.update(this.culinaryId, payload)
			.finally(() => {
				store.dispatch(stopLoading())
                this.setState({ redirect: true })
			})
		}
	}

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to={`/bucket-list/` + this.bucketListId + `/culinary`} />
        }
    }

	render () {
		return (
			<div>
				{this.renderRedirect()}
				<h3 className="text-center">Add Culinary</h3>

				{/* Begin Form */}
				<div className="row">
					<div className="col-8 offset-2">
						<FormGroup type="text" name="name" value={this.state.name} onChange={this.handleInput} />
						<FormGroup type="textarea" name="detail" rows="5" value={this.state.detail} onChange={this.handleInput} />
					</div>
				</div>
				{/* end of Form */}
				
				<br/>
				<div className="row">
					<div className="col text-center">
						<button onClick={this.handleSubmit} className="border-radius-0 btn-wide btn btn-primary">Submit</button>
					</div>
				</div>
			</div>
		)
	}
}

export default AddCulinary;