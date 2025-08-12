// === Codes for all Pages ===
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !expanded);
});

document.addEventListener("DOMContentLoaded", function () {
    const currentYear = new Date().getFullYear();
    document.getElementById("currentyear").textContent = currentYear;

    const lastModified = document.lastModified;
    document.getElementById("lastModified").textContent = `Last Modified: ${lastModified}`;
});


// ===== Profile Page ====
import { loadProfile } from './profile.mjs';

// === Home Page ===
import { loadLocations } from './location.mjs';
import { getWeather } from './weather.mjs';

document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.id;

    if (page === "home-page") {
        loadLocations();
        loadProfile();
        getWeather();
    }
});