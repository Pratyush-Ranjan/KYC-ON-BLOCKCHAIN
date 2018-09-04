import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class get_bank_docs extends Component {

    constructor() {
        super();
        this.state = {
            banks:[]
        }
    }

    componentDidMount() {
        if(localStorage.getItem('jwtToken')==null)
        {
            this.props.history.push('/login');
        }
        axios.defaults.headers.common['Authorization'] = "bearer "+ localStorage.getItem('jwtToken');
        console.log("token"+localStorage.getItem('jwtToken'));
        
        axios.get('/verifier')
        .then((result) => {
            console.log("result"+result.data.banks[0]._id);
            this.setState({ banks: result.data.banks });
        })
        .catch((error) => {
            console.log("reaced here");
            console.log(error);
            if(error.status === 401) {
                this.setState({ message: 'could not fetch data' });
            }
        }); 
    }
    


    render() {
  
        return (
            <div class="container">
            <h1>hi</h1>
                <table>
                    <tbody>
                        {
                            this.state.banks.map((item,key)=>{
                                return (
                                    <tr key={key}>
                                        <td>{item.email}</td>
                                        <td>{item.ethaddress}</td>
                                        <td><button id={item._id}><a href={"/viewbankdocs/"+item._id}>VERIFY</a></button></td>
                                    </tr>
                                    
                                )
                            })
                        }
                    </tbody>
                    </table>
            </div>
        );
    }
}

export default get_bank_docs;
