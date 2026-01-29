const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const passwordBtnToggles = document.getElementsByClassName('password-toggle');

// Toggle panels
signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});
for (const passwordBtnToggle of passwordBtnToggles) {
    passwordBtnToggle.addEventListener('click', () => {
        const inputPassword = passwordBtnToggle.previousElementSibling;
        if (inputPassword && inputPassword.tagName === 'INPUT') {
            if (inputPassword.type === 'password') {
                inputPassword.type = 'text';
                passwordBtnToggle.classList.remove('fa-eye');
                passwordBtnToggle.classList.add('fa-eye-slash');
            } else {
                passwordBtnToggle.classList.remove('fa-eye-slash');
                passwordBtnToggle.classList.add('fa-eye');
                inputPassword.type = 'password';
            }
        }
    });
}