const router = require('express').Router()
const AgreementController = require('../controllers/agreement.controller')
const {ensureAuthenticated}  = require('../config/auth')

router.get('/', AgreementController.get_all_agreements)
router.get('/umowa/:id', AgreementController.get_agreement
)
router.post('/umowa', AgreementController.post_agreement)
router.delete('/delete/:id',AgreementController.delete_agreement)
router.post('/update/:id', AgreementController.update_agreement)

module.exports = router