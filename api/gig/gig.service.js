const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
  // remove,
  query,
  getById,
  // add,
  // update,
}

async function query(filterBy) {
  try {
    console.log('filterBy', filterBy)
    const criteria = _buildCriteria(filterBy)
    // const criteria = {}

    const collection = await dbService.getCollection('gig')
    var gigs = await collection.find(criteria).toArray()
    let filterd = []
    if (filterBy.category && filterBy.priceBy) {
      const { min, max } = JSON.parse(filterBy.priceBy)
      const { category, title } = filterBy

      filterd = gigs.filter((gig) => {
        if (title) {
          return (
            gig.category === category &&
            gig.title.includes(title) &&
            gig.price > min &&
            gig.price < max
          )
        }
        console.log('gig', gig.price, gig.category)
        return (
          gig.category === category &&
          gig.price > min &&
          gig.price < max
        )
      })
      console.log('filtered', filterd)
    }

    return filterd.length ? filterd : gigs
  } catch (err) {
    logger.error('cannot find gigs', err)
    throw err
  }
}

async function getById(gigId) {
  try {
    const collection = await dbService.getCollection('gig')
    const gig = collection.findOne({ _id: ObjectId(gigId) })
    return gig
  } catch (err) {
    logger.error(`while finding gig ${gigId}`, err)
    throw err
  }
}

// async function remove(gigId) {
//   try {
//     const collection = await dbService.getCollection('gig')
//     await collection.deleteOne({ _id: ObjectId(gigId) })
//     return gigId
//   } catch (err) {
//     logger.error(`cannot remove gig ${gigId}`, err)
//     throw err
//   }
// }

// async function add(gig) {
//   try {
//     const collection = await dbService.getCollection('gig')
//     const addedGig = await collection.insertOne(gig)
//     return addedGig
//   } catch (err) {
//     logger.error('cannot insert gig', err)
//     throw err
//   }
// }

// async function update(gig) {
//   try {
//     var id = ObjectId(gig._id)
//     delete gig._id
//     const collection = await dbService.getCollection('gig')
//     await collection.updateOne({ _id: id }, { $set: { ...gig } })
//     return gig
//   } catch (err) {
//     logger.error(`cannot update gig ${gig._id}`, err)
//     throw err
//   }
// }

function _buildCriteria(filterBy) {
  const criteria = {}

  // by name
  // const regex = new RegExp(filterBy.name, 'i')
  // criteria.name = { $regex: regex }

  // filter by inStock
  // if (filterBy.inStock) {
  //   criteria.inStock = { $eq: JSON.parse(filterBy.inStock) }
  // }

  // filter by labels
  // if (filterBy.labels?.length) {
  //   criteria.labels = { $in: filterBy.labels }
  // }

  //what we need to use
  // try {
  //   const gigs = await storageService.query(KEY)
  //   if (filterBy.category && filterBy.priceBy) {
  //     const { category, priceBy, title } = filterBy
  //     console.log('priceBy',priceBy)
  //     const filterd = gigs.filter((gig) => {
  //       if (title) {
  //         return (
  //           gig.category === category &&
  //           gig.title.includes(title) &&
  //           gig.price > priceBy.min &&
  //           gig.price < priceBy.max
  //         )
  //       }
  //       return (
  //         gig.category === category &&
  //         gig.price > priceBy.min &&
  //         gig.price < priceBy.max
  //       )
  //     })

  //     return Promise.resolve(filterd)
  //   }
  //   const { title, category ,priceBy} = filterBy
  //   const regex = new RegExp(title, 'i')
  //   console.log('ata mefager')
  //   let filteredGigs

  //   if (!category && !priceBy) {
  //     filteredGigs = gigs.filter((gig) => regex.test(gig.title))

  //     return Promise.resolve(filteredGigs)
  //   }

  //   if (!category) {
  //     filteredGigs = gigs.filter((gig) => regex.test(gig.title))
  //                   .filter((gig) => gig.price > priceBy.min && gig.price < priceBy.max)

  //     return Promise.resolve(filteredGigs)
  //   }

  //   filteredGigs = gigs
  //     .filter((gig) => regex.test(gig.title))
  //     .filter((gig) => gig.category === category)
  //     .filter((gig) => gig.price > priceBy.min && gig.price < priceBy.max)

  //   return Promise.resolve(filteredGigs)
  // } catch (err) {
  //   console.error(err)
  // }

  return criteria
}
