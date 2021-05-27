const router = require('express').Router()
const AgreementController = require('../controllers/agreement.controller')
const {ensureAuthenticated}  = require('../config/auth')

const path = require('path')
const crypto = require('crypto')
const mongoose = require('mongoose')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')

let Invoice  = require('../models/invoice')

const MongoURI = 'mongodb://localhost:27017/DriversApp?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
const conn = mongoose.createConnection(MongoURI)

let gfs;

conn.once('open',()=>{
    // init stream
    gfs = Grid(conn.db,mongoose.mongo)
    gfs.collection('Umowy')
})


const storage = new GridFsStorage({
    url:MongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
        
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const metadata = {
            userId:req.body.userId,
            rodzaj:req.body.rodzaj,
            data:req.body.data,
            imie:req.body.imie,
            nazwisko:req.body.nazwisko,
            adres:req.body.adres,
            kodPocztowy:req.body.zip,
            miejscowosc:req.body.miejscowosc,
            pesel:req.body.pesel,
            nrDowodu:req.body.nrDowodu
          }
          const fileInfo = {
            filename: filename,
            metadata: metadata,
            bucketName: 'Umowy',
          };
          resolve(fileInfo);
        });
      });
    }
});

const upload = multer({ storage });

router.get('/', AgreementController.get_all_agreements)
router.post('/umowa', upload.single('file'), AgreementController.post_agreement)
router.get('/umowa/:filename', AgreementController.get_agreement)

router.post('/update/:id', AgreementController.update_agreement)
router.delete('/delete/:filename',AgreementController.delete_agreement)

module.exports = router