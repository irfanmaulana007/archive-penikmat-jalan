import React, { Component } from 'react'
import { Route, Link, NavLink } from "react-router-dom"

// Components
import GalleryDetailPhotos from './Photos'
import GalleryDetailVideos from './Videos'

class Gallery extends Component {
	render () {
		const { match } = this.props
		return (
			<div>
				<div id="content" className="pt-nav">
					<ul className="breadcrumb">
						<li><Link to ='/gallery'>&#60; Gallery Detail</Link></li>
						<li>Pulau Kotok</li>
					</ul>
					<hr/>
					<div className="row">
						<div className="col">
							<h3>Kotok Island</h3>
						</div>
					</div>
					<div className="row">
						<div className="col-5">
							<img src="https://www.jejakpiknik.com/wp-content/uploads/2017/07/pulaukotok1-630x380.jpg" className="img-thumbnail" alt="" width="100%"/>
						</div>
						<div className="col-7">
							<h6>Date: <b>22 June 2019</b></h6>
							<h6>Participant:</h6>
							<ul>
								<li>Adi (cukong)</li>
								<li>Ali</li>
								<li>Chusnul</li>
								<li>Fadjrin</li>
								<li>Fakhri (fafa)</li>
								<li>Irfan (gembel)</li>
								<li>Joko</li>
								<li>Kemal</li>
								<li>Naila</li>
							</ul>

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