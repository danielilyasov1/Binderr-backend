const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getOrders, addOrder ,getOrderById, updateOrder} = require('./order.controller')
const router = express.Router()

router.get('/', getOrders)
router.post('/', addOrder)
router.get('/:id', getOrderById)
router.put('/:id',  updateOrder)
// router.delete('/:id', requireAuth, deleteOrder)

module.exports = router
