const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  clientName: String,
  workDoneBy: String,
  workItems: [
    {
      workType: String,
      price: Number
    }
  ],
  paymentMode: String,
  note: String
}, {
  timestamps: true  // adds createdAt and updatedAt fields
});


const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
