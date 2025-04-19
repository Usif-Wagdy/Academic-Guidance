const dotenv = require('dotenv');
const connectDB = require('./Config/dbConfig');

dotenv.config({ path: './config.env' });

const app = require('./App');

connectDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
