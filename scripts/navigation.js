//Store the selected elements that we are going to use in a variable
const navbutton = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');

//Toggle the show class off and on
navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navBar.classList.toggle('show');
})
