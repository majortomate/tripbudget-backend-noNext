const { getSingleDestination, updateDestination, deleteDestination } = require('./destination.service')
const {getSingleUser} = require('../user/user.service')
const {updateTrip} = require('../trip/trip.service')
const Destination = require('./destination.model')

const getAllDestinationHandler = async (req, res) =>{
  try {
    const destinations = await Destination.find({}).populate('trip');
    return res.status(200).json(destinations);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
}

const getSingleDestinationHandler = async (req, res) =>{
  const {params} = req;
  const destinationFound = await getSingleDestination(params.id);
  if (!destinationFound) return res.status(404).json({ failed: 'Couldnt find destination' });
  try {
    return res.status(200).json(destinationFound);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const createSingleDestinationHandler = async (req, res) =>{
  const {body} = req;
  const id = '6322387b7d615d2fa6309db0';

      const user = await getSingleUser(id);
      const { trips } = user;

      const sameTrip = trips.filter((trip) => String(trip.user) === String(user._id));
      if (!sameTrip) {
        return res.status(404).json({ failed: 'Trips dont match' });
      }
      try {
        const newDestination = new Destination(body);
        const savedDestination = await newDestination.save();

        const addToTrip = await updateTrip(sameTrip, {
          $push: { destinations: savedDestination._id },
        });
        return res.status(201).json(addToTrip);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
}

const updateSingeDestinationHandler = async (req, res) => {
  const {params, body} = req;
  const destinationToUpdate = await updateDestination(params.id);
  if (!destinationToUpdate) return res.status(404).json({ failed: 'Couldnt find destination' });
  try {
    const destinationUpdated = await updateDestination(destinationToUpdate, body);
    return res.status(200).json(destinationUpdated);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
const deleteSingleDestinationHandler = async (req, res) =>{
  const {params} = req;
  const destinationToDelete = await getSingleDestination(params.id);
  if (!destinationToDelete) return res.status(404).json({ failed: 'Couldnt find destination' });
  try {
    await deleteDestination(destinationToDelete);
    return res.status(204).json({ success: 'destination deleted succesfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports ={
  getAllDestinationHandler,
  getSingleDestinationHandler,
  createSingleDestinationHandler,
  updateSingeDestinationHandler,
  deleteSingleDestinationHandler
}
