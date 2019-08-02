import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import _ from 'lodash'

import { galleryService } from './../../common/api.service'

let initState = {
	gallery: []
}
class Gallery extends Component {
	constructor (props) {
		super(props)
		this.state = initState
	}

	galleryList = () => {
		galleryService.get()
		.then((res) => {
			// convert participant of gallery into array with commas ',' separator
			const gallery = _
				.chain(res.data)
				.map((o) => {
					o.participant = _.sortBy(_.split(o.participant, ','))
					return o
				})
				.value()

			this.setState({ gallery: gallery })
		})
	}

	componentDidMount () {
		this.galleryList()
	}

	render () {
		return (
			<div>
				<div id="gallery" className="pt-5 p-content">
					<h3>Gallery</h3>
					<br/>
					<div className="row">
						{this.state.gallery.map((values, key) =>
							<div key={key} className="col-4 mb-4">
								<div className="card-deck">
									<div className="card">
										<div className="card-body">
											<h5 className="card-title font-weight-bold">{values.destination} <small className="float-right font-weight-bold"><Moment format="DD MMMM YYYY">{values.date}</Moment></small></h5>
											<img src="https://www.jejakpiknik.com/wp-content/uploads/2017/07/pulaukotok1-630x380.jpg" alt="" width="100%"/>
											<p className="card-text pt-2 mb-0">Participant:</p>
												<ul className="font-weight-bold">
													{values.participant.map((participant, key) => 
														<li key={key}>{participant}</li>
													)}
												</ul>
											<Link to ={`/gallery/` + values.id + `/photos`} className="card-link stretched-link"></Link>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		)
	}
}

export default Gallery;