const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });
console.log(process.env);
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`app running on port${PORT}`);
});
