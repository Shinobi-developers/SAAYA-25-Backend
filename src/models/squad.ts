import mongoose from 'mongoose';

const squadSchema = new mongoose.Schema(
  {
    CSE: {
      type: Number,
      default: 0,
    },
    CE_AD: {
      type: Number,
      default: 0,
    },
    EEE_ECE_ME: {
      type: Number,
      default: 0,
    },
    MCA_MTECH: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Squad = mongoose.model('Squad', squadSchema);

export default Squad;
