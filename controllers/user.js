'use strict';
var mongoose=require('mongoose');

var Users=require('../models/user').Users;
var bcrypt=require('bcrypt');
var jwt=require('jsonwebtoken');
var PromiseA = require('bluebird').Promise;
var fs = PromiseA.promisifyAll(require('fs'));
var path = require('path');
var ursa = require('ursa');
var mkdirpAsync = PromiseA.promisify(require('mkdirp'));

function keypair(pathname) {
    var key = ursa.generatePrivateKey(1024, 65537);
    var privpem = key.toPrivatePem();
    var pubpem = key.toPublicPem();
    var pubkey = path.join(pathname, 'pubkey.pem'); // generate pem file from pubkey
    var privkey = path.join(pathname, 'privkey.pem'); // generate pem file from pubkey
    console.log("private key of the bank : "+privpem);
    console.log("public key of the bank : "+pubpem);
    return mkdirpAsync(pathname).then(function () {
      return PromiseA.all([
       fs.writeFileAsync(pubkey, pubpem, 'ascii'), // write public key as pubkey.pem
       fs.writeFileAsync(privkey, privpem, 'ascii') // write public key as privkey.pem
      ]);
    }).then(function () {
      return privkey;
    });
}

exports.register= function (req,res) {
    Users.find({email: req.body.email},function(err,data){
        if(data.length>=1){
            return res.status(409).json({
                success:false,
                message: 'user already exists'
            });
        }else{
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'sorry! something happened, please try again'
                    });
                } else {
                    var user = new Users({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                        role : req.body.role,
                        ethaddress : req.body.ethaddress,
                        publickey:''

                    });
                    user.save(function (err, result) {
                        if (err) {
                            res.status(500).json({
                                success: false,
                                message: 'sorry! something happened, please try again'
                            });
                        }else{
                            var p;
                            if(result.role==0)
                                {
                                    p="verifier";
                                }
                                else{
                                    p=result._id;
                                }
                            PromiseA.all([
                                
                                keypair('keys/'+p+'/')
                              ]).then(function (privkey) {
                                console.log(p);
                        
                                Users.update({_id:result._id},{$set:{publickey:'keys/'+p+'/pubkey.pem'}},(err,User)=>{
                                    if(User)
                                    {
                                        res.status(200).json({
                                            success: true,
                                            message: 'generated private key for download as txt',
                                            privpem:privkey
                                        });
                                        
                                    }
                                });
                              }).catch(err2=>{
                                  console.log("couldnt");
                                  user.findOneAndRemove({_id:result._id}).then(removeres=>{
                                    res.status(500).json({
                                        success: false,
                                        message: 'sorry! something happened, please try again'
                                    });
                                  });
                                
                              });
                            
                        }
                    });
                }
            });
        }
    });

}

exports.deleteuser= function (req,res) {
    var id=req.params.id;
    Users.remove({_id:id},function (err,result) {
        if(err){
            res.status(500).json({
                sucess:false,
                message: 'invalid user'
            });
        }else{
            res.status(200).json({
                success:true,
                message: 'user deleted'
            });

        }
    });
};


exports.login= function (req,res) {
    Users.find({email: req.body.email},function (err,data) {
       if(data.length<1 || err){
           return res.status(401).json({
               success: false,
               message: 'invalid user'
           });
       }else{
           bcrypt.compare(req.body.password,data[0].password,function (err,result) {
               if(err){
                   return res.status(401).json({
                       success: false,
                       message: 'invalid user'
                   });
               }
               if(result){
                   var token= jwt.sign({
                      email: data[0].email,
                       userId: data[0]._id,
                       role:data[0].role
                   },
                       'secret',
                       {expiresIn:"1h"}
                       );
                   return res.status(200).json({
                       success: 'successfully logged in',
                       token: token
                   });
               }else {
                   return res.status(401).json({
                       success: false,
                       message: 'invalid user'
                   });
               }
           });
       }
    });
};