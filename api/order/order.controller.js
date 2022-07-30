
const orderService = require('./order.service')
const userService = require('../user/user.service')
const gigService = require('../gig/gig.service')
const logger = require('../../services/logger.service')

module.exports = {
  getOrders,
  addOrder,
  getOrderById,
  updateOrder,
  // deleteReview,
}

async function enrichOrderData(order) {
  return {
    ...order,
    buyer: await userService.getById(order.buyerId),
    seller: await userService.getById(order.sellerId),
    gig: await gigService.getById(order.gigId),
  }
}

async function getOrders(req, res) {
  try {
    // const filterBy = req.query
    const orders = await orderService.query()
    const enrichedOrders = [];
    for (const order of orders) {
      enrichedOrders.push(await enrichOrderData(order))
    }
    res.json(enrichedOrders);
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
    res.json(await enrichOrderData(addedOrder))
  } catch (err) {
    logger.error('Failed to add order', err)
    res.status(500).send({ err: 'Failed to add order' })
  }
}

async function getOrderById(req, res) {
  try {
    const { id } = req.params
    const order = await orderService.getById(id)
    res.json(await enrichOrderData(order))
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
    res.json(await enrichOrderData(updatedOrder))
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
