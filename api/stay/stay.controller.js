// server functions

const stayService = require('./stay.service.js');
const logger = require('../../services/logger.service');

// GET LIST
async function getStays(req, res) {
  try {
    var queryParams = req.query;
    // var queryParams = {---
    // title: req.query.title,---
    //   inStock: req.query.inStock? JSON.parse(req.query.inStock): null,
    // label: req.query.label,
    //   labels: req.query.labels
    // }---

    // console.log('queryParams', queryParams);
    const stays = await stayService.query(queryParams);
    // console.log('stays in get stays server', stays);
    res.json(stays);
  } catch (err) {
    logger.error('Failed to get stays', err);
    res.status(500).send({ err: 'Failed to get stays' });
  }
}

// GET BY ID
async function getStayById(req, res) {
  try {
    console.log('req.params', req.params);
    const stayId = req.params.id;
    const stay = await stayService.getById(stayId);
    res.json(stay);
  } catch (err) {
    logger.error('Failed to get stay', err);
    res.status(500).send({ err: 'Failed to get stay' });
  }
}

// POST (add stay)
async function addStay(req, res) {
  console.log('add stay in server');
  console.log('req.body', req.body);
  try {
    // const stay = req.body.stay;
    const stay = req.body;
    // const user = req.body.user;----
    //   const stay = {
    //     // _id: req.body._id,
    //     title: req.body.stay.title,
    //     price: req.body.stay.price,
    //     inStock: req.body.stay.inStock? JSON.parse(req.body.inStock):null,
    //     createdAt: +req.body.stay.createdAt,
    //     labels: req.body.stay.labels

    // }---temp
    //   const user = {
    //     // _id: req.body._id,
    //     _id: req.body.user._id,
    //     username: req.body.user.username,
    //     // password: req.body.user.password,
    //     fullname: req.body.user.fullname,
    //     isAdmin: req.body.user.isAdmin? JSON.parse(req.body.user.isAdmin):false

    // }--temp
    // console.log('user in addStay controller in backend', user)
    console.log('added stay in server', stay);
    stay.reviews = [];
    // stay.host.imgUrl="https://a0.muscache.com/im/users/35191034/profile_pic/1433675940/original.jpg"
    (stay.avgReviewRating = 4.9),
      (stay.stayReviewSum = {
        cleanliness: 3.8,
        communication: 3.9,
        checkIn: 3.5,
        accuracy: 4.1,
        location: 4.6,
        value: 4.8,
      });
    // const addedStay = await stayService.add(stay, user)----
    const addedStay = await stayService.add(stay);
    res.json(addedStay);
  } catch (err) {
    logger.error('Failed to add stay', err);
    res.status(500).send({ err: 'Failed to add stay' });
  }
}

// PUT (Update stay)
async function updateStay(req, res) {
  console.log('update stay in controller (44------------------)');
  console.log(' req.body in update stay in server', req.body);
  try {
    const stay = req.body;
    // const stay = {----temp
    //   _id: req.body._id,---
    //   title: req.body.title,----
    //   price: +req.body.price,
    //   inStock: req.body.inStock? JSON.parse(req.body.inStock):null,
    //   createdAt: Date.now(),
    //   labels: req.body.labels
    // }
    console.log(' stay in update stay in server', stay);
    const updatedStay = await stayService.update(stay);
    res.json(updatedStay);
  } catch (err) {
    logger.error('Failed to update stay', err);
    res.status(500).send({ err: 'Failed to update stay' });
  }
}

// DELETE (Remove stay)
async function removeStay(req, res) {
  try {
    const stayId = req.params.id;
    const removedId = await stayService.remove(stayId);
    res.send(removedId);
  } catch (err) {
    logger.error('Failed to remove stay', err);
    res.status(500).send({ err: 'Failed to remove stay' });
  }
}

module.exports = {
  getStays,
  getStayById,
  addStay,
  updateStay,
  removeStay,
};
