// ===== Profile Page ====

import { loadProfile } from './profile.mjs';


document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.id;

    if (page === "profile-page") {
        loadProfile();
    }
});