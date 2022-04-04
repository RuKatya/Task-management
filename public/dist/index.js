var loginWindow = document.querySelector('#login');
var regWindow = document.querySelector('#registration');
function hendleShowLog() {
    loginWindow.style.display = "block";
    regWindow.style.display = "none";
}
function hendleShowReg() {
    loginWindow.style.display = "none";
    regWindow.style.display = "block";
}
