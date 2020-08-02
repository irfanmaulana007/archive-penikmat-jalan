import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Moment from 'react-moment';
import Modal from 'react-bootstrap/Modal'

import store from '../../store';
import { startLoading, stopLoading} from '../../actions';

import { categoryService } from '../../common/api.service';

let initState = {
	categoryList: [],
	selectedCategory: {
		id: 0,
		name: ''
	}
}

class CategoryList extends Component {
	constructor (props) {
		super(props)
		this.state = { 
			...initState,
			isModalShow: false
		}
	}

	getCategoryList = () => {
		store.dispatch(startLoading("get Category List . . ."))
		categoryService.get()
		.then((res) => { this.setState({ categoryList: res.data }) })
		.finally(() => { store.dispatch(stopLoading()) })
	}

	componentDidMount () {
		this.getCategoryList();
	}

	handleShow = () => { this.setState({ isModalShow: true }) }
	handleClose = () => {
		this.setState({ 
			isModalShow: false,
			selectedCategory: initState.selectedCategory
		})
	}

	handleDelete = () => {
		this.handleClose();
		store.dispatch(startLoading("Delete Category . . ."))
		categoryService.delete(this.state.selectedCategory.id)
		.then(() => { this.getCategoryList() })
		.finally(() => { store.dispatch(stopLoading()) })
	}

	render () {
		const { categoryList, selectedCategory, isModalShow } = this.state;

		return (
			<div>
				<div id="categoryList" className="pt-5 p-content">
					<div className="row">
						<div className="col-7">
							<h3>Category List <span className="small"><Link to="/category-create">Add</Link></span> </h3>
						</div>
					</div>
					<br/>
					<div className="row">
						<table className="table table-hovered table-striped">
							<thead>
								<tr>
									<th>ID</th>
									<th>Name</th>
									<th>Created At</th>
									<th className="text-center">Action</th>
								</tr>
							</thead>
							<tbody>
								{categoryList.map((values, key) => 
									<tr key={key}>
										<td>{values.id}</td>
										<td className="text-capitalize">{values.name}</td>
										<td><Moment format="DD MMMM YYYY">{values.created_at}</Moment></td>
										<td className="text-center">
											<Link to={`/category/update/` + values.id}><button className="btn btn-primary ml-1 mr-1">Edit</button></Link>
											<button className="btn btn-danger ml-1 mr-1" onClick={() => { this.setState({ selectedCategory: { id: values.id, name: values.name } }); this.handleShow() }} >Delete</button>
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>


				<Modal show={isModalShow} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Delete Confirmation</Modal.Title>
					</Modal.Header>
					
					<Modal.Body>
						<h5 className="text-center mb-3">Are you sure to delete category <b>{selectedCategory.name}</b> ? </h5>

						<div className="row">
							<div className="col text-center">
								<button className="btn btn-secondary ml-1 mr-1" onClick={this.handleClose}>
									Cancel
								</button>
								<button className="btn btn-danger ml-1 mr-1" onClick={this.handleDelete}>
									Delete
								</button>
							</div>
						</div>
					</Modal.Body>
      			</Modal>

			</div>
		)
	}
}

export default CategoryList;