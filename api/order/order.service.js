//backend service

const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');
const ObjectId = require('mongodb').ObjectId;

async function query(filterBy) {
  try {
    const criteria = _buildCriteria(filterBy);

    const collection = await dbService.getCollection('order');
    var orders = await collection.find(criteria).toArray();
    console.log('order in backend service', orders);
    return orders;
  } catch (err) {
    logger.error('cannot find orders', err);
    // console.error('cannot find orders', err)
    throw err;
  }
}

function _buildCriteria({ userId, isHost }) {
  let criteria = {};

  if (isHost !== 'false') {
    criteria = { 'host._id': userId };
  } else {
    criteria = { 'user._id': userId };
  }
  console.log('***************',criteria);
  return criteria;
}

// function _buildCriteria(filterBy){//filter by function
//     console.log('build criteria');
//     const criteria ={}
//     console.log('criteria in back service build critiria', criteria);
//     if (filterBy.label==='all') {
//         criteria={}
//         }else if (filterBy.label) {
//             console.log('filterby label in backend service ',filterBy.label );
//             orders = orders.filter((order) => {
//                 return order.labels.includes(filterBy.label )
//             })
//             console.log('filter by label');
//         }

//     if (filterBy.title) {
//         criteria.title = orders.filter((order) => {
//             return order.title.includes(filterBy.title)
//         })
//         console.log('filter by title');
//     }
//     if (filterBy.stock) {
//         orders = orders.filter((order) => {
//             return order.inStock
//         })
//     }
//     if (filterBy.labels?.length) {
//         orders = orders.filter((order) => {
//             // return order.labels.includes(filterBy.labels.label)
//             return filterBy.labels.some(currLabel=>{
//                 return order.labels.includes(currLabel)
//             })
//         })
//     }
//     return criteria;
// }

async function getById(orderId) {
  try {
    const collection = await dbService.getCollection('order');
    const order = collection.findOne({ _id: ObjectId(orderId) });
    return order;
  } catch (err) {
    logger.error(`while finding order ${orderId}`, err);
    throw err;
  }
}

async function remove(orderId) {
  try {
    const collection = await dbService.getCollection('order');
    await collection.deleteOne({ _id: ObjectId(orderId) });
    return orderId;
  } catch (err) {
    logger.error(`cannot remove order ${orderId}`, err);
    throw err;
  }
}

async function add(order, user) {
  try {
    const collection = await dbService.getCollection('order');
    await collection.insertOne(order);
    // console.log('addedOrder ', addedOrder);
    return order;
  } catch (err) {
    logger.error('cannot insert order', err);
    throw err;
  }
}
async function update(order) {
  console.log('update orderService in backend(5)');
  try {
    var id = ObjectId(order._id);
    delete order._id;
    const collection = await dbService.getCollection('order');
    await collection.updateOne({ _id: id }, { $set: { ...order } });
    return order;
  } catch (err) {
    logger.error(`cannot update order ${orderId}`, err);
    throw err;
  }
}

module.exports = {
  remove,
  query,
  getById,
  add,
  update,
};
