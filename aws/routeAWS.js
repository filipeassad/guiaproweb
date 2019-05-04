'use strict';
module.exports = function(app) {

    const S3_BUCKET = process.env.S3_BUCKET;
    const aws = require('aws-sdk');
    var express = require('express');
    var multer = require('multer');
    var multerS3 = require('multer-s3');
    var router = express.Router(); 

    var s3 = new aws.S3();

    var upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: S3_BUCKET,
            key: function (req, file, cb) {
                console.log(file);
                cb(null, file.originalname); //use Date.now() for unique file keys
            }
        })
    });

    router.post('/send-aws', upload.single('image'), (req, res, next) => {
        console.log(req.file);
        res.json({'url': req.file.location});
    });

    app.use('/upload-arquivo', router);

};