// scripts/discover.js
async function loadDiscoveryCards() {
    const main = document.querySelector('main');
    const container = document.createElement('div');
    container.classList.add('discovery-grid');
    main.appendChild(container);

    try {
        const response = await fetch('data/discover.json');
        if (!response.ok) throw new Error('Failed to fetch data');

        const items = await response.json();

        items.forEach(item => {
            const card = document.createElement('section');
            card.classList.add('discovery-card');

            // Title
            const h2 = document.createElement('h2');
            h2.textContent = item.name;
            card.appendChild(h2);

            // Figure with image
            const figure = document.createElement('figure');
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = `${item.name} image`;
            img.loading = 'lazy';
            figure.appendChild(img);
            card.appendChild(figure);

            // Address
            const addr = document.createElement('address');
            addr.textContent = item.address;
            card.appendChild(addr);

            // Description
            const p = document.createElement('p');
            p.textContent = item.description;
            card.appendChild(p);

            // Button
            const btn = document.createElement('button');
            btn.textContent = 'Learn More';
            btn.classList.add('learn-more');
            card.appendChild(btn);

            container.appendChild(card);
        });
    } catch (err) {
        console.error('Discovery data failed to load:', err);
        main.innerHTML = `<p class="error">We're sorry, but we couldn't load the discovery items at this time.</p>`;
    }
}

document.addEventListener('DOMContentLoaded', loadDiscoveryCards);
