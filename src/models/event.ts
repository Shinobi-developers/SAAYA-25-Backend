import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    squad: {
      type: String,
      required: true,
    },
    sem: {
      type: String,
      required: true,
    },
    point: {
      type: Number,
      required: true,
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
