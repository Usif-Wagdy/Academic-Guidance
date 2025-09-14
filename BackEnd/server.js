const dotenv = require('dotenv');
const connectDB = require('./Config/dbConfig');
const app = require('./App');

dotenv.config({ path: './.env' });

// Connect DB
connectDB();

// If running locally, start the server normally
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(
      `App running locally at http://localhost:${port}`,
    );
  });
}

// For Vercel: export the app (no app.listen here)
module.exports = app;
