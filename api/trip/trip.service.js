const Trip = require('./trip.model')

const getSingleTrip = (id) => Trip.findById(id).populate('destinations');

const findOneTrip = (query) => Trip.findOne(query);

const updateTrip = (id, user) => Trip.findByIdAndUpdate(id, user, { new: true });

const deleteTrip = (id) => Trip.findByIdAndRemove(id);

module.exports={
  getSingleTrip,
  findOneTrip,
  updateTrip,
  deleteTrip
}
