const menuButton = document.querySelector('#menu-button');
const wrapper = document.querySelector('#wrapper');

const triggerClass = 'active';
let navigationState = false;

menuButton.addEventListener('click', () => {
    console.log("text");
    if (navigationState) {
        closeMenu()
    } else {
        openMenu()
    }

})

const openMenu = () => { 
    navigationState = true;
    wrapper.classList.add(triggerClass);
}

const closeMenu = () => {
    navigationState = false;
    wrapper.classList.remove(triggerClass);
}