
const orderService = require('./order.service.js')
const logger = require('../../services/logger.service')

module.exports = {
  getOrders,
  addOrder,
  getOrderById,
  updateOrder,
  // deleteReview,
}

async function getOrders(req, res) {
  try {
    // const filterBy = req.query
    const orders = await orderService.query()
    res.send(orders)
  } catch (err) {
    logger.error('Failed to get orders', err)
    res.status(500).send({ err: 'Failed to get orders' })
  }
}

async function addOrder(req, res) {
  try {
    const order = req.body
    console.log('order', order);
    const addedOrder = await orderService.addOrder(order)
    res.send(addedOrder)
  } catch (err) {
    logger.error('Failed to add order', err)
    res.status(500).send({ err: 'Failed to add order' })
  }
}

async function getOrderById(req, res) {
  try {
    const { id } = req.params
    const order = await orderService.getById(id)
    res.json(order)
  } catch (err) {
    logger.error('Failed to get order', err)
    res.status(500).send({ err: 'Failed to get order' })
  }
}

// UPDATE
async function updateOrder(req, res) {
  try {
    const order = req.body
    const updatedOrder = await orderService.update(order)
    res.json(updatedOrder)
  } catch (err) {
    logger.error('Failed to update order', err)
    res.status(500).send({ err: 'Failed to update order' })
  }
}

// async function deleteReview(req, res) {
//   try {
//     await reviewService.remove(req.params.id)
//     res.send({ msg: 'Deleted successfully' })
//   } catch (err) {
//     logger.error('Failed to delete review', err)
//     res.status(500).send({ err: 'Failed to delete review' })
//   }
// }
