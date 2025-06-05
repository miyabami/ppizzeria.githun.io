const entregaSelect = document.getElementById("entrega");
const direccionDiv = document.getElementById("direccion");
const pagoSelect = document.getElementById("pago");
const efectivoDiv = document.getElementById("efectivo");
const tarjetaDiv = document.getElementById("tarjeta");

entregaSelect.addEventListener("change", () => {
  direccionDiv.classList.toggle("oculto", entregaSelect.value !== "domicilio");
});

pagoSelect.addEventListener("change", () => {
  efectivoDiv.classList.toggle("oculto", pagoSelect.value !== "efectivo");
  tarjetaDiv.classList.toggle("oculto", pagoSelect.value !== "tarjeta");
});

document.getElementById("formPedido").addEventListener("submit", function (e) {
  e.preventDefault();

  const pedido = {
    fecha: document.getElementById("fecha").value,
    cantidad: parseInt(document.getElementById("cantidad").value),
    tipoPizza: document.getElementById("tipoPizza").value,
    precioPizza: parseFloat(document.getElementById("tipoPizza").selectedOptions[0].dataset.precio),
    complementos: [],
    complementosPrecio: 0,
    entrega: entregaSelect.value,
    direccion: {
      calle: document.getElementById("calle").value,
      numero: document.getElementById("numero").value,
      colonia: document.getElementById("colonia").value,
      ciudad: document.getElementById("ciudad").value
    },
    pago: pagoSelect.value,
    efectivo: document.getElementById("montoEfectivo").value,
    tarjeta: {
      numero: document.getElementById("numeroTarjeta").value,
      titular: document.getElementById("titular").value,
      vencimiento: document.getElementById("vencimiento").value,
      cvv: document.getElementById("cvv").value
    }
  };

  document.querySelectorAll("fieldset input[type=checkbox]:checked").forEach(el => {
    pedido.complementos.push(el.value);
    pedido.complementosPrecio += parseFloat(el.dataset.precio);
  });

  localStorage.setItem("pedidoBellaItalia", JSON.stringify(pedido));
  window.location.href = "ticket.html";
});
