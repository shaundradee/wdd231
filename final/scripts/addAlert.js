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

// form submission
alertForm.addEventListener("submit", function (e) {
    e.preventDefault(); 


    // Get values from form fields
    const alertType = alertForm.alertType.value;
    const description = alertForm.description.value.trim();
    const priority = alertForm.priority.value;
    const location = alertForm.location.value;
    const status = alertForm.status.value;
    const date = new Date().toLocaleDateString();

    // Create new table row
    const newRow = document.createElement("tr");

    const imgRef = getAlertImage(priority);

    // const img = document.createElement("img");
    // img.src = imgRef;
    // img.alt = `${priority} image`;
    // img.width = 80;
    // img.height = 80;
    // img.loading = 'lazy';


    newRow.innerHTML = `
      <td><img src="${imgRef}" alt="priority level" width = 50></td>
      <td>${alertType}</td>
      <td>${description}</td>
      <td>${location}</td>
      <td>${status}</td>
      <td>${date}</td>
      <td><button class="deleteBtn">✔️ Done</button></td>
    `;

    // Append to table
    alertTableBody.appendChild(newRow);

    formModal.style.display = "none";
    alertForm.reset();

});

function getAlertImage(level) {
    if (level === "highPriority") {
      return "images/alertHigh.svg";
    }
    if (level === "medPriority") {
      return "images/alertMed.svg";
    }
    else {
      return "images/alertLow.svg"
    }
}

// Removes table row when clicked completed 
const alertTable = document.getElementById("alertTable");

alertTable.addEventListener("click", function (e) {
  // Check if a delete button was clicked
  if (e.target.classList.contains("deleteBtn")) {
    // Find the row that contains the button
    const row = e.target.closest("tr");
    if (row) {
      row.remove(); // Remove the row
    }
  }
});

