const jwt = require('jsonwebtoken')
const User = require('../../user/user.model')


const verify = async (token) => {
  const response = await fetch(`${process.env.REACT_APP_BACK_PROD_BASE_URL}/api/auth/verify-account/${token}`);
  return response.json();
}

const signToken = (payload) => {
  const token = jwt.sign(
    payload,
    process.env.TOKEN,
    { expiresIn: '1h' },
  );
  return token;
};

const verifyToken = async (token) => {
  try {
    const payload = await jwt.verify(token, process.env.TOKEN);
    return payload;
  } catch (error) {
    return null;
  }
};

const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers?.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token' });
  }

  const token = authHeader.split(' ')[1];

  // validate token
  const decoded = await verifyToken(token);
  console.log(decoded)

  if (!decoded) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // add user to request
  const { email } = decoded;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  req.user = user;

  next()
  return true;
};

module.exports = {
  verify,
  signToken,
  verifyToken,
  isAuthenticated
}
