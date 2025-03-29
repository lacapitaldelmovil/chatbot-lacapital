const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  order_id: Number,
  order_uuid: String,
  order_status: Number,
  status_cliente: String,
  cliente_nombre: String,
  cliente_email: String,
  cliente_movil: String,
  created_at: Date,
  updated_at: Date
});

module.exports = mongoose.model('Order', OrderSchema);
