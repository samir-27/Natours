const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './.env' });

const PORT = 3000;

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// Connect to MongoDB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful'));

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A Tour Must Have a Name'],
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  Price: {
    type: Number,
    require: [true, 'A Tour Must Have a Price']
  }
});

const Tour = mongoose.model('Tour', tourSchema);

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`); // Added space after 'port'
});
