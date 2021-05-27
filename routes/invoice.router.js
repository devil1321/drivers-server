const router = require('express').Router()
const InvoiceController = require('../controllers/invoice.controller');
const { ensureAuthenticated }  = require('../config/auth');

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
      
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const metadata = {
           userId:req.body.userId,
           imie:req.body.imie,
           nazwisko:req.body.nazwisko,
           formaPlatnosci:req.body.formaPlatnosci,
           data:req.body.data,
           nip:req.body.nip
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
router.get('/faktura/:id', InvoiceController.get_invoice)

router.post('/faktura',upload.single('file'), InvoiceController.post_invoice)
router.delete('/delete/:id',InvoiceController.delete_invoice)
router.post('/update/:id', InvoiceController.update_invoice)

router.get('/docs', InvoiceController.get_all_invoices_docs)
router.get('/docs/:filename', InvoiceController.get_invoice_doc)

module.exports = router