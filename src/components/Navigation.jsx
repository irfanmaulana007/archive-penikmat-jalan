import React, { Component } from 'react'

import { Link, NavLink } from 'react-router-dom'

import './styles.css'

class Navigation extends Component {
	render() {
		return (
			<nav id="nav" className="navbar navbar-expand-sm p-content">
				<div className="col-3">
				<span className="navbar-brand text-white">Personal Travel <span className="text-danger">Archives</span></span>
				</div>
				<div className="col-6 text-center">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item pull-left pl-2 pr-2">
							<NavLink to ='/home' activeClassName="active">
								<span className="nav-link text-capitalize">home</span>
							</NavLink>
						</li>
						<li className="nav-item pull-left pl-2 pr-2">
							<NavLink to ='/gallery' activeClassName="active">
								<span className="nav-link text-capitalize">gallery</span>
							</NavLink>
						</li>
						<li className="nav-item pull-left pl-2 pr-2">
							<NavLink to ='/travel' activeClassName="active">
								<span className="nav-link text-capitalize">travel</span>
							</NavLink>
						</li>
						<li className="nav-item pull-left pl-2 pr-2">
							<NavLink to ='/story' activeClassName="active">
								<span className="nav-link text-capitalize">story</span>
							</NavLink>
						</li>
						<li className="nav-item pull-left pl-2 pr-2">
							<NavLink to ='/gear' activeClassName="active">
								<span className="nav-link text-capitalize">gear</span>
							</NavLink>
						</li>
					</ul>
				</div>
				<div className="col-3">
					<ul className="navbar-nav pull-right">
						<li className="nav-item pull-left pl-1 pr-1 lead">
							<NavLink to ='/gallery' activeClassName="active">
								<span className="nav-link"><i className="fa fa-instagram"></i></span>
							</NavLink>
						</li>
						<li className="nav-item pull-left pl-1 pr-1 lead">
							<NavLink to ='/gallery' activeClassName="active">
								<span className="nav-link"><i className="fa fa-youtube"></i></span>
							</NavLink>
						</li>
					</ul>
				</div>

  				{/* <Link to ='/' >
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
			  	</ul> */}
			</nav>
		)
	}
}

export default Navigation;