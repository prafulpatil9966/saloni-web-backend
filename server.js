const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const clientRoutes = require('./routes/clients');

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.use('/api/clients', clientRoutes);

app.get("/", (req, res) => {
  res.send('the db is connected')
})

app.listen(port, () => {
  console.log('Server started on port 5000');
});
