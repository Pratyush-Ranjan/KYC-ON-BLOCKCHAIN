import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../logo.png';
import '../App.css';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            banks : [],
            
        };
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
        axios.get('/getdocs')
        .then((result) => {
            
            this.setState({ message: result.data.success });
        })
        .catch((error) => {
            if(error.response.status === 401) {
                this.setState({ message: 'could not fetch data' });
            }
        });
    }
    
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    // onSubmit = (e) => {
    //     e.preventDefault();

    //     const { email, password } = this.state;

    //     axios.post('/login', { email, password })
    //         .then((result) => {
    //             localStorage.setItem('jwtToken', result.data.token);
    //             this.setState({ message: result.data.success });
    //             this.props.history.push({pathname:'/',state:{message:result.data.success}});
    //         })
    //         .catch((error) => {
    //             if(error.response.status === 401) {
    //                 this.setState({ message: 'Login failed. email or password not match' });
    //             }
    //         });
    // }

    render() {
        // const { email, password, message } = this.state;
        return (
            <div className="verifier">
            <header>
                  <nav>
                        <div >
                          <img class="logo" src={logo}/>
                        </div>
                        <div class="menu">
                              <ul>
                                    <li><Link class="active" to="/">Home</Link></li>
                                    <li onClick={this.logout}>Logout</li>
                              </ul>
                        </div>
                <table>
                    <tr>
                    <th>BANK NAME</th>
                    <th>IPFS ADDRESS</th>
                    <th>VERIFY</th>
                    </tr>
                    </table>
                
                    {/* <label for="inputEmail" class="sr-only">Email address</label>
                    <input type="email" class="form-control" placeholder="Email address" name="email" value={email} onChange={this.onChange} required/>
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input type="password" class="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required/>
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button> */}
                    
                    </nav>
            </header>
                
            </div>
        );
    }
}

export default Login;
