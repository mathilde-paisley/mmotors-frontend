console.log("M-Motors Front-End initialisé");

// US01-REGISTER-JS-START
document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const registerMessage = document.getElementById("register-message");

    if (!registerForm || !registerMessage) {
        return;
    }

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        registerMessage.textContent = "Création du compte en cours...";
        registerMessage.className = "form-message";

        const formData = new FormData(registerForm);

        const payload = {
            first_name: formData.get("first_name").trim(),
            last_name: formData.get("last_name").trim(),
            email: formData.get("email").trim(),
            password: formData.get("password")
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                registerMessage.textContent = "Compte client créé avec succès.";
                registerMessage.className = "form-message success";
                registerForm.reset();
                return;
            }

            registerMessage.textContent = data.detail || "La création du compte a échoué.";
            registerMessage.className = "form-message error";
        } catch (error) {
            registerMessage.textContent = "Impossible de contacter le serveur Back-End.";
            registerMessage.className = "form-message error";
        }
    });
});
// US01-REGISTER-JS-END
