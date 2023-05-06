let humbergerIsOpen = false;
function openHumberger() {
    let humbergerNavContainer = document.getElementById("humberger-nav-container")
    if(!humbergerIsOpen) {
        humbergerNavContainer.style.display = "block";
        humbergerIsOpen = true;
    } else {
        humbergerNavContainer.style.display = "none";
        humbergerIsOpen = false;
    }
}
