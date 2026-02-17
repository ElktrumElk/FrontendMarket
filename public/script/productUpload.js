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


UploadBtn.addEventListener("click", async () => {
    const form = new FormData();
    form.append("image", templateImage.files[0]);
    const tempform = new FormData();
    tempform.append("files", [...tempFiles.files]);


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
        body: info
    });

    const data = await res.json();

    if (data.state === true) {
        const res = await fetch("/post/file/upload", {
            method: "POST",
            body: tempform
        });

        const data = await res.json();
        if (data) {

        }
        else {
            alert("An error occur");
        }
    }
    else {
        alert("There was a problem uploading you template. Try again later");
    }
});

