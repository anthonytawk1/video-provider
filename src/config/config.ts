export default () => ({
  database: {
    connectionString: process.env.DB_CONNECTION_STRING,
  },

  port: process.env.PORT,
});
