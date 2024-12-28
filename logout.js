// Logout logic
document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logoutButton");

    logoutButton.addEventListener("click", () => {
        fetch("/api/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
                if (data.success) {
                    window.location.href = "/login"; // Redirect to login page
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    });
});
