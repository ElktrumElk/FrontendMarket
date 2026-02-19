import notificationPanel from "./script/notification/notification_panel.js";

const successBtn = document.getElementById("suc");
const errorBtn = document.getElementById("err");

successBtn.addEventListener("click", () => {
    notificationPanel({
        message: "This is success",
        type: "success"
    })
});

errorBtn.addEventListener("click", () => {
    notificationPanel({
        message: "An error occur",
        type: "error"
    });
});