// === Codes for all Pages ===
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !expanded);
});


// ===== Profile Page ====
import { loadProfile } from './profile.mjs';


document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.id;

    if (page === "profile-page") {
        loadProfile();
        menuToggle();
    }
});