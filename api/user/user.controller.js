const userService = require('./user.service');
const socketService = require('../../services/socket.service');
const logger = require('../../services/logger.service');

async function getUserById(req, res) {
  console.log('req',req.params);
  try {
    const user = await userService.getById(req.params.id);
    res.send(user);
  } catch (err) {
    logger.error('Failed to get user', err);
    res.status(500).send({ err: 'Failed to get user' });
  }
}

async function getUsers(req, res) {
  try {
    const filterBy = {
      txt: req.query?.txt || '',
      minBalance: +req.query?.minBalance || 0,
    };
    const users = await userService.query(filterBy);
    res.send(users);
  } catch (err) {
    logger.error('Failed to get users', err);
    res.status(500).send({ err: 'Failed to get users' });
  }
}

async function deleteUser(req, res) {
  try {
    await userService.remove(req.params.id);
    res.send({ msg: 'Deleted successfully' });
  } catch (err) {
    logger.error('Failed to delete user', err);
    res.status(500).send({ err: 'Failed to delete user' });
  }
}

async function updateUser(req, res) {
  console.log('update user function',req.body);
  // console.log('user:', user);
  try {
    const user = req.body;
    const savedUser = await userService.update(user);
    res.send(savedUser);
  } catch (err) {
    logger.error('Failed to update user', err);
    res.status(500).send({ err: 'Failed to update user' });
  }
}
async function addSavedStay(req, res) {
  console.log('req.body', req.body);
  try {
    const stay = req.body;

    // const addedStay = await stayService.add(stay, user)----
    const savedStay = await userService.addSavedStay(stay);
    res.json(savedStay);
  } catch (err) {
    logger.error('Failed to add stay', err);
    res.status(500).send({ err: 'Failed to add stay' });
  }
}

module.exports = {
  getUserById,
  getUsers,
  deleteUser,
  updateUser,
  addSavedStay,
};
