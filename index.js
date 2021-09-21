document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector("form");
    const likesBtn = document.getElementById('likesBtn');
    const likesInput = document.getElementById('likesInput');

    const acceptBtn = document.getElementById("acceptBtn");
    const cancelBtn = document.getElementById("cancelBtn");

    likesBtn.addEventListener('click', () => {
        console.log(likesInput.value);
        if (!likesInput.value) return;

        addRow(likesInput.value);
        likesInput.value = "";
    });

    acceptBtn.addEventListener('click', () => {
        console.log(form);
        likesInput.name
        form.submit();
    });

    cancelBtn.addEventListener('click', () => {
        const activeBtn = document.querySelector(".btn__edit-likes.active");
        if (!activeBtn) {
            console.error("couldn't retrieve active btn.");
            return;
        }
        const id = parseInt(activeBtn.getAttribute("aria-controlledby"));
        toggleEditableRow(id, false)
    });
});

const addRow = (like) => {
    const container = document.getElementById("gridLikes");
    const id = genUniqueId();
    const newRow = document.createElement('div');
    const editBtn = document.createElement('button');

    editBtn.classList.add('btn__edit-likes');
    editBtn.innerText = "Editar"
    editBtn.setAttribute("aria-controlledby", id.toString());
    editBtn.addEventListener('click', (event) => {
        event.preventDefault();
        // there is already some other field being edited
        if (container.querySelector(".btn__edit-likes.active")) {
            alert("Solo se puede editar una línea. Recargue la página para poder editar otra.")
            return;
        } 

        toggleEditableRow(id, true, like)

    });

    newRow.classList.add('row');
    newRow.id = id;
    newRow.innerHTML = `
    <div class="col">
        <p>${like}</p>
    </div>
    <div class="col-3">
        <p>0</p>
    </div>
    <div class="col">
    </div>
    `
    newRow.children[2].appendChild(editBtn);

    container.appendChild(newRow);
}

// row_id is expected to be a Number, edit is boolean
const toggleEditableRow = (row_id, edit=true, likeValue="") => {
    const row = document.getElementById(row_id);
    const editBtn = row.querySelector('.btn__edit-likes');
    const saveChanges = document.getElementById("saveChangesContainer");
    if (edit === true) {
        row.children[0].innerHTML = `<input class="input__editable" type="text" name="gusto" value="${likeValue}" />`
        row.children[1].innerHTML = `<input class="input__editable" type="text" name="porc" value="0" />`;
        saveChanges.style.display = "block";

        editBtn.innerText = "En edición";
    } else {
        if (likeValue === "") {
            likeValue = row.querySelector('input[name="gusto"]').value
        }
        row.children[0].innerHTML = `<p>${likeValue}</p>`;
        row.children[1].innerHTML = `<p>0</p>`;

        saveChanges.style.display = "none";

        editBtn.innerText = "Editar";
    }
    editBtn.classList.toggle('active');

}

// this is not strictly unique, but it most cases it is.
const genUniqueId = () => {
    return Math.floor(Math.random() * Date.now())
}