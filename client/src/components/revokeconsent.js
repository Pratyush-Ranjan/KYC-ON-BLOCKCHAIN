import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import kyc from '../contracts/kyc';
import logo from '../logo.png';
import '../App.css';
const web3 = new Web3(window.web3.currentProvider);


class revoke_consent extends Component {

    constructor() {
        super();
        this.state = {
            banks:[],
            file:null
        };
       // this.onFormSubmit = this.onFormSubmit.bind(this)
       this.revokeconsent = this.revokeconsent.bind(this)
        // this.getIPFSimage = this.getIPFSimage.bind(this)
        this.logout = this.logout.bind(this)
        
    }


    logout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('role');
        window.location.reload();
    }


 componentDidMount() {
        console.log('working');
        if(localStorage.getItem('jwtToken')==null)
        {
            this.props.history.push('/login');
        }

        axios.defaults.headers.common['Authorization'] = "bearer "+ localStorage.getItem('jwtToken');
        console.log("token"+localStorage.getItem('jwtToken'));
        axios.get('/get_consented_bank')
        .then((result) => {
            console.log(result);
            this.setState({ banks: result.data.banks });
        })
        .catch((error) => {
            console.log("reaced here");
            //console.log(error);
            if(error.status === 401) {
                this.setState({ message: 'could not fetch data' });
            }
        });
       
    }

    

   async revokeconsent(e)
      { 
        var bankid= e.target.id;
        //console.log("bank id"+id);
        var parent=e.target.parentElement;
        console.log(parent.id);
        var ethaddress=parent.id;    
        const account= await web3.eth.getAccounts();
        console.log("accounts "+account[0]);
        await kyc.methods.revokeConsent(ethaddress).send({
            from:account[0],
            gas:1000000
        })
        .then(result=>{
            if(result.status==false)
            {
                console.log("could not transact. re-try again");
            }
            else if(result.status==true)
            {
                axios.post('/remove_bank',{
                    bankid:bankid
            
                }).then((result)=>{
                    console.log("removed bank from the bank list of customer");
                }).catch(errorr=>{
                    console.log("could not update db");
                });
            }
        });
            
        }
    
    
    render() {
        return (
            <div className="customer">
            <header>
                  <nav>
                        <div>
                          <img class="logo" src={logo}/>
                        </div>
                        <div class="menu">
                              <ul>
                                    <li><Link class="active" to="/">Home</Link></li>
                                    <li><Link class="active" to="/customer/getbanks">New Bank</Link></li>
                                    <li><Link class="active" to="/customer/revokeconsent">Connected Banks</Link></li>
                                    <li onClick={this.logout}>Logout</li>
                              </ul>
                        </div>
            <table id="customers" align="center">
                <tbody>
                <tr>
                    <th>EMAIL</th>
                    <th>ETH ADDRESS</th>
                    <th>REVOKE CONSENT</th>
                    
                    </tr>
                    {
                        this.state.banks.map((item,key)=>{
                            console.log('hasdad');
                            return (
                                <tr key={key}>
                                    <td>{item.email}</td>
                                    <td>{item.ethaddress}</td>
                                    <td id={item.ethaddress}><button id={item._id} onClick = {this.revokeconsent}>Revoke consent</button></td>
                                    {/* <td><button ><a href={"/viewbankdocs/"+item._id}>VERIFY</a></button></td> */}
                                </tr>
                                
                            )
                        })
                    }
                 </tbody>
            </table>
               </nav>
            </header>
            </div>
        );
    }
}

export default revoke_consent;
