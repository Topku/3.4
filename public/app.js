document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
});

document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    const note = event.target.dataset.note;
    let newValue = prompt("Введите новое название", note);
    currentElement = document.getElementsByName(id);
    currentElement[0].textContent = newValue;
    edit(id, newValue).then(() => {
      currentElement = document.getElementsByName(id);
      currentElement[0].textContent = newValue;
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, newValue) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newValue, id: id }),
  });
}
