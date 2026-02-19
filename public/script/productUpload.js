import animatePanel from "./animate_panel.js";
import { renderCard } from "./render_card.js";

const addPanel = document.getElementById("addPanel");
const addBtn = document.getElementById("add");
const homeBtn = document.getElementById("home");
const addCancel = document.getElementById("cancel_add"); // cancel btn
const UploadBtn = document.getElementById("uploadBtn"); //upload btn
const categories = document.getElementById("tem_cat"); //category select tag
const price = document.getElementById("tem_price"); //price section
const description = document.getElementById("tem_des"); //description
const Name = document.getElementById("tem_name"); // name of the template given
const templateFiles = document.getElementById("file_selector");
const templateImage = document.getElementById("img_selector");
const MainGridElement = document.getElementById("main");

/**
    * New formdata form the template files
    */
const tempform = new FormData();

templateFiles.addEventListener("change", () => {

    //apppend the multiple of files to the form data with one keyname
    [...templateFiles.files].forEach(file => {
        tempform.append("files", file);
    });

});


UploadBtn.addEventListener("click", async () => {
    const form = new FormData();
    form.append("image", templateImage.files[0]);



    //form.append("files", [...templateFiles.files]);
    const info = {
        tName: Name.value,
        tPrice: price.value,
        tDes: description.value,
        tCat: categories.value
    }

    const res = await fetch("/api/user/add/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "info": JSON.stringify(info) })
    });

    const data = await res.json();

    if (data.state === true) {
        const imgRes = await fetch('/template/img/upload', {
            method: "POST",
            body: form
        });

        //listen for th eresponse of the image
        const imgData = await imgRes.json();

        //Comment: Validate;
        if (imgData.state === true) {

            const res = await fetch("/post/file/upload", {
                method: "POST",
                body: tempform
            });

            const data = await res.json();

            if (data) {
                //animate panel if upload successful
                animatePanel(addPanel, {
                    axis: "Y",
                    value: 100
                });
                const chachedData = JSON.parse(sessionStorage.getItem("inf"))
                renderCard(MainGridElement, chachedData.p_img_link, chachedData.username, chachedData.user_tag, info.tDes);
                document.body.style.overflow = "";
            }
            else {
                alert("An error occur");
            }
        }
        else {
            alert("Unable to upload image");
        }
    }
    else {
        alert("There was a problem uploading you template. Try again later");
    }
});


