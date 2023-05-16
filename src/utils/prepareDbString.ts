/**
 *This function takes username and password and creates a database connection string for mongodb
 * @param username
 * @param password
 * @returns database connection string
 */
const prepareDbString = (username: string, password: string): string => {
  return `mongodb+srv://${username}:${password}@cluster0.fi3mc2d.mongodb.net/?retryWrites=true&w=majority`;
};

export default prepareDbString;
