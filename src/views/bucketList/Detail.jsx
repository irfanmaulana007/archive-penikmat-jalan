import React, { Component } from 'react'
import { Route, Link, NavLink } from "react-router-dom"
// import Moment from 'react-moment'
// import _ from 'lodash'
// import Modal from 'react-bootstrap/Modal'
import NumberFormat from 'react-number-format';

import store from './../../store'
import { startLoading, stopLoading } from './../../actions';

import { bucketListService } from './../../common/api.service'
// import FormGroup from './../../components/utils/FormGroup'

// Components
import BucketListDetailDestination from './Destination'
import BucketListDetailCulinary from './Culinary'
import './styles.css'

let initState = {
	bucketList: {
		mainDestination: '',
		destination: '',
		budget: 0
	}
}

class Gallery extends Component {
	bucketListId = this.props.match.params.id;

	constructor (props) {
		super(props);
		this.state = {
			id: this.props.match.params.id,
			...initState
		}	
	}

	getBucketListDetail = () => {
		store.dispatch(startLoading("get Bucket List Detail . . ."))
		bucketListService.detail(this.bucketListId)
		.then((res) => { this.setState({ bucketList: res.data }) })
		.finally(() => { store.dispatch(stopLoading()) })
	}

	componentDidMount () {
		this.getBucketListDetail();
	}

	render () {
		const { match } = this.props

		const { bucketList } = this.state

		return (
			<div>
				<div id="detail" className="pt-3 p-content">
					<ul className="breadcrumb pb-0">
						<li><Link to ='/bucket-list'><i className="fa fa-angle-left"></i> Bucket List Detail</Link></li>
						<li><i className="fa fa-angle-left"></i> <span className="text-capitalize">{bucketList.destination}</span></li>
					</ul>
					<hr/>
					<div className="row">
						<div className="col">
							<h3 className="float-left text-capitalize">{bucketList.destination} <span className="small"><Link to={`/bucket-list-detail/` + this.bucketListId + `/add/destination`}>Add</Link></span> </h3>
							<h3 className="float-right"><NumberFormat value={bucketList.budget} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} /></h3>
						</div>
					</div>
					<div className="row">
						<div className="col-5">

						</div>
						<div className="col-7">
							
						</div>
					</div>
					<hr/>
					<div className="row">
						<div className="col-6">
							<ul className="nav nav-tabs nav-justified">
								<li className="nav-item">
									<NavLink to={`${match.url}/destination`} activeClassName="active">
										<span className="nav-link">Destination</span>
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink to={`${match.url}/culinary`} activeClassName="active">
										<span className="nav-link">Culinary</span>
									</NavLink>
								</li>
							</ul>
						</div>
					</div>
					<br/>
			        <Route path={`${match.path}/destination`} component={BucketListDetailDestination} />
			        <Route path={`${match.path}/culinary`} component={BucketListDetailCulinary} />
				</div>

			</div>
		)
	}
}

export default Gallery;