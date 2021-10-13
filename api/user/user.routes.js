const express = require('express');
const {
  requireAuth,
  requireAdmin,
} = require('../../middlewares/requireAuth.middleware');
const {
  getUserById,
  getUsers,
  deleteUser,
  updateUser,
  addSavedStay,
} = require('./user.controller');
const router = express.Router();

// middleware that is specific to this router
// router.use(requireAuth)

// router.get('/', getUsers)
router.get('/:id', getUserById);
// router.put('/', updateUser);
router.put('/:id', updateUser);
router.post('/', addSavedStay);
// router.delete('/:id', removeSavedStay)

// router.put('/:id',  requireAuth, updateUser)
module.exports = router;
