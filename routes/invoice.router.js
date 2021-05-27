const router = require('express').Router()
const InvoiceController = require('../controllers/invoice.controller');
const { ensureAuthenticated }  = require('../config/auth');

const path = require('path')
const crypto = require('crypto')
const mongoose = require('mongoose')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')




const MongoURI = 'mongodb://localhost:27017/DriversApp?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
const conn = mongoose.createConnection(MongoURI)


let gfs;
conn.once('open',()=>{
    // init stream
    gfs = Grid(conn.db,mongoose.mongo)
    gfs.collection('Faktury')
})


const storage = new GridFsStorage({
  url:MongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        console.log(req.body)
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const metadata = {
           userId:req.body.userId,
           imie:req.body.imie,
           nazwisko:req.body.nazwisko,
           formaPlatnosci:req.body.formaPlatnosci,
           data:req.body.data,
           nip:req.body.nip,
           kwota:req.body.kwota
        }
        const fileInfo = {
          filename: filename,
          metadata: metadata,
          bucketName: 'Faktury',
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

router.get('/', InvoiceController.get_all_invoices)
router.get('/faktura/:filename',  InvoiceController.get_invoice)

router.post('/faktura/',upload.single('file'), InvoiceController.post_invoice)

router.get('/faktura/update/:filename',  InvoiceController.update_invoice)
router.delete('/faktura/delete/:filename', InvoiceController.delete_invoice)

module.exports = router