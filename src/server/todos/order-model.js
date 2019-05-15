const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
  order: [String]
});

module.exports = mongoose.model('OrderModel', OrderSchema);
