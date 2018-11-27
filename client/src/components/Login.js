import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';
import Register from "./Register";
import Routes from "../index.js"
import { BrowserRouter as Router, Route} from "react-router-dom";

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            message: '',
            role:''
        };
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
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
            if(localStorage.getItem('role')!=null)
            {
                this.setState({role:localStorage.getItem('role')});
            }
            if(this.state.role==1)
            {
                this.props.history.push('/bank');
            }
            else if(this.state.role==2)
            {
                this.props.history.push('/customer/getbanks');
            }
            else if(this.state.role==0)
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


    onSubmit = (e) => {
        e.preventDefault();

        const { email, password } = this.state;

        axios.post('/login', { email, password })
            .then((result) => {
                console.log("role : "+result.data.role);
                localStorage.setItem('jwtToken', result.data.token);
                localStorage.setItem('role', result.data.role);
                this.setState({ role : result.data.role , message: result.data.success });
               
                this.props.history.push({pathname:'/',state:{message:result.data.success,role:result.data.role}});
            })
            .catch((error) => {
                if(error.response.status === 401) {
                    this.setState({ message: 'Login failed. email or password not match' });
                }
            });
    }

    render() {
        const { email, password, message } = this.state;
        return (
            // <div class="container">
                
            //     <form class="form-signin" onSubmit={this.onSubmit}>
            //         {message !== '' &&
            //         <div class="alert alert-warning alert-dismissible" role="alert">
            //             { message }
            //         </div>
            //         }
            //         <h2 class="form-signin-heading">Please sign in</h2>
            //         <label for="inputEmail" class="sr-only">Email address</label>
            //         <input type="email" class="form-control" placeholder="Email address" name="email" value={email} onChange={this.onChange} required/>
            //         <label for="inputPassword" class="sr-only">Password</label>
            //         <input type="password" class="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required/>
            //         <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
            //         <p>
            //             Not a member? <Link to="/register"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Register here</Link>
            //         </p>
            //     </form>
            // </div>

            <div class="login-page">
              <div class="form">
                <form class="login-form" onSubmit={this.onSubmit}>
                  <input type="email" placeholder="email" name="email" value={email} onChange={this.onChange} required/>
                  <input type="password" placeholder="password"name="password" value={password} onChange={this.onChange} required/>
                  <button>login</button>
                  <p class="message">Not registered? <Link to="/register">Register</Link></p>
                </form>
              </div>
        </div>
        );
    }
}

export default Login;
