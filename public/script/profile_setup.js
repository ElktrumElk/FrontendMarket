const image = document.getElementById("pp");
const bio = document.getElementById("userBio");
const file_Selector = document.getElementById("fileSelector");
const fileHandler = document.getElementById("file_handler");

const skipBtn = document.getElementById("skip");
const uploadBtn = document.getElementById("upload");

fileHandler.addEventListener("click", () => {
    file_Selector.click();
});


const formData = new FormData();

/**LISTEN TO input changes */
file_Selector.addEventListener("change", () => {
    const imageFile = file_Selector.files[0];

    if (imageFile.type == "video") return;

    const imgUrl = URL.createObjectURL(imageFile);
    image.src = imgUrl;

    formData.append("image", imageFile);
});

/*
fileHandler.addEventListener("scroll", () => {
    console.log(image.scrollHeight);
});
*/

uploadBtn.addEventListener("click", async () => {



    await fetch("/profileImage/upload", {
        method: "POST",
        body: formData
    })
        .then(res => res.json)
        .then(async data => {
            console.log(data);
            const inf = {
                p_bio: bio.value
            }
            await fetch("/api/user/profile", {
                method: "POST",
                body: JSON.stringify(inf)
            })
        })
        .catch(err => console.error("Error:", err))

});