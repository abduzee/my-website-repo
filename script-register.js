// Dynamic validation and registration logic
document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const fullNameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");

    const validateInput = (input, condition, message) => {
        const feedback = input.nextElementSibling; // Target <small> feedback
        if (condition) {
            feedback.textContent = "";
            input.classList.remove("invalid");
            input.classList.add("valid");
        } else {
            feedback.textContent = message;
            input.classList.remove("valid");
            input.classList.add("invalid");
        }
    };

    // Validate full name
    fullNameInput.addEventListener("input", () => {
        validateInput(fullNameInput, fullNameInput.value.trim().length >= 3, "Full name must be at least 3 characters.");
    });

    // Validate email
    emailInput.addEventListener("input", () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validateInput(emailInput, emailPattern.test(emailInput.value.trim()), "Enter a valid email address.");
    });

    // Validate password
    passwordInput.addEventListener("input", () => {
        validateInput(passwordInput, passwordInput.value.length >= 6, "Password must be at least 6 characters.");
    });

    // Validate confirm password
    confirmPasswordInput.addEventListener("input", () => {
        validateInput(
            confirmPasswordInput,
            confirmPasswordInput.value === passwordInput.value,
            "Passwords do not match."
        );
    });

    // Handle form submission
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Ensure all inputs are valid before submitting
        if (
            fullNameInput.classList.contains("valid") &&
            emailInput.classList.contains("valid") &&
            passwordInput.classList.contains("valid") &&
            confirmPasswordInput.classList.contains("valid")
        ) {
            // Clear any existing message
            const existingMessage = document.getElementById("formMessage");
            if (existingMessage) {
                existingMessage.remove();
            }

            const formData = new FormData(registerForm);
            fetch("/register", {
                method: "POST",
                body: JSON.stringify(Object.fromEntries(formData.entries())),
                headers: { "Content-Type": "application/json" },
            })
                .then((response) => response.json())
                .then((data) => {
                    const message = document.createElement("div");
                    message.id = "formMessage";
                    message.textContent = data.message;
                    message.className = data.success ? "success" : "error";

                    // Add the message at the top of the form
                    registerForm.insertAdjacentElement("beforebegin", message);

                    if (data.success) {
                        // Reset the form if registration is successful
                        registerForm.reset();
                        document.querySelectorAll(".valid").forEach((input) => input.classList.remove("valid"));

                        // Redirect to the login page after 2 seconds
                        setTimeout(() => {
                            window.location.href = "login.html";
                        }, 2000);
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else {
            alert("Please fill out the form correctly.");
        }
    });
});
