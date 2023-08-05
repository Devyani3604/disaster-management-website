function toggleMenu() {
    const nav = document.getElementById('menuitem');
    if (nav.style.width === '100%') {
        nav.style.width = '0';
    } else {
        nav.style.width = '100%';
    }
}