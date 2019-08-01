import React, { Component } from 'react'
import { Route, Link, NavLink } from "react-router-dom"
import Moment from 'react-moment'
import _ from 'lodash'

import { galleryService } from './../../common/api.service'

// Components
import GalleryDetailPhotos from './Photos'
import GalleryDetailVideos from './Videos'

class Gallery extends Component {
	constructor (props) {
		super(props)
		this.state = {
			id: this.props.match.params.id,
			gallery: {
				participant: []
			}
		}
	}

	galleryList = () => {
		galleryService.detail(this.state.id)
		.then((res) => {
			// convert participant of gallery into array with commas ',' separator
			const gallery = res.data
			gallery.participant = _.split(gallery.participant, ',')
			this.setState({ gallery: gallery })
		})
	}

	componentDidMount () {
		this.galleryList()
	}

	render () {
		const { match } = this.props
		let { gallery } = this.state

		return (
			<div>
				<div id="detail" className="pt-5 p-content">
					<ul className="breadcrumb">
						<li><Link to ='/gallery'>&#60; Gallery Detail</Link></li>
						<li>Pulau Kotok</li>
					</ul>
					<hr/>
					<div className="row">
						<div className="col">
							<h3>{gallery.destination}</h3>
						</div>
					</div>
					<div className="row">
						<div className="col-5">
							<img src="https://www.jejakpiknik.com/wp-content/uploads/2017/07/pulaukotok1-630x380.jpg" className="img-thumbnail" alt="" width="100%"/>
						</div>
						<div className="col-7">
							<h6>Date: <b><Moment format="DD MMMM YYYY">{gallery.date}</Moment></b></h6>
							<h6>Participant:</h6>
							<ul>
								{gallery.participant.map((participant, key) => 
									<li key={key}>{participant}</li>
								)}
							</ul>
							<p>{gallery.description}</p>

						</div>
					</div>
					<hr/>
					<div className="row">
						<div className="col-8 offset-2">
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
					</div>
					<br/>
			        <Route path={`${match.path}/photos`} component={GalleryDetailPhotos} />
			        <Route path={`${match.path}/videos`} component={GalleryDetailVideos} />
				</div>
			</div>
		)
	}
}

export default Gallery;