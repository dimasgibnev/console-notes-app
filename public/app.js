document.addEventListener("click", async (event) => {
  const id = event.target.dataset.id;

  if (event.target.dataset.type === "remove") {
    deleteNote(id).then(() => {
      event.target.closest("li").remove();
    });
  } else if (event.target.dataset.type === "edit") {
    const title = prompt("Введите новое название");

    if (title) {
      editNote(id, title).then(() => {
        event.target.closest("li").firstChild.textContent = title;
      });
    }
  }
});

async function deleteNote(noteId) {
  await fetch(`/${noteId}`, {
    method: "DELETE",
  });
}

async function editNote(noteId, noteTitle) {
 return await fetch(`/${noteId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      id: noteId,
      title: noteTitle,
    }),
  });
}
