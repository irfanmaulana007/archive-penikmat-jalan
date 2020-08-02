import React, { Component } from 'react';
import { Route, Link, NavLink } from "react-router-dom";
import Moment from 'react-moment';
import _ from 'lodash';
import Modal from 'react-bootstrap/Modal';

import store from './../../store';
import { startLoading, stopLoading, editPhoto, cancelEditPhoto, setStatePhotos } from './../../actions';

import { galleryService, galleryDetailService } from './../../common/api.service';
import FormGroup from './../../components/utils/FormGroup';

// Components
import GalleryDetailPhotos from './Photos';
import GalleryDetailVideos from './Videos';
import './styles.css';

const initState = {
	gallery: {
		destination: '',
		participant: [],
		description: ''
	},
	isModalShow: false
}

class Gallery extends Component {
	galleryId = this.props.match.params.id;

	constructor (props) {
		super(props);
		this.state = {
			id: this.props.match.params.id,
			...initState
		}	
	}

	galleryList = () => {
		store.dispatch(startLoading('Load Gallery . . .'))
		galleryService.detail(this.state.id)
		.then((res) => {
			// convert participant of gallery into array with commas ',' separator
			const gallery = res.data
			gallery.participant = _.sortBy(_.split(gallery.participant.trim(), ','))
			this.setState({ gallery: gallery })
		})
		.finally(() => { store.dispatch(stopLoading()) })
	}

	getPhotos = () => {
		galleryDetailService.getByGalleryID(this.galleryId)
		.then((res) => {
			store.dispatch(setStatePhotos(res.data));
		})
	}

	componentDidMount () {
		this.galleryList()
	}

	handleEdit = () => {
		store.dispatch(editPhoto())
	}

	handleCloseEdit = () => {
		store.dispatch(cancelEditPhoto())
	}

	handleInput = (e) => {
		this.setState({ 
			...this.state,
			gallery: { ...this.state.gallery, [e.target.name]: e.target.value }
		})
	}

	handleShow = () => { this.setState({ isModalShow: true }) }
	handleClose = () => { this.setState({ isModalShow: false }) }

	handleDelete = () => {
		this.handleClose();
		store.dispatch(startLoading("Deleting Photos . . ."));
		let images = store.getState().gallery.selectedPhoto;

		const payload = {
			destination: this.state.gallery.destination,
			images: images
		}

		galleryDetailService.delete(payload)
		.then(() => { 
			store.dispatch(cancelEditPhoto());
			this.getPhotos();
		})
		.finally(() => { store.dispatch(stopLoading()) })
	}

	updateThumbnail = () => {
		store.dispatch(startLoading("Update Thumbnail . . ."));
		const payload = {
			image: store.getState().gallery.selectedPhoto[0]
		}

		galleryService.updateThumbnail(this.galleryId, payload)
		.then(() => { this.galleryList() })
		.finally(() => { 
			store.dispatch(cancelEditPhoto());
			store.dispatch(stopLoading());
		 })
	}

	updateGallery = () => {
		this.setState({ ...initState, initState })
		store.dispatch(startLoading("Update Gallery . . ."));
		let payload = this.state.gallery
		payload.participant = payload.participant.toString();

		galleryService.update(this.galleryId, payload)
		.then(() => { 
			this.galleryList()
		})
		.finally(() => { 
			store.dispatch(cancelEditPhoto());
			store.dispatch(stopLoading());
		 })
	}

	render () {
		const { match } = this.props

		let { gallery, isModalShow } = this.state
		let isEdit = store.getState().gallery.isEdit;
		let allowSetAsThumbnail = store.getState().gallery.allowSetAsThumbnail;

		return (
			<div>
				<div id="detail" className="pt-3 p-content">
					<ul className="breadcrumb pb-0">
						<li><Link to ='/gallery'><i className="fa fa-angle-left"></i> Gallery Detail</Link></li>
						<li><i className="fa fa-angle-left"></i> {gallery.destination}</li>
					</ul>
					<hr/>
					<div className="row">
						<div className="col">
							<h3>{gallery.destination}</h3>
						</div>
					</div>
					<div className="row">
						<div className="col-5">
							<img src={`http://localhost:3001/` + gallery.destination + `/original/` + gallery.thumbnail} className="img-detail" alt="" width="100%"/>
						</div>
						<div className="col-7">
							<h6>Date: <b><Moment format="DD MMMM YYYY">{gallery.date}</Moment></b></h6>
							<h6>Participant: ({gallery.participant.length})</h6>
							<ul className="text-capitalize">
								{gallery.participant.map((participant, key) => 
									<li key={key}>{participant}</li>
								)}
							</ul>
							{ !isEdit && <p>{gallery.description}</p> }
							{ isEdit && <FormGroup name="description" type="textarea" rows="6" value={gallery.description} onChange={this.handleInput} /> }

							<div className="row mt-5">
								<div className="col text-center">
									{ isEdit && <button className="btn btn-success btn-wide" onClick={this.updateGallery}>Save</button> }
								</div>
							</div>


						</div>
					</div>
					<hr/>
					<div className="row">
						<div className="col-6">
							<ul className="nav nav-tabs nav-justified">
								<li className="nav-item">
									<NavLink to={`${match.url}/photos`} activeClassName="active">
										<span className="nav-link">Photos</span>
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink to={`${match.url}/videos`} activeClassName="active">
										<span className="nav-link">Videos</span>
									</NavLink>
								</li>
							</ul>
						</div>
						<div className="col-5 offset-1">
							<div className="row">
								<div className="col-6 p-1">
									{ isEdit && <button className="btn btn-primary btn-block" disabled={!allowSetAsThumbnail} onClick={this.updateThumbnail} >Set as Thumbnail</button> }
								</div>
								<div className="col-3 p-1">
									{ isEdit && <button className="btn btn-danger btn-block" onClick={this.handleShow}>Delete</button> }
									</div>
								<div className="col-3 p-1">
									{ !isEdit && <button className="btn btn-success btn-block" onClick={this.handleEdit}>Edit</button> }
									{ isEdit && <button className="btn btn-secondary btn-block" onClick={this.handleCloseEdit}>Cancel</button> }
								</div>
								<div className="col-3 p-1">
								</div>
							</div>
						</div>
					</div>
					<br/>
			        <Route path={`${match.path}/photos`} component={GalleryDetailPhotos} />
			        <Route path={`${match.path}/videos`} component={GalleryDetailVideos} />
				</div>

				<Modal show={isModalShow} onHide={this.handleClose} backdrop="static" keyboard={false}>
					<Modal.Header closeButton>
						<Modal.Title>Delete Photos</Modal.Title>
					</Modal.Header>
					
					<Modal.Body>
						<h6 className="text-center">Are you sure to delete selected photos?</h6>
						<div className="row text-center">
							<div className="col">
								<button className="btn btn-danger m-1" onClick={this.handleDelete}>Delete</button>
								<button className="btn btn-secondary m-1" onClick={this.handleClose}>Cancel</button>
							</div>
						</div>
					</Modal.Body>
      			</Modal>

			</div>
		)
	}
}

export default Gallery;