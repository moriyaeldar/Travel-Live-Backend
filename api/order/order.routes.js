const express = require('express');
const {
  requireAuth,
  requireAdmin,
} = require('../../middlewares/requireAuth.middleware.js');
const { log } = require('../../middlewares/logger.middleware');
const {
  getOrders,
  getOrderById,
  addOrder,
  updateOrder,
  removeOrder,
} = require('./order.controller');
const router = express.Router();

// middleware that is specific to this router
// router.use(requireAuth)

// router.get('/', log, getOrders)//what is log????--temp
router.get('/', getOrders); //what is log????
router.get('/:id', getOrderById);
// router.post('/', requireAuth, requireAdmin, addOrder)//delete requireAuth, requireAdmin at first?--temp
// router.post('/', requireAdmin, addOrder)//delete requireAuth, requireAdmin at first?
router.post('/', addOrder); //delete requireAuth, requireAdmin at first?
// router.put('/:id', requireAuth, requireAdmin, updateOrder)----temp
router.put('/', updateOrder);
// router.delete('/:id', requireAuth, requireAdmin, removeOrder)--temp
router.delete('/:id', removeOrder);

module.exports = router;
