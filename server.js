const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const { connection } = require('mongoose');

dotenv.config({ path: './.env' });
console.log(process.env);
const PORT = 3000;

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
 .connect(DB,{
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindModify: false
}).then(() =>console.log('DB connection successful'))

app.listen(PORT, () => {
  console.log(`app running on port${PORT}`);
});
