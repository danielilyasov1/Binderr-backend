const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
// const userService = require('../user/user.service')

module.exports = {
  query,
  addOrder,
  // remove,
}

async function query(filterBy = {}) {
  try{
    const collection = await dbService.getCollection('order')
     var orders = await collection.find({}).toArray()
  }catch(e){
    console.error('error cant get orders', e)
  }

  return orders
}

// async function addOrder({ userId, toyId, content, rate }) {
//   const reviewToAdd = {
//     userId: ObjectId(userId),
//     toyId: ObjectId(toyId),
//     content,
//     rate,
//   }

//   const collection = await dbService.getCollection('review')
//   const addedReviewData = await collection.insertOne(reviewToAdd)
//   reviewToAdd._id = addedReviewData.insertedId
//   return reviewToAdd
// }

async function addOrder(order) {
    try {
      const collection = await dbService.getCollection('order')
      const addedOrder = await collection.insertOne(order)
      console.log('added', addedOrder);
      return addedOrder
    } catch (err) {
      logger.error('cannot insert order', err)
      throw err
    }
  }




// async function remove(reviewId) {
//   try {
//     const collection = await dbService.getCollection('review')
//     const criteria = { _id: ObjectId(reviewId) }
//     await collection.deleteOne(criteria)
//   } catch (err) {
//     logger.error(`cannot remove review ${reviewId}`, err)
//     throw err
//   }
// }

function _buildCriteria(filterBy) {
  console.log(filterBy)
  if (filterBy.userId) {
    return { userId: ObjectId(filterBy.userId) }
  } else if (filterBy.toyId) {
    return { toyId: ObjectId(filterBy.toyId) }
  }
  return {}
}
