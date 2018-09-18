'use strict';
var mongoose=require('mongoose');
var bankDocuments=require('../models/bankdocuments').BankDocuments;
var users=require('../models/user').Users
var encryptor = require('file-encryptor');
var PromiseA = require('bluebird').Promise;
var fs = PromiseA.promisifyAll(require('fs'));
const ipfsAPI = require('ipfs-api');
const ursa=require('ursa');
var crypto = require('crypto'),algorithm = 'aes-256-ctr';
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'});


exports.getDocument= async function (req,res) {
    users.find({verified:0,role:1})
    .then(data=>{
        console.log(data);
        var array=[];
        data.forEach(element => {
           array.push(element._id); 
        });
        bankDocuments.find({bank:{$in:array}})
        .then(result=>{
            res.status(200).json({
                success: true,
                data :result
            });
        })
        .catch(error=>{
            res.status(500).json({
                success:false,
                message: 'sorry! No result avaiable'
            });
        });
    })
    .catch(err=>{
        res.status(500).json({
            success:false,
            message: 'sorry! No result avaiable'
        });
    });

}


exports.addDocument= function (req,res) {
   
    var emaill =req.userData.email;
    
    var mykey=Math.random().toString(36).replace('0.', '');
    console.log("nonecnryped version of the key which is used to encrypt document :  "+mykey);
    var pubkey = ursa.createPublicKey(fs.readFileSync('./keys/verifier/pubkey.pem'));
    var enc = pubkey.encrypt(mykey, 'utf8', 'base64');
    console.log('encrypted version of the same key encrypted using public key of verifier :  ', enc, '\n');
    users.update({email:emaill},{$set:{document_key:enc}},(err,user)=>{
        //console.log("USERRRRRR"+user);
    });
    users.findOne({email:emaill}, async  function(err,bank){
        var bankid=bank._id;
        var docs='';
       
            
            //console.log("mykey"+mykey);
            encryptor.encryptFile(req.files[0].path, 'encrypted.dat', mykey,async function(err){
                var uploadedfile=fs.readFileSync('encrypted.dat');
                var testbuffer=new Buffer(uploadedfile);
                var filehash =await ipfs.files.add(testbuffer);
                    
                console.log("ipfshash of the document uploaded to IPFS : "+filehash[0].hash);
                docs=docs+filehash[0].hash;
                console.log("docs"+docs);
                var document= new bankDocuments({
                    _id: new mongoose.Types.ObjectId(),
                    bank : bankid,
                    documents : docs
                });
                document.save(function (err,result) {
                    if(err){
                        res.status(500).json({
                            success:false,
                            message: 'sorry! something happened, please try again'
                        });
                    }
                    else
                    {res.status(200).json({
                        success: true,
                        message: 'documents  added'
                    });}
                });
            });
        
    });
}


exports.getone= function (req,res) {
    var id=req.params.id;
    bankDocuments.findById(id,function (err,result) {
        if(err){
            res.status(500).json({
                success:false,
                message: 'No data corresponding to the id was found'
            });
        }
        else
        {res.status(200).json({
            success: true,
            data: result
        });}
    });
};


// exports.updateProduct= function (req,res) {
//     var id=req.params.id;
//     Products.update({_id:id},{$set: req.body},function (err,result) {
//         if(err){
//             res.status(500).json({
//                 success:false,
//                 message: 'Sorry! Product can not be updated'
//             });
//         }
//         else
//         {res.status(200).json({
//             success: true,
//             message: "Product updated"
//         });}
//     });
// };


// exports.deleteProduct= function (req,res) {
//     var id=req.params.id;
//     Products.remove({_id:id},function (err,result) {
//         if(err){
//             res.status(500).json({
//                 success:false,
//                 message: 'Sorry! Invalid order selected'
//             });
//         }
//         else
//         {res.status(200).json({
//             success: true,
//             message: 'Product deleted'
//         });}
//     })
// };


// exports.getOrder= function (req,res) {
//     Orders.find({},function (err,result) {
//         if(err){
//             res.status(500).json({
//                 success:false,
//                 message: 'sorry! No result avaiable'
//             });
//         }
//         else
//         {res.status(200).json({
//             success: true,
//             data:result
//         });}
//     });
// };


// exports.addOrder= function (req,res) {
//     Products.findById(req.body.productId,function (err,data) {
//        if(err){
//            res.status(500).json({
//                success:false,
//                message:"sorry!!Something happened"
//            });
//        }
//        if(data)
//        {
//            var order= new Orders({
//                _id: new mongoose.Types.ObjectId(),
//                product: req.body.productId,
//                quantity:req.body.quantity
//            });
//            order.save(function (err,result) {
//                if(err){
//                    res.status(500).json({
//                        success:false,
//                        message: 'sorry! something happened, please try again'
//                    });
//                }
//                else
//                {res.status(200).json({
//                    success: true,
//                    message: "Order added"
//                });}
//            });
//        }else{
//            res.status(404).json({
//                success:false,
//                message: 'sorry! something happened, please try again'
//            });
//        }

//     });
// };