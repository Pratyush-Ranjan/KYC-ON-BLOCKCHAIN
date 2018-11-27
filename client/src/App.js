import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.png';
import './App.css';
import Login from "./components/Login";
import Register from "./components/Register";
import Routes from "./index.js"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email:'',
            message:'',
            role:''
        };
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        console.log("token"+localStorage.getItem('jwtToken'));
        // if(localStorage.getItem('jwtToken')==null)
        // {
        //     this.props.history.push('/login');
        // }
        // else{
        if(localStorage.getItem('jwtToken')!=null)
        {
            console.log("before role:"+localStorage.getItem('role'));
            // if(localStorage.getItem('role')!=null)
            // {
            //     this.setState({role:localStorage.getItem('role')});
            // }
            console.log("after role:"+this.state.role);
            if(localStorage.getItem('role')==1)
            {
                this.props.history.push('/bank');
            }
            else if(localStorage.getItem('role')==2)
            {
                this.props.history.push('/customer/getbanks');
            }
            else if(localStorage.getItem('role')==0)
            {
                this.props.history.push('/verifybank');
            }
        }
        // axios.get('/')
        //     .then(res => {
        //         this.setState({message:"logged in"});
        //     })
        //     .catch((error) => {
        //         if(error.response.status === 401) {
        //             this.props.history.push("/login");
        //         }
        //     });
    }

    logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.reload();
    }

    render() {
        return (
            <div class="home">
            <header>
                  <nav>
                        <div >
                          <img class="logo" src={logo}/>
                        </div>
                        <div class="menu">
                              <ul>
                                    <li>
                                    <Link class="active" to="/login">Login</Link>
                                    </li>
                                    <li>
                                    <Link class="active" to="/register">Register</Link>
                                    </li>
                              </ul>
                        </div>
                        <h1 align='center' class="container1"> A Decentralized KYC System using Blockchain based Smart Contracts</h1>

                  </nav>
            </header>

      </div>
        );
    }
}

export default App;
