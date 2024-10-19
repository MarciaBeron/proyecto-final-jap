const darkForm = document.getElementsByClassName("form-container")[0];
const darkHeader = document.getElementsByClassName("jumbotron.text-center");
const toggle = document.getElementById("switch");
const isDarkMode = localStorage.getItem('darkMode') === 'true';

window.addEventListener('DOMContentLoaded', () => {
    if (isDarkMode) {
        document.body.classList.add('dark');
        darkForm.classList.add('dark');
        toggle.checked = true;
    }
})

toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    darkForm.classList.toggle('dark');
    localStorage.setItem('darkMode', document.body.classList.contains('dark'));
});

