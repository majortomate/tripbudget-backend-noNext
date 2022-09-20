const Destination = require('./destination.model')


const getSingleDestination = (id) => Destination.findById(id).populate('trip');

const findOneDestination = (query) => Destination.findOne(query);

const updateDestination = (id, user) => Destination.findByIdAndUpdate(id, user, { new: true });

const deleteDestination = (id) => Destination.findByIdAndRemove(id);

module.exports={
  getSingleDestination,
  findOneDestination,
  updateDestination,
  deleteDestination
}
