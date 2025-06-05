
const pedido = JSON.parse(localStorage.getItem("pedidoBellaItalia"));

if (!pedido) {
  document.getElementById("ticket").innerHTML = "<p>No hay datos disponibles.</p>";
} else {
  const totalPizza = pedido.cantidad * pedido.precioPizza;
  const total = totalPizza + pedido.complementosPrecio;

  const ticketHTML = `
    <h2>🍕 Pizzería Bella Italia</h2>
    <p><strong>Fecha:</strong> ${pedido.fecha}</p>
    <p><strong>Tipo de pizza:</strong> ${pedido.tipoPizza} x ${pedido.cantidad} = $${totalPizza}</p>
    <p><strong>Complementos:</strong> ${pedido.complementos.join(", ") || "Ninguno"} ($${pedido.complementosPrecio})</p>
    <p><strong>Entrega:</strong> ${pedido.entrega}</p>
    ${pedido.entrega === "domicilio" ? `
      <p><strong>Dirección:</strong> ${pedido.direccion.calle} #${pedido.direccion.numero}, ${pedido.direccion.colonia}, ${pedido.direccion.ciudad}</p>
    ` : ""}
    <p><strong>Pago:</strong> ${pedido.pago}</p>
    ${pedido.pago === "efectivo" ? `<p><strong>Monto entregado:</strong> $${pedido.efectivo}</p>` : ""}
    ${pedido.pago === "tarjeta" ? `
      <p><strong>Tarjeta:</strong> **** **** **** ${pedido.tarjeta.numero.slice(-4)}<br>
      Titular: ${pedido.tarjeta.titular}</p>
    ` : ""}
    <hr>
    <h3>Total: $${total}</h3>
  `;

  document.getElementById("ticket").innerHTML = ticketHTML;
}