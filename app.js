const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

document.getElementById("button").addEventListener("click", function addTask() {
  if (inputBox.value === "") {
    alert("You must write something");
  } else {
    let task = {
      text: inputBox.value,
      checked: false,
    };

    addTaskToDOM(task);
    saveData();
  }
  inputBox.value = "";
});

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      updateTaskStatus(e.target);
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function addTaskToDOM(task) {
  let li = document.createElement("li");
  li.textContent = task.text;
  if (task.checked) {
    li.classList.add("checked");
  }
  let span = document.createElement("span");
  span.textContent = "\u00D7";
  li.appendChild(span);
  listContainer.appendChild(li);
}

function updateTaskStatus(li) {
  const tasks = getTasksFromStorage();
  const taskIndex = Array.from(listContainer.children).indexOf(li);
  tasks[taskIndex].checked = li.classList.contains("checked");
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function saveData() {
  const tasks = [];
  listContainer.querySelectorAll("li").forEach((li) => {
    tasks.push({
      text: li.firstChild.textContent,
      checked: li.classList.contains("checked"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem("tasks") || "[]");
}

function showTask() {
  const tasks = getTasksFromStorage();
  tasks.forEach((task) => {
    addTaskToDOM(task);
  });
}

showTask();
