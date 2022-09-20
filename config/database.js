const mongoose = require('mongoose')

const connectDb = async () => {
  const URI = process.env.MONGODB_URI_DEV;
  try {
    await mongoose.connect(URI);

    console.log('Connected to MongoDB!!');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

module.exports= connectDb
