import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom"

// Styles
import './App.css'

import store from './store'

// Loader
import Loaders from './components/utils/Loaders'

// Components
import Home from './views/Home'
import NotFound from './views/NotFound'

// Gallery
import Gallery from './views/gallery/Gallery'
import GalleryDetail from './views/gallery/Detail'
import GalleryCreate from './views/gallery/create/GalleryCreate'

// Bucket List
import BucketList from './views/bucketList/BucketList'
import BucketListDetail from './views/bucketList/Detail'
import BucketListCreate from './views/bucketList/create/BucketListCreate'
import BucketListAddDetail from './views/bucketList/create/AddDetail'

// Cateogry
import Category from './views/category/Category'
import CategoryCreate from './views/category/CategoryCreate'

import Login from './views/admin/Login'

import Navigation from './components/Navigation'
import Footer from './components/Footer'

class App extends Component {
	constructor(props){
		super(props);
		this.state = store.getState().utils;

		store.subscribe (() => {
			this.setState(store.getState().utils);
		})
	}

	componentDidMount(){
		document.title = "Archive Penikmat Jalan-Jalan"
	}

	render() {
		return (
			<Router>
				<Loaders display={this.state.loaders} message={this.state.message} />
				<div className="h-100">
					<Navigation />
					
					<div id="content" className="pt-nav">
						<Switch>
							<Redirect exact from="/" to="/home" />
							<Route exact path="/home" component={Home} />
							
							<Route exact path="/login" component={Login} />

							{/* Gallery */}
							<Route exact path="/gallery" component={Gallery} />
							<Route exact path="/gallery-create" component={GalleryCreate} />
							<Route path="/gallery/:id" component={GalleryDetail} />

							{/* Bucket List */}
							<Route exact path="/bucket-list" component={BucketList} />
							<Route exact path="/bucket-list-create" component={BucketListCreate} />
							<Route path="/bucket-list/:id" component={BucketListDetail} />
							<Route path="/bucket-list-detail/:id/add" component={BucketListAddDetail} />
							<Route path="/bucket-list-detail/:id/update/:bucketListDetailId" component={BucketListAddDetail} />

							{/* Category */}
							<Route exact path="/category" component={Category} />
							<Route exact path="/category/update/:id" component={CategoryCreate} />
							<Route exact path="/category-create" component={CategoryCreate} />

							<Route path="*" component={NotFound} />
						</Switch>
					</div>

					<br/><br/>
					<Footer />
				</div>
			</Router>
		)
	}
}

export default App;
