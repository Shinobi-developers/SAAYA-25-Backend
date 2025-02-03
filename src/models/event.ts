import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Event', eventSchema);
