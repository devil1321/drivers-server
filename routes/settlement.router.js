const router = require('express').Router()
const SettlementController = require('../controllers/settlement.controller')
const {ensureAuthenticated}  = require('../config/auth')

router.get('/', SettlementController.get_all_settlements)
router.get('/:id', SettlementController.get_all_user_settlements)
router.get('/rozliczenie/:id', SettlementController.get_settlement)

router.post('/rozliczenie', SettlementController.post_settlement)
router.delete('/delete/:id',SettlementController.delete_settlement)
router.post('/update/:id', SettlementController.update_settlement)

module.exports = router