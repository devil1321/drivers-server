const router = require('express').Router()
const InvoiceController = require('../controllers/invoice.controller')
const {ensureAuthenticated}  = require('../config/auth')

router.get('/', InvoiceController.get_all_invoices)
router.get('/faktura/:id', InvoiceController.get_invoice)

router.post('/faktura', InvoiceController.post_invoice)
router.delete('/delete/:id',InvoiceController.delete_invoice)
router.post('/update/:id', InvoiceController.update_invoice)

module.exports = router