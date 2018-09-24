

'use strict';
var mongoose=require('mongoose');

var Users=require('../models/user').Users;
//var customerlistbanks=require('../models/customerlistbanks').customerlistbanks;

var bcrypt=require('bcrypt');
var jwt=require('jsonwebtoken');
var banklist = require('../models/bank_list_for_customer').Bank_list_for_customer;
var Path = require('path');
var customerlist=require('../models/customerlistbanks').customerlistbanks;
var axios = require('axios');




exports.addBank= async (req,res)=>{
    let custid = req.body.custid;
    let bankid = req.userData.userId;
    let resu = await banklist.find({_id:custid});
    let length=resu.length;
    if(length==0)
    {
        let entry=new banklist({
            _id:custid,
            banks:bankid
        });
        entry.save((err,result)=>{
            res.status(200).json({
                message:'new entry created',
                success:true
            });
        });
    }
    else{
        banklist.findByIdAndUpdate({_id:custid},{$push:{banks:bankid}},(err,result)=>{
            res.status(200).json({
                message:'appended',
                success:true
            });
        });
    }

    customerlist.update({_id:bankid},{$pull:{pendingcustomers:custid}},(err,result)=>{
        res.status(200).json({
            message:'removed from pending list',
            success:true
        });
    });
 
}
exports.getbanks = (req,res)=>{
    Users.find({ role:1},(err,banks)=>{
        res.status(200).json({
            banks
        });
    });}

 exports.getbankEtherAddress= (req,res)=>{
        
    console.log(req.params.bankid);
    Users.find({ _id:req.params.bankid},(err,banks)=>{
            console.log( 'addddad');
       
        console.log("cust id"+req.userData.userId);
            res.status(200).json({  
                ethaddress : banks[0].ethaddress,
                custid: req.userData.userId
            });
        });
    
    }

exports.get_consented_bank=async (req,res)=>{
    var custid=req.userData.userId;
    console.log("custid"+custid);
    var allbanks=new Array();
    var data=await banklist.find({_id:custid});
    console.log("Data"+data);
    allbanks=data[0].banks;
    console.log(allbanks);
    Users.find({_id:{$in:allbanks}}).then(data=>{
        res.status(200).json({
            banks:data
        });
    })
}

exports.removeBank=(req,res)=>{
    var custid=req.userData.userId;
    var bankid=req.body.bankid;
    console.log("bankid"+bankid);
    console.log("custid"+custid);
    banklist.update({_id:custid},{$pull:{banks:bankid}},(err,result)=>{
        if(result){
            res.status(200).json({
                message:'removed from pending list',
                success:true
            });
        }
        if(err)
        {
            res.status(400).json({
                message: err.message,
                success:true
            });
        }
    });
}
//  exports.putcustomerlist= (req,res)=>{
        
//         console.log(req.params.customerid);
//         var customerid  = req.params.customerid;
//         customerlistbanks.save


        
//         }