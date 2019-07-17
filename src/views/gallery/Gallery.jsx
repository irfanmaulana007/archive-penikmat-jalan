import React, { Component } from 'react'
import { Route, Link, NavLink } from 'react-router-dom'

class Gallery extends Component {
	render () {
		return (
			<div>
				<div id="content" className="pt-nav">
					<h3>Gallery</h3>
					<br/>
					<div className="row">
						<div className="col-4">
							<div className="card-deck">
								<div className="card">
									<div className="card-body">
										<h5 className="card-title">Pulau Kotok <small className="float-right">22 July 2019</small></h5>
										<img src="https://www.jejakpiknik.com/wp-content/uploads/2017/07/pulaukotok1-630x380.jpg" alt="" width="100%"/>
										<p className="card-text pt-2 mb-0">Participant: <b>Anak Kosan (9 ppl)</b></p>
										<p className="card-text">Some example text. Some example text.</p>
										<Link to ='/gallery/1/photos' className="card-link stretched-link"></Link>
									</div>
								</div>
							</div>
						</div>
						<div className="col-4">1</div>
						<div className="col-4">2</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Gallery;