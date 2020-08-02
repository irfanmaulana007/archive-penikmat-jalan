import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Moment from 'react-moment'
// import _ from 'lodash'
import NumberFormat from 'react-number-format';

import store from '../../store';
import { startLoading, stopLoading} from '../../actions';

import { bucketListService } from './../../common/api.service';

let initState = {
	bucketList: []
}

class BucketList extends Component {
	constructor (props) {
		super(props)
		this.state = initState
	}

	getBucketList = () => {
		store.dispatch(startLoading("get Bucket List . . ."))
		bucketListService.get()
		.then((res) => { this.setState({ bucketList: res.data }) })
		.finally(() => { store.dispatch(stopLoading()) })
	}

	componentDidMount () {
		this.getBucketList();
	}

	render () {
		const { bucketList } = this.state;

		return (
			<div>
				<div id="bucketList" className="pt-5 p-content">
					<div className="row">
						<div className="col-7">
							<h3>Bucket List <span className="small"><Link to="/bucket-list-create">Add</Link></span> </h3>
						</div>
					</div>
					<br/>
					<div className="row">
						{bucketList.map((values, key) => 
							<div key={key} className="col-4 mb-4">
								<div className="card">
									<div className="card-body img-thumbnail">
										<img className="img-flag" src={`http://localhost:3001/icon/flags/` + values.country + `.jpg`} alt="" width="100%"/>
										<div className="text-center pt-4 pb-4">
											<h5 className="text-capitalize">{values.destination}</h5>
											<h5><NumberFormat value={values.budget} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} /></h5>
										</div>
										<div className="overlay">
											<div className="text text-absolute text-white">
												Detail <br/>
											</div>
										</div>
										<Link to ={`/bucket-list/` + values.id + `/destination`} className="card-link stretched-link"></Link>
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

export default BucketList;