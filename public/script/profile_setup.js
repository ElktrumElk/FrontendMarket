const image = document.getElementById("pp");
const bio = document.getElementById("userBio");
const file_Selector = document.getElementById("fileSelector");
const fileHandler = document.getElementById("file_handler");

const skipBtn = document.getElementById("skip");
const uploadBtn = document.getElementById("upload");

fileHandler.addEventListener("click", () => {
    file_Selector.click();
});

file_Selector.addEventListener("change", () => {
    const imageFile = file_Selector.files[0];
    
    if (imageFile.type == "video") return;

    const imgUrl = URL.createObjectURL(imageFile);
    image.src = imgUrl;
});

fileHandler.addEventListener("scroll", () => {
    console.log(fileHandler.style.objectPosition);
});

uploadBtn.addEventListener("click", async() => {

    const inf = {
        p_image: image,
        p_bio: bio.value
    }

    await fetch("/api/user/profile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(inf)
    });
});