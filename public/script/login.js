import notificationPanel from "./notification/notification_panel.js";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {


        const formData = new FormData(loginForm);
        const jsonData = Object.fromEntries(formData.entries());

        const res = await fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        });

        const data = await res.json();

        if (data.state === true) {

            notificationPanel({
                message: data.message,
                type: "success"
            });

            setTimeout(() => {
                window.location.href = "/home";
            }, 1000);

        } else {

            notificationPanel({
                message: data.message,
                type: "error"
            });
        }
    } catch (e) {
        notificationPanel({
            message: "There was a problem connecting to the server. Please try again later",
            type: "error"
        });
    }
});