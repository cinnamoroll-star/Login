//Login
function ingresar(){
	const contenedor = document.getElementById('contenedorConceptos');
    contenedor.innerHTML = ''; 
    const cantidad = parseInt(document.getElementById('ref').value);

	var datos = "";
	var usuario = document.getElementById("usuario").value;
	var password = document.getElementById("clave").value;

	datos=datos+'Usuario: '+usuario +'<br>'+'Contraseña: '+password+'<br>';
	document.getElementById("mensaje").innerHTML=datos;
	
  for (let i = 0; i < cantidad; i++) {
    agregarConcepto(contenedor);
  }

  let btnAgregar = document.getElementById('btnAgregar');
  if (!btnAgregar) {
    btnAgregar = document.createElement('button');
    btnAgregar.textContent = 'Agregar concepto';
    btnAgregar.id = 'btnAgregar';
    btnAgregar.className = 'btn btn-primary mt-3';
    btnAgregar.addEventListener('click', () => {
      agregarConcepto(contenedor);
      mostrarBotonAgregar();
    });
    contenedor.parentNode.appendChild(btnAgregar);
  }
  mostrarBotonAgregar();
  calcularTotales();
}


function agregarConcepto(contenedor) {
  const div = document.createElement('div');
  div.className = 'concepto mt-2 p-2 border rounded';
  div.innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-1 g-lg-4">
    <div class="col">
    <button type="button" class="btn btn-danger btn-sm eliminar">X</button>
    <label class="ms-2">Cantidad:</label>
    <input type="number" value="1" class="cantidad form-control d-inline-block">
    </div>
    <div class="col">
    <label class="ms-2">Descripción:</label>
    <input type="text" placeholder="Descripción" class="descripcion form-control d-inline-block">
    </div>
    <div class="col">
    <label class="ms-2">Valor Unitario:</label>
    <input type="number" value="0" class="valorUnitario form-control d-inline-block">
    </div>
    <div class="col">
    <label class="ms-2">Importe:</label>
    <input type="number" value="0" class="importe form-control d-inline-block" readonly>
    </div>
  `;

  contenedor.appendChild(div);

  const btnEliminar = div.querySelector('.eliminar');
  btnEliminar.addEventListener('click', () => {
    div.remove();
    mostrarBotonAgregar();
    calcularTotales();
  });

  const cantidadInput = div.querySelector('.cantidad');
  const valorInput = div.querySelector('.valorUnitario');
  const importeInput = div.querySelector('.importe');

  cantidadInput.addEventListener('input', () => {
    importeInput.value = cantidadInput.value * valorInput.value;
    calcularTotales();
  });

  valorInput.addEventListener('input', () => {
    importeInput.value = cantidadInput.value * valorInput.value;
    calcularTotales();
  });
}

function mostrarBotonAgregar() {
  const contenedor = document.getElementById('contenedorConceptos');
  const btnAgregar = document.getElementById('btnAgregar');
  if (!btnAgregar) return;

  if (contenedor.children.length === 0) {
    btnAgregar.style.display = 'none';
  } else {
    btnAgregar.style.display = 'block';
  }
}

// Función para calcular subtotal, IVA y total
function calcularTotales() {
  const conceptos = document.querySelectorAll('.concepto');
  let subtotal = 0;

  conceptos.forEach(concepto => {
    const cantidadInput = concepto.querySelector('.cantidad');
    const valorInput = concepto.querySelector('.valorUnitario');
    const cantidad = parseFloat(cantidadInput.value) || 0;
    const valor = parseFloat(valorInput.value) || 0;

    const importe = cantidad * valor;
    concepto.querySelector('.importe').value = importe.toFixed(2);

    subtotal += importe;
  });

  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  document.getElementById('subtotalDisplay').value = subtotal.toFixed(2);
  document.getElementById('ivaDisplay').value = iva.toFixed(2);
  document.getElementById('totalDisplay').value = total.toFixed(2);
}

// Agregar eventos para recalcular totales
function agregarEventosTotales() {
  const conceptos = document.querySelectorAll('.concepto');
  conceptos.forEach(concepto => {
    const cantidadInput = concepto.querySelector('.cantidad');
    const valorInput = concepto.querySelector('.valorUnitario');
    cantidadInput.addEventListener('input', calcularTotales);
    valorInput.addEventListener('input', calcularTotales);
  });
}
document.addEventListener('DOMContentLoaded', calcularTotales);
