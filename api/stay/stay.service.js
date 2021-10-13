//backend service

const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');
const ObjectId = require('mongodb').ObjectId;

async function query(filterBy = {}) {
  // console.log('query in backend service');
  // console.log('filterby in backend service', filterBy);
  const criteria = _buildCriteria(filterBy);
  console.log('criteria in back service', criteria);
  try {
    // const criteria = {}

    const collection = await dbService.getCollection('stay');
    var stays = await collection.find(criteria).toArray();
    // console.log('stay in backend service', stays);
    return stays;
  } catch (err) {
    logger.error('cannot find stays', err);
    // console.error('cannot find stays', err)
    throw err;
  }
}

function _buildCriteria(filterBy) {
  console.log('build criteria');
  console.log('filterby in build criteria', filterBy);

  const criteria = {};

  // if (filterBy) {
  //     criteria.city = stays.filter(
  //       (stay) => stay.city.toLowerCase() === filterBy.toLowerCase()
  //     );
  // }
  if (filterBy.city) {
    const cityCriteria = { $regex: filterBy.city, $options: 'i' };
    criteria.city = cityCriteria;
    // criteria.city = filterBy.city
  }
  // if (filterBy.stayType) {
  //     console.log('filterBy.type in buildCriteria2', filterBy.stayType);
  //     criteria.stayType = filterBy.stayType
  //     console.log('criteria.stayType in buildCriteria2', criteria.stayType);
  // }
  // if (filterBy.type) {
  //     console.log('filterBy.type in buildCriteria2', filterBy.type);
  //     criteria.type = filterBy.type
  //     console.log('criteria.stayType in buildCriteria2', criteria.stayType);
  // }

  return criteria;
}

async function getById(stayId) {
  try {
    const collection = await dbService.getCollection('stay');
    const stay = collection.findOne({ _id: ObjectId(stayId) });
    return stay;
  } catch (err) {
    logger.error(`while finding stay ${stayId}`, err);
    throw err;
  }
}

async function remove(stayId) {
  try {
    const collection = await dbService.getCollection('stay');
    await collection.deleteOne({ _id: ObjectId(stayId) });
    return stayId;
  } catch (err) {
    logger.error(`cannot remove stay ${stayId}`, err);
    throw err;
  }
}

async function add(stay, user) {
  try {
    const collection = await dbService.getCollection('stay');
    await collection.insertOne(stay);
    // console.log('addedStay ', addedStay);
    return stay;
  } catch (err) {
    logger.error('cannot insert stay', err);
    throw err;
  }
}
async function update(stay) {
  console.log('update stayService in backend(5)----------');
  try {
    var id = ObjectId(stay._id);
    delete stay._id;
    const collection = await dbService.getCollection('stay');
    await collection.updateOne({ _id: id }, { $set: { ...stay } });
    return stay;
  } catch (err) {
    logger.error(`cannot update stay `, err);
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
