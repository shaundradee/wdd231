document.addEventListener("DOMContentLoaded", () => {
    updateTable();
});

// Elements
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const formModal = document.getElementById("formModal");
const alertForm = document.getElementById("alertForm");
const alertTableBody = document.querySelector("#alertTable tbody");


// Open modal
openModalBtn.addEventListener("click", () => {
    formModal.style.display = "block";
});

// Close modal
closeModalBtn.addEventListener("click", () => {
    formModal.style.display = "none";
    alertForm.reset();
});

// Array to store work order entries
let data = JSON.parse(localStorage.getItem("formData")) || [];

// form submission
alertForm.addEventListener("submit", function (e) {
    e.preventDefault(); 

    // Get values from form fields
    const alertType = alertForm.alertType.value;
    const description = alertForm.description.value.trim();
    const location = alertForm.location.value;
    const status = alertForm.status.value;
    const date = new Date().toLocaleDateString();

    //send to array
    data.push({alertType, description, location, status, date });
    localStorage.setItem("formData", JSON.stringify(data));
    updateTable();

    formModal.style.display = "none";
    alertForm.reset();
});

// Refresh table
function updateTable() {
    alertTableBody.innerHTML = '';
    // table rows
    data.forEach(entry => {
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td data-label="Type">${entry.alertType}</td>
            <td data-label="Desc.">${entry.description}</td>
            <td data-label="Loc.">${entry.location}</td>
            <td data-label="Status">${entry.status}</td>
            <td data-label="Entry Date">${entry.date}</td>
            <td data-label="Complete"><button class="deleteBtn">✔️ Done</button></td>
        `;

        // Append to table
        alertTableBody.appendChild(newRow);
    });
}

// Removes table row when clicked completed 
alertTable.addEventListener("click", function (e) {
    if (e.target.classList.contains("deleteBtn")) {
        // Find the row that contains the button
        const row = e.target.closest("tr");
        if (row) {
            const rowIndex = Array.from(alertTableBody.children).indexOf(row);
            data.splice(rowIndex, 1);

            // Update local storage
            localStorage.setItem("formData", JSON.stringify(data));
            
            row.remove(); // Remove the row
        }
    }
});
