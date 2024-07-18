document.addEventListener("click", async (event) => {
  const id = event.target.dataset.id;

  if (event.target.dataset.type === "remove") {
    deleteNote(id).then(() => {
      event.target.closest("li").remove();
    });
  } else if (event.target.dataset.type === "edit") {
    const note = event.target.closest("li");
    const intialHTML = note.innerHTML;
    const id = event.target.dataset.id;
    const title = note.firstChild.textContent.trim();

    const updateFormHTML = `
      <input type="text" value="${title}"/>
      <div class="d-flex gap-2">
            <button
              class="btn btn-success mr-2"
              data-type="save"
            >
              Cохранить
            </button>
            <button
              class="btn btn-danger"
              data-type="cancel"
            >
              Отмена
            </button>
          </div>
      `;

    note.innerHTML = updateFormHTML;

    function updateFormListner({target}) {
      if (target.dataset.type === "save") {
        const title = note.querySelector("input").value;

        editNote(id, title).then(() => {
          note.innerHTML = intialHTML;
          note.firstChild.textContent = title;
          note.removeEventListener("click", updateFormListner);
        });
      } else if (target.dataset.type === "cancel") {
        note.innerHTML = intialHTML;
        note.removeEventListener("click", updateFormListner);
      }
    }

    note.addEventListener("click", updateFormListner);
  }
});

async function deleteNote(noteId) {
  await fetch(`/${noteId}`, {
    method: "DELETE",
  });
}

async function editNote(noteId, noteTitle) {
  await fetch(`/${noteId}`, {
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
