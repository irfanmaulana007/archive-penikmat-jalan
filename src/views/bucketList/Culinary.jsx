import React, { Component } from 'react';
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';

import _ from 'lodash';
import Modal from 'react-bootstrap/Modal';

import store from './../../store';
import { startLoading, stopLoading } from './../../actions';

import { culinaryService } from './../../common/api.service';

const initState = {
	culinaryDetails: [],
	selectedDetail: {
		id: 0,
		name: ''
	}
}

class Culinary extends Component {
	bucketListId = this.props.match.params.id;

	constructor (props) {
		super(props);
		this.state = {
			...initState,
			isModalShow: false
		}
	}

	getCulinaryDetails = () => {
		store.dispatch(startLoading("get Culinary Details . . ."))
		culinaryService.getByBucketListId(this.bucketListId)
		.then((res) => { this.setState({ culinaryDetails: _.sortBy(res.data, 'name') }) })
		.finally(() => { store.dispatch(stopLoading()) })
	}

	componentDidMount () {
		this.getCulinaryDetails();
	}

	handleShow = () => { this.setState({ isModalShow: true }) }
	handleClose = () => {
		this.setState({ 
			isModalShow: false,
			selectedCategory: initState.selectedCategory
		})
	}

	handleDelete = () => {
		this.handleClose();
		store.dispatch(startLoading("Delete Culinary Detail . . ."))
		culinaryService.delete(this.state.selectedDetail.id)
		.then(() => { this.getCulinaryDetails() })
		.finally(() => { store.dispatch(stopLoading()) })
	}

	render () {
		const { culinaryDetails, isModalShow, selectedDetail } = this.state

		return (
			<div>
			{culinaryDetails.map((values, key) =>
				<div key={key} className="row mb-2">
					<div className="col">
						<div className="row">
							<div className="col-6">
								<h4 className="text-capitalize">{values.name}</h4>
							</div>
							<div className="col-6 text-right">
								<Link to={`/bucket-list-detail/` + this.bucketListId + `/update/` + values.id + `/culinary`}><button className="btn btn-success btn-sm ml-1 mr-1">Edit</button></Link>
								<button className="btn btn-danger btn-sm ml-1 mr-1"  onClick={() => { this.setState({ selectedDetail: { id: values.id, name: values.name } }); this.handleShow() }}>Delete</button>
							</div>
						</div>

						<div className="row">
							<div className="col">
								<p className="mb-1">{values.detail}</p>
							</div>
						</div>
					</div>
				</div>
			)}

			<div className="row">
				<div className="col">
					<h4><span className="small"><Link to={`/bucket-list-detail/` + this.bucketListId + `/add/culinary`}>Add new Culinary</Link></span></h4>
				</div>
			</div>


			<Modal show={isModalShow} onHide={this.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Delete Confirmation</Modal.Title>
				</Modal.Header>
				
				<Modal.Body>
					<h5 className="text-center mb-3">Are you sure to delete culinary <b>{selectedDetail.name}</b> ? </h5>

					<div className="row">
						<div className="col text-center">
							<button className="btn btn-secondary ml-1 mr-1" onClick={this.handleClose}>
								Cancel
							</button>
							<button className="btn btn-danger ml-1 mr-1" onClick={this.handleDelete}>
								Delete
							</button>
						</div>
					</div>
				</Modal.Body>
			</Modal>

			</div>

		)
	}
}

export default Culinary;