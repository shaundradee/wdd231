// Elements
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const formModal = document.getElementById("formModal");
const userForm = document.getElementById("userForm");
const userTableBody = document.querySelector("#userTable tbody");

// Open modal
openModalBtn.addEventListener("click", () => {
    formModal.style.display = "block";
});

// Close modal
closeModalBtn.addEventListener("click", () => {
    formModal.style.display = "none";
    userForm.reset();
});

// Close modal if clicking outside the content
window.addEventListener("click", (e) => {
    if (e.target === formModal) {
        formModal.style.display = "none";
        userForm.reset();
    }
});

// Handle form submission
userForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = userForm.name.value.trim();
    const email = userForm.email.value.trim();

    if (name && email) {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `<td>${name}</td><td>${email}</td>`;
        userTableBody.appendChild(newRow);
    }

    // Close modal and reset form
    formModal.style.display = "none";
    userForm.reset();
});

