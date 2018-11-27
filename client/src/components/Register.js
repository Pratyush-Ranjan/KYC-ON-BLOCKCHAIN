import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './Login.css';
import Login from "./Login";
import Routes from "../index.js"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import fileDownload from 'react-file-download';

class Create extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            role:'',
            ethaddress:''
        };
    }
    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { email, password,role,ethaddress } = this.state;

        axios.post('/register', { email, password,role,ethaddress })
            .then((result) => {
                console.log(result.data.privpem);
                var file = new Blob([result.data.privpem], {type: 'text/plain'});
                 var element = document.createElement("a");
                 element.href = URL.createObjectURL(file);
                 element.download = "privatekey.pem";
                 element.click();
               // fileDownload(element, "privatekey.pem");
                this.props.history.push("/login")
            })
            .catch(error=>{
                if(error.status === 409) {
                    this.setState({ message: "user already exists" });
                }
                console.log(error); 
            });
    }

    render() {
        const { email, password,role,ethaddress } = this.state;
        return (
            // <div class="container">
            // <h1>{this.state.message}</h1>
            //     <form class="form-signin" onSubmit={this.onSubmit}>
            //         <h2 class="form-signin-heading">Register</h2>
            //         <label for="inputEmail" class="sr-only">Email address</label>
            //         <input type="email" class="form-control" placeholder="Email address" name="email" value={email} onChange={this.onChange} required/>
            //         <label for="inputPassword" class="sr-only">Password</label>
            //         <input type="password" class="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required/>
            //         <label for="inputRole" class="sr-only">Role</label>
            //         <input type="text" class="form-control" placeholder="role" name="role" value={role} onChange={this.onChange} required/>
            //         <label for="inputAddress" class="sr-only">Eth Address</label>
            //         <input type="text" class="form-control" placeholder="Eth address" name="ethaddress" value={ethaddress} onChange={this.onChange} required/>
                    
            //         <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
            //     </form>
            // </div>

            <div class="login-page">
              <div class="form">
                <form class="login-form" onSubmit={this.onSubmit}>
                  <input type="email" placeholder="email" name="email" value={email} onChange={this.onChange} required/>
                  <input type="password" placeholder="password"name="password" value={password} onChange={this.onChange} required/>
                  <input type="text" placeholder="role" name="role" value={role} onChange={this.onChange} required/>
                  <input type="text" placeholder="ethaddress" name="ethaddress" value={ethaddress} onChange={this.onChange} required/>
                  <button>create</button>
                  <p class="message">Already registered? <Link to="/login">Sign In</Link></p>
                </form>
              </div>
        </div>
        );
    }
}

export default Create;
