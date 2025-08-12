export async function loadProfile() {
    try {
        const response = await fetch('data/profile.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const user = await response.json();
        buildWelcome(user);
    }
    catch (error) {
        console.error('Could not load members:', error);
    }
}

function buildWelcome(user) {

    const emp = user.preferredName;
    const message = document.createElement('p');
    message.textContent = `Welcome ${emp}! Let's make today great!`

    document.querySelector('.employee').appendChild(message);
}


// function buildProfile(user) {
//     const profSect = document.getElementById('profile');

//     const img = document.createElement("img");
//     img.src = user.image;
//     img.alt = `${user.preferredName} profile image`;
//     img.loading = 'lazy';

//     const persInfo = document.createElement("h2");
//     persInfo.textContent = "Personal Information";

//     const userName = document.createElement("p");
//     userName.textContent = `Name: ${user.lname}, ${user.fname}`;

//     const preferred = document.createElement("p");
//     preferred.textContent = `Preferred: ${user.preferredName}`;

//     const phone = document.createElement("p");
//     phone.textContent = `Tel: ${user.phone}`;

//     const email = document.createElement("p");
//     email.textContent = `Email: ${user.email}`;

//     profSect.appendChild(img);
//     profSect.appendChild(persInfo);
//     profSect.appendChild(userName);
//     profSect.appendChild(preferred);
//     profSect.appendChild(phone);
//     profSect.appendChild(email);
// }