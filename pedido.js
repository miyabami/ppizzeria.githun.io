// script.js

// Referencias a los elementos
const cantidadInput = document.getElementById("cantidad");
const pizzasDiv = document.getElementById("pizzas");
const complementosDiv = document.getElementById("complementos-selection");
const entregaSelect = document.getElementById("entrega");
const direccionDiv = document.getElementById("direccion");
const pagoSelect = document.getElementById("pago");
const efectivoDiv = document.getElementById("efectivo");
const tarjetaDiv = document.getElementById("tarjeta");

// Mostrar dirección solo si se selecciona "Domicilio"
entregaSelect.addEventListener("change", () => {
  direccionDiv.classList.toggle("oculto", entregaSelect.value !== "domicilio");
});

// Mostrar opciones de pago según la selección
pagoSelect.addEventListener("change", () => {
  efectivoDiv.classList.toggle("oculto", pagoSelect.value !== "efectivo");
  tarjetaDiv.classList.toggle("oculto", pagoSelect.value !== "tarjeta");
});

// Crear las opciones de sabor de pizza dinámicamente según la cantidad
cantidadInput.addEventListener("change", () => {
  const cantidad = parseInt(cantidadInput.value);
  pizzasDiv.innerHTML = '';  // Limpiar las pizzas previas

  for (let i = 0; i < cantidad; i++) {
    const select = document.createElement("select");
    select.name = `pizza${i}`;
    select.innerHTML = `
      <option value="Margarita" data-precio="8.00">Margarita</option>
      <option value="Pepperoni" data-precio="9.00">Pepperoni</option>
      <option value="CuatroQuesos" data-precio="9.50">Cuatro Quesos</option>
    `;
    pizzasDiv.appendChild(select);
  }
});

// Crear los complementos dinámicamente
const complementos = [
  { nombre: 'Extra Cheese', precio: 1.50 },
  { nombre: 'Pepperoni Extra', precio: 2.00 },
  { nombre: 'Champiñones', precio: 1.20 },
  { nombre: 'Jalapeños', precio: 1.00 },
];

complementos.forEach((complemento, index) => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.value = complemento.nombre;
  checkbox.dataset.precio = complemento.precio;
  checkbox.id = `complemento${index}`;
  
  const label = document.createElement("label");
  label.setAttribute("for", checkbox.id);
  label.textContent = `${complemento.nombre} - $${complemento.precio.toFixed(2)}`;
  
  complementosDiv.appendChild(checkbox);
  complementosDiv.appendChild(label);
  complementosDiv.appendChild(document.createElement("br"));
});

// Enviar el formulario de pedido
document.getElementById("formPedido").addEventListener("submit", function (e) {
  e.preventDefault();

  // Crear el objeto pedido
  const pedido = {
    fecha: document.getElementById("fecha").value,
    cantidad: parseInt(document.getElementById("cantidad").value),
    tipoPizza: [],
    precioPizza: 0,
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

  // Obtener los sabores de las pizzas
  document.querySelectorAll("select[name^='pizza']").forEach(select => {
    pedido.tipoPizza.push(select.value);
    pedido.precioPizza += parseFloat(select.selectedOptions[0].dataset.precio);
  });

  // Obtener los complementos seleccionados
  document.querySelectorAll("input[type=checkbox]:checked").forEach(el => {
    pedido.complementos.push(el.value);
    pedido.complementosPrecio += parseFloat(el.dataset.precio);
  });

  // Calcular el total
  const total = pedido.precioPizza * pedido.cantidad + pedido.complementosPrecio;
  pedido.total = total;

  // Si se paga en efectivo, calcular el cambio
  if (pedido.pago === 'efectivo') {
    const montoDado = parseFloat(pedido.efectivo);
    pedido.cambio = montoDado - total;
  }

  // Guardar el pedido en localStorage y redirigir a la página de pago
  localStorage.setItem("pedidoBellaItalia", JSON.stringify(pedido));
  window.location.href = "pago.html";
});

// Mostrar el ticket en la página de pago
document.addEventListener("DOMContentLoaded", function() {
  if (document.getElementById("ticket")) {
    const pedido = JSON.parse(localStorage.getItem("pedidoBellaItalia"));
    document.getElementById("ticket").innerHTML = `
      <p>Fecha: ${pedido.fecha}</p>
      <p>Cantidad de Pizzas: ${pedido.cantidad}</p>
      <p>Tipo de Pizza: ${pedido.tipoPizza.join(', ')}</p>
      <p>Complementos: ${pedido.complementos.join(', ')}</p>
      <p>Total: $${pedido.total.toFixed(2)}</p>
      ${pedido.pago === 'efectivo' ? `
          <p>Efectivo dado: $${pedido.efectivo}</p>
          <p>Cambio: $${pedido.cambio.toFixed(2)}</p>
      ` : ''}
    `;
  }
});