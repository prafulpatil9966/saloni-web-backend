const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  workDoneBy: { type: String, required: true },
  workItems: [
    {
      workType: { type: String, required: true },
      price: { type: Number, required: true }
    }
  ],
  paymentMode: { type: String, required: true },
  note: { type: String }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
