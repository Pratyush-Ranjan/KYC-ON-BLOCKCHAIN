var express = require('express');
var router = express.Router();

var bankDocuments= require('../controllers/bankDocs');
var customer= require('../controllers/customer');
var bank= require('../controllers/forbank');

var Verifier= require('../controllers/verifier');
var checkAuth=require('../middlewares/check-auth');
var file_upload=require('../middlewares/file_upload');
var key_upload=require('../middlewares/key_upload');
//router.get('/getdocs',checkAuth.verifier,bankDocuments.getDocument);
router.post('/verification',checkAuth.bank,file_upload.upload.array('documents',1),bankDocuments.addDocument);
router.post('/get_bank_image/:bankid',checkAuth.verifier,key_upload.upload.array('privatekey',1),Verifier.getImage);
router.get('/get_banks',checkAuth.verifier,Verifier.getBanks);
router.get('/get_banks_customer',checkAuth.customer , customer.getbanks);
router.get('/get_banks_customer_etherAddress/:bankid' , checkAuth.customer,customer.getbankEtherAddress);
router.post('/put_pending_customer' , checkAuth.customer,bank.putpending);
router.post('/add_bank' , checkAuth.bank,customer.addBank);
router.post('/remove_bank' , checkAuth.customer,customer.removeBank);
router.get('/get_pending_customer',checkAuth.bank ,bank.getpending);
router.post('/bank_customer_documentupload',checkAuth.bank,file_upload.upload.array('documents',1),bank.addDocument);
router.get('/get_consented_bank',checkAuth.customer,customer.get_consented_bank);



module.exports = router;

