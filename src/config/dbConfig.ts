/* eslint-disable no-console */
import mongoose from 'mongoose';

const connectDb = async () => {
  const mongoURL: string | undefined = process.env.MONGO_URL;

  if (mongoURL) {
    await mongoose
      .connect(mongoURL)
      .then(() => console.log('Connected to database'))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((err: any) => console.error('Error connecting to database:', err));
  } else {
    console.error('DB URL not available');
  }
};

export default connectDb;
