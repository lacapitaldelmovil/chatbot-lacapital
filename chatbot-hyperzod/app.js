const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ MongoDB conectado correctamente'))
  .catch((err) => console.error('❌ Error MongoDB:', err));

app.listen(process.env.PORT, () => {
  console.log(`🚀 Servidor funcionando en puerto ${process.env.PORT}`);
});
