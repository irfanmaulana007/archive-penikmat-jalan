import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

import NumberFormat from 'react-number-format';

import store from './../../../store'
import { startLoading, stopLoading } from './../../../actions';

import FormGroup from './../../../components/utils/FormGroup';
import { bucketListService, categoryService } from './../../../common/api.service';

let initState = {
	country: '',
	destination: '',
	category_id: '',
	budget: 0
}

class BucketListCreate extends Component {
	bucketListId = this.props.match.params.id;
	categoryList = []

	constructor (props) {
		super(props)
		this.state = {
			...initState,
			redirect: false
		}
	}

	getBucketList = () => {
		store.dispatch(startLoading('Get Bucket List . . .'))

		bucketListService.detail(this.bucketListId)
		.then((res) => this.setState({ bucketList: res.data }) )
		.finally(() => store.dispatch(stopLoading()) )
	}

	getCategoryList = () => {
		store.dispatch(startLoading('Get Category List . . .'))

		categoryService.get()
		.then((res) => this.categoryList = res.data )
		.finally(() => store.dispatch(stopLoading()) )
	}

	componentDidMount () {
		this.getCategoryList();

		if (this.bucketListId) {
			this.getBucketList();
		}
	}
  
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
	}

	handleSubmit = () => {
		store.dispatch(startLoading('Storing data . . .'))

		if (!this.bucketListId) {
			bucketListService.create(this.state)
			.finally(() => {
				store.dispatch(stopLoading())
                this.setState({ redirect: true })
			})
		} else {
			bucketListService.update(this.bucketListDetailId, this.state)
			.finally(() => {
				store.dispatch(stopLoading())
                this.setState({ redirect: true })
			})
		}
	}

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to={`/bucket-list/`} />
        }
    }

	render () {
		return (
			<div>
				{this.renderRedirect()}
				<div id="bucketListCreate" className="pt-5 p-content">
					<ul className="breadcrumb pb-0">
						<li><Link to ='/bucket-list'><i className="fa fa-angle-left"></i> Bucket List</Link></li>
						<li><i className="fa fa-angle-left"></i> Create List</li>
					</ul>
					<hr/>

					{/* Begin Form */}
					<div className="row">
						<div className="col-8 offset-2">
							<FormGroup type="text" name="country" value={this.state.country} onChange={this.handleInput} />
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
								<NumberFormat name="budget" className="form-control" value={this.state.budget} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '}  onValueChange={(values) => {
									const { value } = values;
									this.setState({budget: value})
								}} />
							</div>
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
			</div>
		)
	}
}

export default BucketListCreate;