import React, { Component } from 'react'

import Navigation from '../../components/Navigation'

import { Redirect } from 'react-router-dom';
import store from './../../store'
// import { userService } from './../../common/api.service.js'
import { startLoading, stopLoading } from './../../actions';
import FormGroup from './../../components/utils/FormGroup'
import MessageAlert from './../../components/utils/MessageAlert'

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			error: ''
		}
	}

	login = (e) => {
		e.preventDefault()
		this.setState({error: ''})
		store.dispatch(startLoading("Logging in . . ."))
		// userService.login(this.state)
		.then((res) => {
			if (res.data.status === true) {
				localStorage.setItem('id', res.data.user.id);
				localStorage.setItem('fullname', res.data.user.fullname);
				localStorage.setItem('username', res.data.user.username);
				localStorage.setItem('role', res.data.user.role);
				this.props.history.push('/admin/cta-history')
			} else {
				this.setState({error: res.data.message})
			}
		})
		.catch((err) => {
			alert(err)
		})
		.finally(() => {
			store.dispatch(stopLoading())
		})
	}

	handleInput = (e) => {
		this.setState({[e.target.id]: e.target.value})
	}

	render () {
		const user = localStorage.getItem('username');

	    if (user !== null) {
	       return <Redirect to='/admin/dashboard'/>;
	    }

		return (
			<div>
				<Navigation />

				<div className="row pt-nav mt-5">
					<div className="col-md-6 offset-md-3 card p-5">
						<h2 className="text-center">Login</h2>
						<br/>
						<form action="">
							<FormGroup name='username' type='text' change={this.handleInput} />
							<FormGroup name='password' type='password' change={this.handleInput} />
							{
								this.state.error !== ""
								?
								( <MessageAlert title="Failed" message={this.state.error} /> )
								:
								""
							}
							<br/>

							<div className="form-group">
								<button type="button" className="btn btn-primary btn-block" onClick={this.login}>Login</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default Login