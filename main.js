const addButton = document.getElementById("save");
addButton.addEventListener("click", create);
let tareas = [];

function create(event) {
  event.preventDefault();
  const tarea = readForm();
  createRow(tarea);
  tareas.push(tarea);
  clearForm();
  saveDataLS();
}

function readForm() {
  const taskInput = document.getElementById("task");
  const descInput = document.getElementById("description");

  const fechaTiempo = document.getElementById("time");

  let fecha = new Date(fechaTiempo.value);

 if(fechaTiempo.value === ""){
    fecha = new Date()
}
  const anio = fecha.getFullYear();
  const mes = fecha.getMonth() + 1;
  const dia = fecha.getDate();
  const hora = fecha.getHours();
  const minutos = fecha.getMinutes();
  const segundos = fecha.getSeconds();

  const agregarCeros = (numero) => {
    if (numero < 10) {
      return "0" + numero;
    } else {
      return numero;
    }
  }; 

  const fullFecha =  agregarCeros(dia) + "/" + agregarCeros(mes) + "/" + anio + " " + agregarCeros(hora) +":" + agregarCeros(minutos) +":"+ agregarCeros(segundos);
 

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
    confirmButtonColor: "#3085d6",
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

readFromLS();

