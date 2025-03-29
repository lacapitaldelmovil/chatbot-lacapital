const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const OpenAI = require('openai');

const app = express();

// Configuración completa de CORS
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ MongoDB conectado correctamente'))
  .catch((err) => console.error('❌ Error MongoDB:', err));

const Order = require('./models/Order');
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

app.use('/webhook', require('./routes/webhookRoutes'));

app.post('/chat', async (req, res) => {
  const { pregunta } = req.body;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [{ role: 'user', content: pregunta }],
  });

  const respuestaGPT = completion.choices[0].message.content;

  const matchPedido = pregunta.match(/\d{4,}/);
  if (matchPedido) {
    const pedido = await Order.findOne({ order_id: matchPedido[0] });
    if (pedido) {
      return res.json({ mensaje: `Pedido #${pedido.order_id}: ${pedido.status_cliente}` });
    } else {
      return res.json({ mensaje: 'No encontré ese pedido, por favor verifica el número.' });
    }
  }

  res.json({ mensaje: respuestaGPT });
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Servidor funcionando en puerto ${process.env.PORT}`);
});
