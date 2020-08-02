import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import _ from 'lodash';
import NumberFormat from 'react-number-format';

import store from './../../../store'
import { startLoading, stopLoading } from './../../../actions';

import FormGroup from './../../../components/utils/FormGroup';
import { categoryService, bucketListDetailService } from './../../../common/api.service';

let initState = {
	destination: '',
	category_id: '',
	price: '',
	detail: '',
	location: '',
}

class AddDestination extends Component {
	bucketListId = this.props.match.params.id;
	bucketListDetailId = this.props.match.params.bucketListDetailId;
	categoryList = [];
    
    constructor (props) {
        super(props);
        this.state = {
            ...initState,
            redirect: false
        }
	}

	getBucketListDetail = () => {
		store.dispatch(startLoading('Get Bucket List Detail . . .'))

		bucketListDetailService.getByID(this.bucketListDetailId)
		.then((res) => { 
			this.setState({
				destination: res.data.destination,
				category_id: res.data.category_id,
				price: res.data.price,
				detail: res.data.detail,
				location: res.data.location,
			})
		 })
		.finally(() => store.dispatch(stopLoading()) )
	}

	getCategoryList = () => {
		store.dispatch(startLoading('Get Category List . . .'))

		categoryService.get()
		.then((res) => { this.categoryList = _.sortBy(res.data, 'name') })
		.finally(() => store.dispatch(stopLoading()) )

	}

	componentDidMount () {
		this.getCategoryList();

        if (this.bucketListDetailId) {
			this.getBucketListDetail();
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
			destination: this.state.destination,
			category_id: this.state.category_id,
			price: this.state.price,
			detail: this.state.detail,
			location: this.state.location,
		}

		store.dispatch(startLoading('Storing data . . .'))

		if (!this.bucketListDetailId) {
			bucketListDetailService.create(payload)
			.finally(() => {
				store.dispatch(stopLoading())
                this.setState({ redirect: true })
			})
		} else {
			bucketListDetailService.update(this.bucketListDetailId, payload)
			.finally(() => {
				store.dispatch(stopLoading())
                this.setState({ redirect: true })
			})
		}
	}

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to={`/bucket-list/` + this.bucketListId + `/destination`} />
        }
    }
	
	render () {

		return (
			<div>
				{this.renderRedirect()}
				<h3 className="text-center">Add Destination</h3>

                {/* Begin Form */}
				<div className="row">
					<div className="col-8 offset-2">
						<FormGroup type="text" name="destination" value={this.state.destination} onChange={this.handleInput} />

						<div className="form-group">
							<label htmlFor="category_id">Category</label>
							<select name="category_id" className="form-control text-capitalize" value={this.state.category_id} onChange={this.handleInput}>
								<option value="0">Select Category</option>
								{this.categoryList.map((values, key) => 
									<option key={key} value={values.id}>{values.name}</option>
									)}
							</select>
						</div>

						<div className="form-group">
							<label htmlFor="category_id">Price</label>
							<NumberFormat name="price" className="form-control" value={this.state.price} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '}  onValueChange={(values) => {
								const { value } = values;
								this.setState({price: value})
							}} />
						</div>

						<FormGroup type="textarea" name="detail" rows="5" value={this.state.detail} onChange={this.handleInput} />
						<FormGroup type="textarea" name="location" rows="3" value={this.state.location} onChange={this.handleInput} />
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

export default AddDestination;