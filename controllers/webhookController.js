const Order = require('../models/Order');

const mapaEstadosHyperzod = {
  1: "📦 Recibido en Tienda",
  2: "🚚 Enviado al SAT",
  3: "🛠️ En Reparación",
  4: "✅ Listo Para Recoger / 🛠️ Reparado / Entregado en Tienda",
  5: "📤 Entregado al Cliente",
  6: "Pedido Cancelado / Sin Reparación / Garantía"
};

exports.recibirWebhook = async (req, res) => {
  const payload = req.body.payload;

  const orden = {
    order_id: payload.order_id,
    order_uuid: payload.order_uuid,
    order_status: payload.order_status,
    status_cliente: mapaEstadosHyperzod[payload.order_status],
    cliente_nombre: payload.user.full_name,
    cliente_email: payload.user.email,
    cliente_movil: payload.user.mobile,
    created_at: payload.created_at,
    updated_at: payload.updated_at
  };

  await Order.findOneAndUpdate(
    { order_id: orden.order_id },
    orden,
    { upsert: true, new: true }
  );

  res.status(200).json({ success: true });
};
