import notificationPanel from "./notification/notification_panel.js";

const image = document.getElementById("pp");
const bio = document.getElementById("userBio");
const username = document.getElementById("usr");
const file_Selector = document.getElementById("fileSelector");
const fileHandler = document.getElementById("file_handler");
const nameSub = document.getElementById("name");
const skipBtn = document.getElementById("skip");
const uploadBtn = document.getElementById("upload");

fileHandler.addEventListener("click", () => {
    file_Selector.click();
});

//set username
username.innerText = localStorage.getItem("usrname");
nameSub.innerText = username.innerText;

//new form object
const formData = new FormData();

/**LISTEN TO input changes */
file_Selector.addEventListener("change", () => {
    const imageFile = file_Selector.files[0];

    //Comment: Only accept image
    if (imageFile.type.startsWith("image/")) {

        const imgUrl = URL.createObjectURL(imageFile);
        image.src = imgUrl;

        formData.append("image", imageFile);

    } else {

        //Notify of wrong use
        notificationPanel({
            message: "Only Image are allowed.",
            type: "error"
        });
        return;
    }
});

/*
fileHandler.addEventListener("scroll", () => {
    console.log(image.scrollHeight);
});
*/

uploadBtn.addEventListener("click", async () => {


    //Comment: bio validation
    if (bio.value === "") {
        notificationPanel({
            message: "Please fill in Bio or you can skip",
            type: "error"
        });
    }
    else {
        console.log(formData);

        await fetch("/profileImage/upload", {
            method: "POST",
            body: formData
        })
            .then(res => res.json)
            .then(async data => {
                notificationPanel({
                    message: data.message,
                    type: "success"
                });
            })
            .catch(err => {
                notificationPanel({
                    message: "An error occur whiles uploading image",
                    type: "error"
                });
            });


        const res = await fetch("/api/user/profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ info: bio.value })
        });

        const data = await res.json();
        if (data.stats === true) {
            notificationPanel({
                message: "Success",
                type: "success"
            });
            setTimeout(() => {
                window.location.href = '/home';
            }, 1000);
        }
        else {
            notificationPanel({
                message: data.message,
                type: "error"
            });
            return;
        }
    }

});