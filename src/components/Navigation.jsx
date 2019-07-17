import React, { Component } from 'react'

import { Link, NavLink } from 'react-router-dom'

import './styles.css'

class Navigation extends Component {
	render() {
		return (
			<nav id="nav" className="navbar navbar-expand-sm navbar-dark fixed-top">
  				<Link to ='/' >
					<span className="navbar-brand text-white pull-left">Penikmat Jalan-Jalan <span className="text-danger">Archives</span></span>
				</Link>

			  	<ul className="navbar-nav ml-auto pull-right">
	  				<li className="nav-item pull-left">
		  				<NavLink to ='/gallery' activeClassName="active">
					  		<span className="nav-link">Gallery</span>
				  		</NavLink>
	  				</li>
	  				<li className="nav-item pull-left ml-2">
		  				<span className="nav-link no-hover">|</span>
	  				</li>
	  				<li className="nav-item pull-left ml-2">
		  				<NavLink to ='/admin' activeClassName="active">
				  			<span className="nav-link"><i className="fa fa-unlock-alt"></i></span>
	  					</NavLink>
	  				</li>
			  	</ul>
			</nav>
		)
	}
}

export default Navigation;