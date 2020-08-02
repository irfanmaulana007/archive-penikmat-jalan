import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'

import store from './../../../store'
import { startLoading, stopLoading } from './../../../actions';

import FormGroup from './../../../components/utils/FormGroup'
import { galleryService, categoryService } from './../../../common/api.service'

let initState = {
    destination: '',
    category_id: 0,
    date: "",
    participant: '',
    description: '',
}

class GalleryCreate extends Component {
    photos = [];
    paths = [];
    files = [];
    categoryList = [];

    constructor (props) {
        super(props);
        this.state = {
            ...initState,
            files: [],
            redirect: false
        }
    }

    componentDidMount() {
        this.getCategory();
    }

    getCategory = () => {
        categoryService.get()
        .then((res) => {
            this.categoryList = res.data;
        })
    }
  
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleMultiplePhotos = (e) => {
        this.photos = e.target.files;
        for (let i = 0; i < this.photos.length; i++) {
            this.paths.push(URL.createObjectURL(this.photos[i]));

            let reader = new FileReader();
            reader.onload = (e) => {
                this.files.push(e.target.result);
            }
            reader.readAsDataURL(this.photos[i]);
        }
        this.setState({ files: this.files });
    }

    handleUploadMoments = () => {
        this.inputMultiple.click()
    }
    
    handleSubmit = () => {
        store.dispatch(startLoading("Upload Memories . . ."))
        
        galleryService.create(this.state)
        .finally(() => { 
            store.dispatch(stopLoading())
            this.setState({ redirect: true })
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/gallery' />
        }
    }

    render () {

        return (
            <div className="container mt-5">
                {this.renderRedirect()}
                <ul className="breadcrumb pb-0">
                    <li><Link to ='/gallery'><i className="fa fa-angle-left"></i> Gallery</Link></li>
                    <li><i className="fa fa-angle-left"></i> Create Moment</li>
                </ul>
                <hr/>

                {/* Begin Form */}
                <div className="row">
                    <div className="col-8 offset-2">
                        <FormGroup name="destination" type="text" defaultValue={this.state.destination} onChange={this.handleInput} />
                        
                        <select name="category_id" className="form-control mb-2 text-capitalize" onChange={this.handleInput}>
                            <option value="0">- SELECT -</option>
                            {this.categoryList.map((values, key) =>
                                <option key={key} value={values.id}>{values.name}</option>
                            )}
                        </select>
                        
                        <FormGroup name="date" type="date" defaultValue={this.state.date} onChange={this.handleInput} />
                        
                        <FormGroup name="participant" type="text" defaultValue={this.state.participant} onChange={this.handleInput} />
                        
                        <FormGroup name="description" type="textarea" rows="6" defaultValue={this.state.description} onChange={this.handleInput} />
                        
                        <input name="moments" id="input-multiple" ref={input => this.inputMultiple = input} className="d-none" type="file" multiple="multiple" onChange={this.handleMultiplePhotos} />
                        <div className="input-multiple mb-2" onClick={this.handleUploadMoments}>
                            <div className="text text-relative">
                                Click here to upload moments.
                            </div>
                        </div>
                        
                        <div className="form-group multi-preview">
                            {(this.paths || []).map((url, key) => (
                                <img key={key} className="m-1" src={url} alt="..." height="120px"/>
                            ))}
                        </div>

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

export default GalleryCreate;