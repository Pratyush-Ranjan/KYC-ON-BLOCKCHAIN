var express = require('express');
var router = express.Router();

var bankDocuments= require('../controllers/bankDocs');
var Verifier= require('../controllers/verifier');
var checkAuth=require('../middlewares/check-auth');
var file_upload=require('../middlewares/file_upload');
//router.get('/getdocs',checkAuth.verifier,bankDocuments.getDocument);
router.post('/verification',checkAuth.bank,file_upload.upload.array('documents',1),bankDocuments.addDocument);
router.get('/verifier',checkAuth.verifier,Verifier.getBanks);
module.exports = router;

