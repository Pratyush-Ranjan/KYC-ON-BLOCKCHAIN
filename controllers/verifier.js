

'use strict';
var mongoose=require('mongoose');

var Users=require('../models/user').Users;
var bcrypt=require('bcrypt');
var jwt=require('jsonwebtoken');
var PromiseA = require('bluebird').Promise;
var fs = PromiseA.promisifyAll(require('fs'));
var Path = require('path');
var ursa = require('ursa');
var mkdirpAsync = PromiseA.promisify(require('mkdirp'));
var encryptor = require('file-encryptor');
var axios = require('axios');
var bankDocuments=require('../models/bankdocuments').BankDocuments;
const path = Path.resolve('images/encrypted_bankdoc.jpg')

async function downloadImage (url) {  
    

    console.log("path"+path);
    console.log("url:"+url);
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream'
    })
  
    // pipe the result stream into a file on disc
    response.data.pipe(fs.createWriteStream(path))
    
    // return a promise and resolve when download finishes
    return new Promise((resolve, reject) => {
      response.data.on('end', () => {
          console.log("file downloaded : "+response.data);
        resolve(response.data)
      })
  
      response.data.on('error', () => {
          console.log("could not download");
        reject(error)
      })
    })
  
  }


exports.getImage= async (req,res)=>{
    console.log(req.params.bankid);
    var privkey = ursa.createPrivateKey(fs.readFileSync('keys/verifier/privkey.pem'));
    console.log("privkey:"+privkey);
    var banks = await Users.find({_id:req.params.bankid}); // find the bank with the bank id as found in req.
    var dec = privkey.decrypt(banks[0].document_key,'base64','utf8'); // decrypt document key of that bank
    console.log("decrypted key "+dec);
    bankDocuments.find({bank:banks[0]._id},async (err,result)=>{ // find the documents of that bank
    console.log("document"+result[0].documents[0]);
    const url='https://gateway.ipfs.io/ipfs/'+result[0].documents[0];
    await downloadImage(url)
    .then(data=>{
        encryptor.decryptFile(path, 'images/bankdoc.jpg', dec, function(err){
            //var finalfile=fs.readFileSync('images/bankdoc.jpg');
            //console.log(finalfile);
            res.set({'Content-Type': 'image/jpg'});
            res.status(200).sendFile(Path.join(__dirname,'../images/','bankdoc.jpg'));
        });
    })
    .catch(error=>{
        res.status(500).json({
            message:"could not fetch bank image",
            success:false,
            path_to_file:null
        });
    });      
    });
}

exports.getBanks= (req,res)=>{
    Users.find({verified:0 , role:1},(err,banks)=>{
        res.status(200).json({
            banks
        });
    });
}
