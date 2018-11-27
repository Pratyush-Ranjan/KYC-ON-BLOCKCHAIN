import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import './bank.css';
import '../App.css';
import logo from '../logo.png';

class Bank_file_upload extends React.Component {

    constructor(props) {
      super(props);
      this.state ={
        file:null
      }
      this.onFormSubmit = this.onFormSubmit.bind(this)
      this.onChange = this.onChange.bind(this)
      this.fileUpload = this.fileUpload.bind(this)
      this.logout = this.logout.bind(this)
    }

    logout = () => {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('role');
      window.location.reload();
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
          

<div className="customer">
<header>
      <nav>
            <div >
              <img class="logo" src={logo}/>
            </div>
            <div class="menu">
                  <ul>
                        <li><Link class="active" to="/">Home</Link></li>
                        <li><Link class="active" to="/banks/showcustomers">Add Customer</Link></li>
                        <li><Link class="active" to="/bank">Get Verified</Link></li>
                        <li onClick={this.logout}>Logout</li>
                  </ul>
            </div>
              
                 
            <div id="banksubmission">
            <form onSubmit={this.onFormSubmit}>
            
          <h1>File Upload</h1><br/>
          <input type="file" onChange={this.onChange} /><br/><br/>
          <button type="submit">Upload</button>
        </form>
          </div>
        </nav>
           
           </header>
            </div>
     )
    }
  }

export default Bank_file_upload;
