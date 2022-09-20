const { Schema, model } =  require('mongoose')

const TripSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tripName: {
      type: String,
      required: true,
      trim: true,
    },
    tripDateFrom: {
      type: Date,
      required: true,
    },
    tripDateTo: {
      type: Date,
      required: true,
    },
    groupSize: [
      {
        type: String,
      },
    ],
    isPublic: {
      type: Boolean,
      default: true,
    },
    destinations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Destination',
        require: true,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
const Trip = model('Trip', TripSchema)
module.exports = Trip

