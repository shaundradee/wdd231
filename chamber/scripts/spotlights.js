const spotlightContainer = document.querySelector(".business-spotlights");


async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const members = await response.json();
        displaySpotlights(members);
    }
    catch (error) {
        console.error('Could not load members:', error);
    }
}



function displaySpotlights(members) {
  
    // Filter for Gold or Silver members only
    const qualified = members.filter(member =>
        [2, 3].includes(member.membership_lvl)
    );

    // Randomize and pick 3
    const selected = qualified.sort(() => 0.5 - Math.random()).slice(0, 3);

    // Clear placeholder
    spotlightContainer.innerHTML = "";

    selected.forEach(member => {
        const card = document.createElement('section');
        card.classList.add('member-card');
        card.classList.add('grid');


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

        spotlightContainer.appendChild(card);
    });
}

getMembers();
