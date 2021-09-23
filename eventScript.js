function frontendValidator() {
    const dateInput = document.getElementById('dateinput');
    const dateError = document.getElementById('dateerror');
    const addButton = document.getElementById('addbutton');
    const dateValue = dateInput.value;
    const dueAt = new Date(dateValue) || Date.now();
    if (!dueAt || (dueAt < Date.now())) {
        dateError.style.display = "inline-block";
        addButton.style.display = "none";
    } else {
        dateError.style.display = "none";
        addButton.style.display = "inline-block";

    }
}

function editFrontendValidator() {
    const dateInput = document.getElementById('editdateinput');
    const dateError = document.getElementById('editdateerror');
    const saveButton = document.getElementById('savebutton');
    const dateValue = dateInput.value;
    const dueAt = new Date(dateValue) || Date.now();
    if (!dueAt || (dueAt < Date.now())) {
        dateError.style.display = "inline-block";
        saveButton.style.display = "none";
    } else {
        dateError.style.display = "none";
        saveButton.style.display = "inline-block";

    }
}