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
import Gallery from './views/gallery/Gallery'
import GalleryDetail from './views/gallery/Detail'
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
							<Route exact path="/gallery" component={Gallery} />
							<Route path="/gallery/:id" component={GalleryDetail} />
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
