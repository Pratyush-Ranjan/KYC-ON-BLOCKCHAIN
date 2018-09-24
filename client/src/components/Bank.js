import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Bank_file_upload extends React.Component {

    constructor(props) {
      super(props);
      this.state ={
        file:null
      }
      this.onFormSubmit = this.onFormSubmit.bind(this)
      this.onChange = this.onChange.bind(this)
      this.fileUpload = this.fileUpload.bind(this)
    }

    componentDidMount() {
        if(localStorage.getItem('jwtToken')==null)
        {
            this.props.history.push('/login');
        }
        axios.defaults.headers.common['Authorization'] = "bearer "+ localStorage.getItem('jwtToken');
        console.log("token"+localStorage.getItem('jwtToken'));
       

    }
    onFormSubmit(e){
      e.preventDefault() // Stop form submit
      this.fileUpload(this.state.file).then((response)=>{
        console.log(response.data);
      })
    }
    onChange(e) {
      this.setState({file:e.target.files[0]})
    }
    fileUpload(file){
      const url = '/verification';
      const formData = new FormData();
      formData.append('documents',file)
      console.log('working');
      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      }
      return  axios.post(url, formData,config)
    }
  
    render() {
      return (
        <form onSubmit={this.onFormSubmit}>
          <h1>File Upload</h1>
          <input type="file" onChange={this.onChange} />
          <button type="submit">Upload</button>
        </form>
     )
    }
  }

export default Bank_file_upload;
