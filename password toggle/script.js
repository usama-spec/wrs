const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

// Toggle password visibility
togglePassword.addEventListener("click", () => {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    togglePassword.classList.toggle("fa-eye-slash");
});
