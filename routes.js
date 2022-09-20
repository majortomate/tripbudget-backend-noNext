/* Main application routes */
const auth = require('./api/auth/local/index')
const user = require('./api/user/index')
const trip = require('./api/trip/index')
const destination = require('./api/destination/index')

const routes = function (app){
  app.use('/api/user', user)
  app.use('/api/trip', trip);
  app.use('/api/destination', destination);
  app.use('/api/auth/local', auth);
};
module.exports = routes;

