const container = document.querySelector('#membersContainer');
const gridBtn = document.querySelector('#gridView');
const listBtn = document.querySelector('#listView');

// Fetch and display the business members
async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const members = await response.json();
        displayMembers(members);
    }
    catch (error) {
        console.error('Could not load members:', error);
    }
}

function displayMembers(members) {
    container.innerHTML = ''; // Clear existing content
    members.forEach(member => {
        const card = document.createElement('section');
        card.classList.add('member-card');

        card.innerHTML = `
            <h3 class="member-name"><strong>${member.name}</strong></h3>
            <p class="description">${member.description}</p>
            <div class="card-content">
                <img src="images/${member.image}" alt="${member.name} logo" width="100" height="100" loading="lazy">
                <div class="info">
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Website:</strong> ${member.website}</p>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

// Toggle Views
gridBtn.addEventListener('click', () => {
    container.classList.add('grid');
    container.classList.remove('list');
});

listBtn.addEventListener('click', () => {
    container.classList.add('list');
    container.classList.remove('grid');
});

// Load on page load
loadMembers();
