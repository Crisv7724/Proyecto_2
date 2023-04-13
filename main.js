const addButton = document.getElementById("save");
addButton.addEventListener("click", create);
let tareas = [];

function create(event) {
  event.preventDefault();
  const tarea = readForm();
  createRow(tarea);
  tareas.push(tarea)
  clearForm();
  saveDataLS();
  ;
}

function readForm() {
  const taskInput = document.getElementById("task");
  const descInput = document.getElementById("description");

  const tarea = {
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
            <td>${tarea.task}</td>
            <td>${tarea.desc}</td>
            <td>
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
  const index = tareas.findIndex((tarea) => tarea.id == id);
  tareas.splice(index, 1);
  saveDataLS();
  tbody.innerHTML= ""
  readFromLS();

}
readFromLS()

-