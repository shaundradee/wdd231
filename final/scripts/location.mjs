export async function loadLocations() {
    try {
        const response = await fetch('data/locations.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const locations = await response.json();
        buildFigureCard(locations);
    }
    catch (error) {
        console.error('Could not load members:', error);
    }
}

function buildFigureCard(locations) {

    locations.forEach(location => {
        const fig = document.createElement("figure");

        const img = document.createElement("img");
        img.src = location.img.src;
        img.alt = location.img.alt;
        img.loading = "lazy";

        const caption = document.createElement("figcaption");
        caption.textContent = location.figcaption;

        const address = document.createElement("p");
        address.textContent = location.address;

        fig.appendChild(img);
        fig.appendChild(caption);
        fig.appendChild(address);

        document.querySelector(".figs").appendChild(fig);
    });
}


