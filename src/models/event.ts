import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    squad: {
      type: String,
      enum: ['CSE', 'CE_AD', 'EEE_ECE_ME', 'MCA_MTECH', ''],
    },
    sem: {
      type: String,
      enum: ['S2', 'S4', 'S6', 'S8', ''],
    },
    point: {
      type: Number,
    },
  },
  { _id: false },
);

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
      enum: ['ON_STAGE', 'OFF_STAGE', 'PRE_STAGE'],
    },
    first: participantSchema,
    second: participantSchema,
    third: participantSchema,
  },
  {
    timestamps: true,
  },
);

const Event = mongoose.model('Event', eventSchema);

export default Event;
