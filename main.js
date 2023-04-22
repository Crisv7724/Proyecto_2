let tareas = [];
let editMode = false;
let editionId = null;

const addButton = document.getElementById("save");
addButton.addEventListener("click", function (event) {
  if (editMode === false) {
    create(event);
  } else {
    refresh(event);
  }
});

function create(event) {
  event.preventDefault();
  const tarea = readForm();
  const values = Object.values(tarea);
  const resultado = values.every((value) => value !== "");
  if (resultado === false) {
    Swal.fire("Ups!", "Falta completar campos.", "error");
  } else {
    createRow(tarea);
    tareas.push(tarea);
    clearForm();
    saveDataLS();
  }
}

function readForm() {
  const taskInput = document.getElementById("task");
  const descInput = document.getElementById("description");

  // Funcion para modificar print de fecha
  const fechaTiempo = document.getElementById("time");

  let fecha = new Date(fechaTiempo.value);

  if (fechaTiempo.value === "") {
    fecha = new Date();
  }
  const anio = fecha.getFullYear();
  const mes = fecha.getMonth() + 1;
  const dia = fecha.getDate();
  const hora = fecha.getHours();
  const minutos = fecha.getMinutes();
  const segundos = fecha.getSeconds();

  // Funcion agregar 0 a la fecha
  const agregarCeros = (numero) => {
    if (numero < 10) {
      return "0" + numero;
    } else {
      return numero;
    }
  };
  // Concatenar fecha final
  const fullFecha =
    agregarCeros(dia) +
    "/" +
    agregarCeros(mes) +
    "/" +
    anio +
    " " +
    agregarCeros(hora) +
    ":" +
    agregarCeros(minutos) +
    ":" +
    agregarCeros(segundos);

  const tarea = {
    time: fullFecha,
    task: taskInput.value,
    desc: descInput.value,
    id: Date.now(),
  };

  return tarea;
}

function createRow(tarea) {
  const tbody = document.getElementById("tbody");

  tbody.innerHTML += `
         <tr>
         <td>${tarea.time}</td>
            <td>${tarea.task}</td>
            <td>${tarea.desc}</td>
            <td class= "buttons">
                <button class="edit" onclick=editTask(${tarea.id})>Editar</button>
                <button class="delete" onclick=deleteTask(${tarea.id})>Eliminar</button>
            </td>
        </tr>
    `;
}

function clearForm() {
  const form = document.getElementById("form");
  form.reset();
}

function saveDataLS() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function readFromLS() {
  tareas = JSON.parse(localStorage.getItem("tareas"));
  tareas.forEach((el) => createRow(el));
}

function deleteTask(id) {
  Swal.fire({
    title: "Estas seguro?",
    text: "No podrás revertir los cambios",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#4caf50",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, borrar!",
  }).then((result) => {
    if (result.isConfirmed) {
      const index = tareas.findIndex((tarea) => tarea.id === id);
      tareas.splice(index, 1);
      saveDataLS();
      tbody.innerHTML = "";
      readFromLS();
      Swal.fire("Borrado!", "La tarea ha sido borrada.", "success");
    }
  });
}

function editTask(id) {
  editMode = true;
  addButton.innerText = "Actualizar";
  addButton.style.backgroundColor = '#edc30f'
  editionId = id;
  const tarea = tareas.find((tarea) => tarea.id === id);
  
  const taskInput = document.getElementById("task");
  const descInput = document.getElementById("description");
  const fullFecha = document.getElementById("time");
  
  taskInput.value = tarea.task;
  descInput.value = tarea.desc;
  fullFecha.value = tarea.time;
}

function refresh() {
  const valores = readForm();
  valores.id = editionId;

  const index = tareas.findIndex((tarea) => tarea.id === editionId);
  tareas.splice(index, 1, valores);
  saveDataLS();

  const row = document.getElementById(editionId);
  row.innerHTML = 
  `<td>${valores.time}</td>
   <td>${valores.task}</td>
   <td>${valores.desc}</td>
   <td class= "buttons">
    <button class="edit" onclick=editTask(${valores.id})>Editar</button>
    <button class="delete" onclick=deleteTask(${valores.id})>Eliminar</button>
   </td`;

   editMode = false;
   editionId = null;
   addButton.innerText = 'Guardar';
   clearForm();
}

readFromLS();