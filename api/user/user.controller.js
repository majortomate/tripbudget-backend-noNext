const User = require('./user.model')

const getAllUsersHandler = async (req, res) => {
  try {
    const users = await User.find({}).populate({ path: 'trips',  populate: { path: 'destinations' } });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};
module.exports = getAllUsersHandler
