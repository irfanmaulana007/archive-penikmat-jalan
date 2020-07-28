import React, { Component } from 'react'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import _ from 'lodash'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'

import store from './../../store'
import { startLoading, stopLoading, selectPhoto, allowSetAsThumbnail, setStatePhotos } from './../../actions';

import { galleryService, galleryDetailService } from './../../common/api.service'
import FormGroup from './../../components/utils/FormGroup'



class Photos extends Component {
	galleryId = this.props.match.params.id;
    photos = [];
    paths = [];
    files = [];

	constructor(props) {
		super(props)
	 
		this.state = {
			photoIndex: 0,
			isOpen: false,
			photos: [],
			destination: '',
			isModalShow: false,
			files: []
		}
	}

	getGallery = () => {
		galleryService.detail(this.galleryId)
		.then((res) => {
			this.setState({ destination: res.data.destination })
		})
	}

	getPhotos = () => {
		galleryDetailService.getByGalleryID(this.galleryId)
		.then((res) => {
			store.dispatch(setStatePhotos(res.data));
		})
		.finally(() => {
			store.dispatch(stopLoading())
		})
	}

	componentDidMount () {
		store.dispatch(startLoading("Loading . . ."))
		this.getGallery();
		this.getPhotos();
	}

    handleMultiplePhotos = (e) => {
        this.photos = e.target.files;
        for (let i = 0; i < this.photos.length; i++) {
            this.paths.push(URL.createObjectURL(this.photos[i]));

            let reader = new FileReader();
            reader.onload = (e) => {
                this.files.push(e.target.result);
            }
            reader.readAsDataURL(this.photos[i]);
        }
        this.setState({ files: this.files });
    }

    handleUploadMoments = () => {
        this.inputMultiple.click()
    }

	handleShow = () => { this.setState({ isModalShow: true }) }
	handleClose = () => {
		this.photos = []
		this.paths = []
		this.files = []
		this.setState({ isModalShow: false, files: [] })
	}

	handleSubmit = () => {
		this.handleClose();
		store.dispatch(startLoading("Upload Photos . . ."))

		const payload = {
			files: this.state.files
		}

		galleryDetailService.create(this.galleryId, payload)
		.then(() => {
			this.getPhotos();
		})
        .finally(() => { 
			store.dispatch(stopLoading());
        })
	}

	handleCheck = (e) => {
		store.dispatch(selectPhoto(e.target.value))

		if (store.getState().gallery.selectedPhoto.length === 1) {
			store.dispatch(allowSetAsThumbnail(true))
		} else {
			store.dispatch(allowSetAsThumbnail(false))
		}
	}

	render () {
		let photos = store.getState().gallery.photos;
		const { destination, photoIndex, isOpen, isModalShow } = this.state
		const imagePath = 'http://localhost:3001/' + destination + '/original/';
		let isEdit = store.getState().gallery.isEdit;

		return (
			<div>
				<div className="row">
					{photos.map((values, key) =>
						<div key={key} className="col-2 mb-2 pl-1 pr-1">
							<img src={`http://localhost:3001/` + destination + `/small/` + values.image} alt="" className="img-thumbnail img-hover" width="100%" onClick={() => this.setState({ isOpen: true, photoIndex: key })} />
							{ isEdit && <input type="checkbox" className="check-photo" value={values.image} onClick={this.handleCheck} /> }
						</div>	
					)}
					
					<div className="col-2 mb-2 pl-1 pr-1 img-thumbnail img-hover" onClick={this.handleShow}>
						<center>
							<img src="http://localhost:3001/icon/add.png" alt="" className="photo-small" height="100" />
						</center>
						
						<div className="overlay">
							<div className="text text-absolute text-white">
								Add Moment <br/>
								{/* <small className="float-right font-weight-bold">Save your moments here</small> */}
							</div>
						</div>
					</div>	
					
				</div>

				{isOpen && (
					<Lightbox
		            	mainSrc={imagePath + photos[photoIndex].image}
		            	nextSrc={imagePath + photos[(photoIndex + 1) % photos.length].image}
		            	prevSrc={imagePath + photos[(photoIndex + photos.length - 1) % photos.length].image}
		            	nextSrcThumbnail={imagePath + photos[(photoIndex + 1) % photos.length].image}
		            	prevSrcThumbnail={imagePath + photos[(photoIndex + photos.length - 1) % photos.length].image}
		            	onCloseRequest={() => this.setState({ isOpen: false })}
		            	imagePadding={50}
		            	onMovePrevRequest={() =>
		            		this.setState({
		            			photoIndex: (photoIndex + photos.length - 1) % photos.length,
		            		})
		            	}
		            	onMoveNextRequest={() =>
		            		this.setState({
		            			photoIndex: (photoIndex + 1) % photos.length,
		            		})
	            		}
		        	/>
		        )}

				<Modal show={isModalShow} onHide={this.handleClose} backdrop="static" keyboard={false}>
					<Modal.Header closeButton>
						<Modal.Title>Upload Photos</Modal.Title>
					</Modal.Header>
					
					<Modal.Body>
						<FormGroup name="moments" id="input-multiple" refs={input => this.inputMultiple = input} class="d-none" type="file" multiple="multiple" onChange={this.handleMultiplePhotos} />
                        <div className="input-multiple mb-2" onClick={this.handleUploadMoments}>
                            <div className="text text-relative">
                                Click here to upload moments.
                            </div>
                        </div>
                        
                        <div className="form-group multi-preview">
                            {(this.paths || []).map((url, key) => (
                                <img key={key} className="m-1" src={url} alt="..." height="120px"/>
                            ))}
                        </div>
					</Modal.Body>
					
					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleClose}>
							Cancel
						</Button>
						<Button variant="primary" onClick={this.handleSubmit}>
							Submit
						</Button>
					</Modal.Footer>
      			</Modal>
				  
			</div>
		)
	}
}

export default Photos;