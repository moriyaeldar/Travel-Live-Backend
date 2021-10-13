const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware.js')
const { log } = require('../../middlewares/logger.middleware')
const { getStays, getStayById, addStay, updateStay, removeStay } = require('./stay.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

// router.get('/', log, getStays)//what is log????--temp
router.get('/', getStays)//what is log????
router.get('/:id', getStayById)
// router.post('/', requireAuth, requireAdmin, addStay)//delete requireAuth, requireAdmin at first?--temp
// router.post('/', requireAdmin, addStay)//delete requireAuth, requireAdmin at first?
router.post('/', addStay)//delete requireAuth, requireAdmin at first?
// router.put('/:id', requireAuth, requireAdmin, updateStay)----temp
router.put('/', updateStay)
// router.delete('/:id', requireAuth, requireAdmin, removeStay)--temp
router.delete('/:id', removeStay)

module.exports = router