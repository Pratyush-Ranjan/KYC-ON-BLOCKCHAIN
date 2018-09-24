import React, { Component } from 'react';
import ReactDOM from 'react-dom';                    
import axios from 'axios';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import kyc from '../contracts/kyc';
const web3=new Web3(window.web3.currentProvider);


class get_bank_docs extends Component {

    constructor() {
        super();
        this.state = {
            banks:[],
            file:null
        };
       // this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.getIPFSimage = this.getIPFSimage.bind(this)
        this.verifybank = this.verifybank.bind(this)
        
    }

     componentDidMount() {
        if(localStorage.getItem('jwtToken')==null)
        {
            this.props.history.push('/login');
        }
      
        axios.defaults.headers.common['Authorization'] = "bearer "+ localStorage.getItem('jwtToken');
        console.log("token"+localStorage.getItem('jwtToken'));
        
        axios.get('/get_banks')
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
    
    getIPFSimage(e){
        const url = '/get_bank_image/'+e.target.id;
        const formData = new FormData();
        formData.append('privatekey',this.state.file);
        console.log(this.state.file);
        console.log(e.target.id+'gfdyrdyt');
        //formData.append('bank_id',e.target.id);
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        
        axios.post(url, formData,config)
        .then((result)=>
        {
            //result=JSON.parse(result);
            
            console.log(result);
            var element = document.createElement("a");
            var file = new Blob([result.data], {type:'image/jpeg'});
            element.href=URL.createObjectURL(file);
           // console.log("ref "+element.href);
            element.download = "bankdoc.jpg";
            element.click();
        });
        //axios.post('/verifier',{file:this.state.file,bankid:bank_id})
    }

    // onFormSubmit(e){
    //     e.preventDefault() // Stop form submit
    //     this.fileUpload(this.state.file).then((response)=>{
    //       console.log(response.data);
    //     })
    //   }

    onChange(e) {
        // console.log("accounts");

        console.log("beforefilestate "+e.target.files[0]);
        this.setState({file:e.target.files[0]},()=>{
            console.log("filestate "+this.state.file);
        })
        
      }


     async verifybank(e){

        
         const s = e.target.id;
        const account = await web3.eth.getAccounts();
         console.log("accounts "+account);
        await kyc.methods.addBank(s).send({
                from:account[0],
                gas:1000000
            })
            .then(result=>{
                if(result.status==false)
                {
                    console.log("could not sent consent. re-try again");
                }
            })
            .catch(error=>{
                console.log("could not transact on etherum");
            })


    
    }
    
    render() {
        return (
            <div class="container">
            <h1>h</h1>
            <input type="file" onChange={this.onChange} />
            <table>
                <tbody>
                    {
                        this.state.banks.map((item,key)=>{
                            return (
                                <tr key={key}>
                                    <td>{item.email}</td>
                                    <td>{item.ethaddress}</td>
                                    <td><button id={item._id} onClick={this.getIPFSimage}>GET IMAGE</button></td>
                                    <td><button id={item.ethaddress} onClick={this.verifybank}>Verify Bank</button></td>

                                    {/* <td><button ><a href={"/viewbankdocs/"+item._id}>VERIFY</a></button></td> */}
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
