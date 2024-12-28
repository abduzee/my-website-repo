// Login logic with server response handling
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(loginForm);
        fetch("/login", {
            method: "POST",
            body: JSON.stringify(Object.fromEntries(formData.entries())),
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
                // Clear previous messages
                const existingMessage = document.getElementById("message");
                if (existingMessage) {
                    existingMessage.textContent = ""; // Clear any previous content
                    existingMessage.className = "";  // Remove existing styles
                }

                // Show success or error message
                const message = document.getElementById("message");
                message.textContent = data.message;
                message.className = data.success ? "success" : "error";

                if (data.success) {
                    setTimeout(() => {
                        window.location.href = "/homepage"; // Redirect to homepage
                    }, 2000); // Redirect after showing success message
                }
            })
            .catch((error) => {
                console.error("Error:", error);

                // Display generic error message in case of a fetch error
                const message = document.getElementById("message");
                message.textContent = "An error occurred. Please try again.";
                message.className = "error";
            });
    });
});
