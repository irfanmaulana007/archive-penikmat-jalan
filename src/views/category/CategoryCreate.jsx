import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import store from './../../store'
import { startLoading, stopLoading } from './../../actions';

import FormGroup from './../../components/utils/FormGroup';
import { categoryService } from './../../common/api.service';

let initState = {
    name: ''
}

class CategoryCreate extends Component {
    categoryId = this.props.match.params.id;
    
    constructor (props) {
        super(props);
        this.state = {
            ...initState,
            redirect: false
        }
    }

    getCategory = () => {
        store.dispatch(startLoading("Get Category . . ."))

        categoryService.getById(this.categoryId)
        .then((res) => { this.setState({ name: res.data.name }) })
        .finally(() => { store.dispatch(stopLoading()) })

    }
    
    componentDidMount () {
        if (this.categoryId) {
            this.getCategory();
        }
    }
  
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    handleSubmit = () => {
        store.dispatch(startLoading("Create Category . . ."))
        
        if (!this.categoryId) {
            categoryService.create({ name: this.state.name })
            .finally(() => { 
                store.dispatch(stopLoading())
                this.setState({ redirect: true })
            })
        } else {
            categoryService.update(this.categoryId, { name: this.state.name })
            .finally(() => { 
                store.dispatch(stopLoading())
                this.setState({ redirect: true })
            })
        }
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/category' />
        }
    }

    render () {

        return (
            <div className="container mt-5">
                {this.renderRedirect()}
                <ul className="breadcrumb pb-0">
                    <li><Link to ='/category'><i className="fa fa-angle-left"></i> Category List</Link></li>
                    <li><i className="fa fa-angle-left"></i> Create Category</li>
                </ul>
                <hr/>

                {/* Begin Form */}
                <div className="row">
                    <div className="col-8 offset-2">
                        <FormGroup name="name" type="text" value={this.state.name} onChange={this.handleInput} />
                    </div>
                </div>
                {/* end of Form */}
                
                <br/>
                <div className="row">
                    <div className="col text-center">
                        <button onClick={this.handleSubmit} className="border-radius-0 btn-wide btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CategoryCreate;