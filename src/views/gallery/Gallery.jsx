import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import _ from 'lodash'

import store from './../../store'
import { startLoading, stopLoading} from './../../actions';

import { galleryService, categoryService } from './../../common/api.service'

let initState = {
	galleries: [],
	categories: []
}
class Gallery extends Component {
	constructor (props) {
		super(props)
		this.state = initState
	}

	getGalleryList = () => {
		galleryService.get()
		.then((res) => { this.setState({ galleries: res.data }) })
		.finally(() => { store.dispatch(stopLoading()) })
	}

	getCategoryList = () => {
		categoryService.get()
		.then((res) => { this.setState({ categories: res.data }) })
	}

	handleFilter = (e) => {
		store.dispatch(startLoading("Loading . . ."))
		const category = e.target.value

		if (category) {
			galleryService.getById(category)
			.then((res) => { this.setState({ galleries: res.data }) })
			.finally(() => { store.dispatch(stopLoading()) })
	}

		else {
			this.getGalleryList();
			galleryService.get();
		}
	}

	componentDidMount () {
		store.dispatch(startLoading("Loading . . ."))
		this.getGalleryList()
		this.getCategoryList()
	}

	render () {
		return (
			<div>
				<div id="gallery" className="pt-5 p-content">
					<div className="row">
						<div className="col-7">
							<h3>Gallery <span className="small"><Link to="/gallery-create">Add</Link></span> </h3>
						</div>
						<div className="col-5">
							<div className="row">
								<div className="col-4 p-0">
									<select onChange={this.handleFilter} className="form-control border-radius-tr-0 border-radius-br-0">
										<option value="">All Category</option>
										{this.state.categories.map((values, key) => 
											<option key={key} value={values.id}>{values.name}</option>
										)}
									</select>
								</div>
								<div className="col p-0">
									<div className="input-group">
										<input type="text" className="form-control border-radius-tl-0 border-radius-bl-0"/>
										<div className="input-group-append">
											<button className="btn btn-primary border-radius-0" type="button"><i className="fa fa-search"></i></button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<br/>
					<div className="row">
						{this.state.galleries.map((values, key) =>
							<div key={key} className="col-4 mb-4">
								<div className="card">
									<div className="card-body p-2">
										<img src={`http://localhost:3001/` + values.destination + `/small/` + values.thumbnail} alt="" width="100%"/>
										{/* <img src={values.thumbnail} alt="" width="100%"/> */}
										<div className="overlay">
											<div className="text text-absolute text-white">
												{values.destination} <br/>
												<small className="float-right font-weight-bold"><Moment format="DD MMMM YYYY">{values.date}</Moment></small>
											</div>
										</div>
										<Link to ={`/gallery/` + values.id + `/photos`} className="card-link stretched-link"></Link>
									</div>
								</div>
							</div>
						)}
						<div className="col-4 mb-4">
							<div className="card">
								<div className="card-body p-2">
									<center><img src='http://localhost:3001/icon/add.png' alt="" /></center>
									{/* <img src={values.thumbnail} alt="" width="100%"/> */}
									<div className="overlay">
										<div className="text text-absolute text-white">
											Add Moment <br/>
											{/* <small className="float-right font-weight-bold">Save your moments here</small> */}
										</div>
									</div>
									<Link to ='/gallery-create' className="card-link stretched-link"></Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Gallery;