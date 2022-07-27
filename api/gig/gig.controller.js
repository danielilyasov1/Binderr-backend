const logger = require('../../services/logger.service')
const gigService = require('./gig.service')

module.exports = {
  getGigs,
  getGigById,
  // addGig,
  // updateGig,
  // removeGig,
}

// LIST
async function getGigs(req, res) {
  try {
    const filterBy = req.query
    const gigs = await gigService.query(filterBy)
    res.json(gigs)
  } catch (err) {
    logger.error('Failed to get gigs', err)
    res.status(500).send({ err: 'Failed to get gigs' })
  }
}

// READ
async function getGigById(req, res) {
  try {
    const { id } = req.params
    const gig = await gigService.getById(id)
    res.json(gig)
  } catch (err) {
    logger.error('Failed to get gig', err)
    res.status(500).send({ err: 'Failed to get gig' })
  }
}

// CREATE
// async function addGig(req, res) {
//   try {
//     const gig = req.body
//     const addedGig = await gigService.add(gig)
//     res.json(addedGig)
//   } catch (err) {
//     logger.error('Failed to add gig', err)
//     res.status(500).send({ err: 'Failed to add gig' })
//   }
// }

// UPDATE
// async function updateGig(req, res) {
//   try {
//     const gig = req.body
//     const updatedGig = await gigService.update(gig)
//     res.json(updatedGig)
//   } catch (err) {
//     logger.error('Failed to update gig', err)
//     res.status(500).send({ err: 'Failed to update gig' })
//   }
// }

// DELETE
// async function removeGig(req, res) {
//   try {
//     const { id } = req.params
//     const removedId = await toyService.remove(id)
//     res.send(removedId)
//   } catch (err) {
//     logger.error('Failed to remove gig', err)
//     res.status(500).send({ err: 'Failed to remove gig' })
//   }
// }
