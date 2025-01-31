import mongoose from "mongoose";

const connectDb = async () => {
  const mongoURL: string | undefined = process.env.MONGO_URL_LOCAL;

  if (mongoURL) {
    await mongoose
      .connect(mongoURL)
      .then(() => console.log("Connected to database"))
      .catch((err: any) => console.error("Error connecting to database:", err));
  } else {
    console.error("DB URL not available");
  }
};

export default connectDb;
