import React, { Component } from 'react'

import Navigation from '../../components/Navigation'

import { Redirect } from 'react-router-dom';
import store from './../../store'
import { authService } from './../../common/api.service.js'
import { setToken } from './../../common/jwt.service.js'
import { startLoading, stopLoading } from './../../actions';
import FormGroup from './../../components/utils/FormGroup'
import MessageAlert from './../../components/utils/MessageAlert'

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			error: ''
		}
	}

	login = (e) => {
		e.preventDefault()
		this.setState({error: ''})
		store.dispatch(startLoading("Logging in . . ."))
		authService.login(this.state)
		.then((res) => {
			// localStorage.setItem('id', res.data.user.id);
			// localStorage.setItem('email', res.data.user.email);
			// this.props.history.push('/admin/dashboard')
			setToken(res.data.access_token)
		})
		.catch((err) => {
			alert(err)
		})
		.finally(() => {
			this.props.history.push('/gallery')
			store.dispatch(stopLoading())
		})
	}

	handleInput = (e) => {
		this.setState({[e.target.id]: e.target.value})
	}

	render () {
		const user = localStorage.getItem('email');

	    if (user !== null) {
	       return <Redirect to='/admin/dashboard'/>;
	    }

		return (
			<div id="login" className="pt-5 p-content">
				<div className="row">
					<div className="col-md-6 offset-md-3 card p-5">
						<h2 className="text-center">Login</h2>
						<br/>
						<form action="">
							<FormGroup name='email' type='text' change={this.handleInput} />
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