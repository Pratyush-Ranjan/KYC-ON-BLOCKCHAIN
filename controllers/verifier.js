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
var bankDocuments=require('../models/bankdocuments').BankDocuments;


exports.getBanks= (req,res)=>{
    Users.find({verified:0 , role:1},(err,banks)=>{
        res.status(200).json({
            banks
        });
    });
}
