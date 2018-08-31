var express = require('express');
var router = express.Router();

var bankDocuments= require('../controllers/bankDocs');
var checkAuth=require('../middlewares/check-auth');
var file_upload=require('../middlewares/file_upload');
router.get('/getdocs',checkAuth,bankDocuments.getDocument);
router.post('/verification',checkAuth,file_upload.upload.array('documents',1),bankDocuments.addDocument);
module.exports = router;

