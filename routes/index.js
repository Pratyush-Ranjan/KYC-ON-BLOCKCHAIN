var express = require('express');
var router = express.Router();

var bankDocuments= require('../controllers/bankDocs');
var Verifier= require('../controllers/verifier');
var checkAuth=require('../middlewares/check-auth');
var file_upload=require('../middlewares/file_upload');
var key_upload=require('../middlewares/key_upload');
//router.get('/getdocs',checkAuth.verifier,bankDocuments.getDocument);
router.post('/verification',checkAuth.bank,file_upload.upload.array('documents',1),bankDocuments.addDocument);
router.post('/get_bank_image/:bankid',checkAuth.verifier,key_upload.upload.array('privatekey',1),Verifier.getImage);
router.get('/get_banks',checkAuth.verifier,Verifier.getBanks);
module.exports = router;

