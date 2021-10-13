// server functions

const orderService = require('./order.service.js');
const logger = require('../../services/logger.service');

// GET LIST
async function getOrders(req, res) {
  try {
    var queryParams = {
      userId: req.query.userId,
      isHost: req.query.isHost,
    };
    const orders = await orderService.query(queryParams);
    res.json(orders);
  } catch (err) {
    logger.error('Failed to get orders', err);
    res.status(500).send({ err: 'Failed to get orders' });
  }
}

// GET BY ID
async function getOrderById(req, res) {
  try {
    const orderId = req.params.id;
    const order = await orderService.getById(orderId);
    res.json(order);
  } catch (err) {
    logger.error('Failed to get order', err);
    res.status(500).send({ err: 'Failed to get order' });
  }
}

// POST (add order)
async function addOrder(req, res) {
  try {
    const order = req.body;
    // const order = req.body.order;--
    // const user = req.body.user;---
    //   const order = {
    //     // _id: req.body._id,
    //     title: req.body.order.title,
    //     price: req.body.order.price,
    //     inStock: req.body.order.inStock? JSON.parse(req.body.inStock):null,
    //     createdAt: +req.body.order.createdAt,
    //     labels: req.body.order.labels

    // }---temp
    //   const user = {
    //     // _id: req.body._id,
    //     _id: req.body.user._id,
    //     username: req.body.user.username,
    //     // password: req.body.user.password,
    //     fullname: req.body.user.fullname,
    //     isAdmin: req.body.user.isAdmin? JSON.parse(req.body.user.isAdmin):false

    // }--temp
    // console.log('user in addOrder controller in backend', user)
    console.log('added order in server', order);
    // const addedOrder = await orderService.add(order, user)
    const addedOrder = await orderService.add(order);
    res.json(addedOrder);
  } catch (err) {
    logger.error('Failed to add order', err);
    res.status(500).send({ err: 'Failed to add order' });
  }
}

// PUT (Update order)
async function updateOrder(req, res) {
  console.log('update order in controller (44)');
  try {
    const order = req.body;
    // const order = {--
    // _id: req.body._id,--
    // title: req.body.title,--
    //   price: +req.body.price,
    //   inStock: req.body.inStock? JSON.parse(req.body.inStock):null,
    //   createdAt: Date.now(),
    //   labels: req.body.labels
    // }---
    console.log(' req.body in update order in server', req.body);
    const updatedOrder = await orderService.update(order);
    res.json(updatedOrder);
  } catch (err) {
    logger.error('Failed to update order', err);
    res.status(500).send({ err: 'Failed to update order' });
  }
}

// DELETE (Remove order)
async function removeOrder(req, res) {
  try {
    const orderId = req.params.id;
    const removedId = await orderService.remove(orderId);
    res.send(removedId);
  } catch (err) {
    logger.error('Failed to remove order', err);
    res.status(500).send({ err: 'Failed to remove order' });
  }
}

module.exports = {
  getOrders,
  getOrderById,
  addOrder,
  updateOrder,
  removeOrder,
};
