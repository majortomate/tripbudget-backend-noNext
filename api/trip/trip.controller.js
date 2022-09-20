const { getSingleTrip, updateTrip, deleteTrip } = require('./trip.service')
const { getSingleUser, updateUser} = require('../user/user.service')
const Trip = require('./trip.model')

const getAllTripsHandler = async (req, res) =>{
  try {
    const trips = await Trip.find({});
    return res.status(200).json(trips);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
}
const createSingleTripHandler = async (req, res) =>{
  const {body} = req;
  const id = '6322387b7d615d2fa6309db0';

  const user = await getSingleUser(id);

  try {
    const newTrip = new Trip(body);
    const savedTrip = await newTrip.save();

    const addToUser = await updateUser(user, {
      $push: { trips: savedTrip._id },
    });
    return res.status(201).json(addToUser);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }

}

const getSingleTripHandler = async (req, res) => {
  const {params} = req;
  const tripFound = await getSingleTrip(params.id);
  if (!tripFound) return res.status(404).json({ failed: 'Couldnt find trip' });
  try {
    return res.status(200).json(tripFound);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const updateSingleTripHandler = async (req, res) =>{
  const {params, body} = req;
  const tripToUpdate = await getSingleTrip(params.id);
  if (!tripToUpdate) return res.status(404).json({ failed: 'Couldnt find trip' });
  try {
    const tripUpdated = await updateTrip(tripToUpdate, body);
    return res.status(200).json(tripUpdated);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const deleteSingleTripHandler = async (req, res) =>{
  const {params} = req;
  const tripToDelete = await getSingleTrip(params.id);
  if (!tripToDelete) return res.status(404).json({ failed: 'Couldnt find trip' });
  try {
    const tripDeleted = await deleteTrip(tripToDelete);
    return res.status(204).json(tripDeleted);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllTripsHandler,
  createSingleTripHandler,
  getSingleTripHandler,
  updateSingleTripHandler,
  deleteSingleTripHandler,
}
