import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import kyc from '../contracts/kyc';
const web3=new Web3(window.web3.currentProvider);


class view_bank_docs extends Component {

    constructor() {
        super();
        this.state = {
            bank_id:''
        }
    }

    async componentDidMount() {
        if(localStorage.getItem('jwtToken')==null)
        {
            this.props.history.push('/login');
        }
       
 
    }
    


    render() {

        return (
            <div class="container">
            <h1>hi</h1>
                
            </div>
        );
    }
}

export default view_bank_docs;
