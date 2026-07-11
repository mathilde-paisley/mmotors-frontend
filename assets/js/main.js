console.log("M-Motors Front-End initialisé");

const loginForm = document.getElementById("login-form");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginMessage = document.getElementById("login-message");
const clientArea = document.getElementById("client-area");
const clientAreaMessage = document.getElementById("client-area-message");

if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        loginMessage.textContent = "";
        loginMessage.className = "login-message";
        clientArea.classList.add("hidden");

        const email = loginEmail.value.trim();
        const password = loginPassword.value;

        try {
            const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Connexion refusée.");
            }

            loginMessage.textContent = data.message;
            loginMessage.classList.add("success");

            clientAreaMessage.textContent = `Bienvenue dans votre espace client ${data.email}.`;
            clientArea.classList.remove("hidden");

            localStorage.setItem("mmotors_access_token", data.access_token);
        } catch (error) {
            loginMessage.textContent = error.message;
            loginMessage.classList.add("error");
            clientArea.classList.add("hidden");
        }
    });
}
