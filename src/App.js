import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom"

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

      				<Switch>
						<Route exact path="/" component={Home} />
						<Route path="*" component={NotFound} />
					</Switch>

					<br/><br/>
					<Footer />
				</div>
			</Router>
		)
	}
}

export default App;
