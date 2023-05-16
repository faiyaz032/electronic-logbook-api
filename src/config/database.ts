import mongoose from 'mongoose';
import AppError from '../utils/AppError';
import log from '../utils/logger';
import prepareDbString from '../utils/prepareDbString';

/**
 * This function establish connection between the server and the mongodb database.
 */
const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(
      prepareDbString(
        process.env.DATABASE_USERNAME as string,
        process.env.DATABASE_PASSWORD as string
      )
    );
    log.info(`Database connected successfully`);
  } catch (error: any) {
    throw new AppError(error.statusCode, error.message);
  }
};

export default connectDatabase;
