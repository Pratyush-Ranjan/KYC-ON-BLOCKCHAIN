
var jwt= require('jsonwebtoken');

exports.customer = function (req,res,next) {
    try {
        var token= req.headers.authorization.split(" ")[1];
        var decoded = jwt.verify(token, 'secret');
        req.userData= decoded;
        if(req.userData.role==2)
            next();
        else{
            throw error = new Error('please login as a customer');
        }
    }catch(error){
        return res.status(401).json({
            success:false,
            message: "please login asa customer"
        });
    }
};

exports.bank = function (req,res,next) {
    try {
        var token= req.headers.authorization.split(" ")[1];
        var decoded = jwt.verify(token, 'secret');
        req.userData= decoded;
        if(req.userData.role==1)
            next();
        else{
            throw error = new Error('please login as a bank');
        }
    }catch(error){
        return res.status(401).json({
            success:false,
            message: "please login as a bank"
        });
    }
};

exports.verifier = function (req,res,next) {
    try {
        var token= req.headers.authorization.split(" ")[1];
        var decoded = jwt.verify(token, 'secret');
        req.userData= decoded;
        if(req.userData.role==0)
            next();
        else{
            throw error = new Error();
        }
    }catch(error){
        return res.status(401).json({
            success:false,
            message: 'please login as a verifier'
        });
    }
};

exports.general = function (req,res,next) {
    try {
        var token= req.headers.authorization.split(" ")[1];
        var decoded = jwt.verify(token, 'secret');
        req.userData= decoded;
        next();
    }catch(error){
        return res.status(401).json({
            success:false,
            message: 'user'
        });
    }
};