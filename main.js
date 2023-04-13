const addButton = document.getElementById("save");
addButton.addEventListener("click", create);
const tareas = [];

function create(event) {
  event.preventDefault();
  const tarea = readForm();
  createRow(tarea);
  clearForm();
  saveDataLS();
}

function readForm() {
  const taskInput = document.getElementById("task");
  const descInput = document.getElementById("description");

  const tarea = {
    task: taskInput.value,
    desc: descInput.value,
  };

  tareas.push(tarea);

  return tarea;
}

function createRow(tarea) {
  const tbody = document.getElementById("tbody");

  tbody.innerHTML += `
         <tr>
            <td>${tarea.task}</td>
            <td>${tarea.desc}</td>
            <td>
                <button class="edit">Editar</button>
                <button class="delete">Eliminar</button>
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
  const tareas = JSON.parse(localStorage.getItem("tareas"));
  tareas.forEach((el) => createRow(el));
}

readFromLS();
