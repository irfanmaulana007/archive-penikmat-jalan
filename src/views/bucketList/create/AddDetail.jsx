import React, { Component } from 'react'
import { Route, Link, NavLink } from 'react-router-dom'
// import Moment from 'react-moment'
// import _ from 'lodash'

import store from '../../../store'
import { startLoading, stopLoading} from '../../../actions';

import { bucketListService } from '../../../common/api.service';

// Components
import AddDestination from './AddDestination';
import AddCulinary from './AddCulinary';

let initState = {
	bucketList: {}
}

class AddDetail extends Component {
	bucketListId = this.props.match.params.id;

	constructor (props) {
		super(props)
		this.state = initState
	}

	getDetail = () => {
		store.dispatch(startLoading('Get Detail . . .'))

		bucketListService.detail(this.bucketListId)
		.then((res) => { this.setState({ bucketList: res.data }) })
		.finally(() => { store.dispatch(stopLoading()) })
	}

	componentDidMount () {
		this.getDetail();
	}

	render () {
		const { match } = this.props;
		const { bucketList } = this.state;

		return (
			<div>
				<div id="addDetail" className="pt-5 p-content">
					<ul className="breadcrumb pb-0 text-capitalize">
						<li><Link to ={`/bucket-list/` + this.bucketListId + `/destination`}><i className="fa fa-angle-left"></i> {bucketList.destination}</Link></li>
						<li><i className="fa fa-angle-left"></i> Add Detail</li>
					</ul>
					<hr/>
					<div className="row">
						<div className="col-8 offset-2">
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
					<br/><br/>
			        <Route path={`${match.path}/destination`} component={AddDestination} />
			        <Route path={`${match.path}/culinary`} component={AddCulinary} />
				</div>
			</div>
		)
	}
}

export default AddDetail;