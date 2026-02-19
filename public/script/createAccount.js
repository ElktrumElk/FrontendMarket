import notificationPanel from "./notification/notification_panel.js";

const usrname = document.getElementById("usrname"); //get username for profile setup
const createAccountForm = document.getElementById("create_account_form");

createAccountForm.addEventListener("submit", async (e) => {
    
    e.preventDefault(); //prevent automatic load

    //Comment: Save username in the localstorage
    localStorage.setItem("usrname", usrname.value);


    const formData = new FormData(createAccountForm);
    const jsonData = Object.fromEntries(formData.entries());

    const res = await fetch("/api/user/createAccount", {
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
            window.location.href = data.src;
        }, 1000);
    }
    else {

        notificationPanel({
            message: data.message,
            type: "error"
        });
    }
});