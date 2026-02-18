import animatePanel from "./animate_panel.js";

const card = document.getElementById("card");
const main = document.getElementById("main");
const quickAccessCnt = document.getElementById("q_a_c");
const navMarker = document.getElementById("nav_marker");
const menuBtn = document.getElementById("acc_menu");
const menuClsBtn = document.getElementById("sidebar_close");
const sideBar = document.getElementById("side_bar");
const sideBarDis = document.getElementById("dis");

const qAnimation = quickAccessCnt.getAnimations()[0];


/**
 * Function that close the side bar
 */
function closeSideBar() {
    if (isMenuOpened) {
        sideBar.style.transform = "translateX(140%)";
        sideBarDis.style.opacity = 0;
    }

    setTimeout(() => {

        sideBarDis.style.display = "none";

    }, 400);
    document.body.style.overflowY = "";

    isMenuOpened = false;
}







quickAccessCnt.addEventListener("click", () => {

    qAnimation.cancel();
    qAnimation.play();

});

let isMove = false;
let currentPos = 0;
navMarker.addEventListener("touchstart", (e) => {

    isMove = true;

})

quickAccessCnt.addEventListener("click", (e) => {

    if (e.target.id === "add") {
        navMarker.style.transform = `translateX(62.999999px) scaleX(1)`;
    }
    else if (e.target.id === "search") {
        navMarker.style.transform = `translateX(125px) scaleX(1)`;

    } else {
        navMarker.style.transform = `translateX(0px) scaleX(1)`;

    }
})

quickAccessCnt.addEventListener("touchmove", (e) => {

    if (isMove) {

        const rightPos = quickAccessCnt.getBoundingClientRect().width;
        const markerWidth = navMarker.getBoundingClientRect().width;

        const moveX = e.touches[0].clientX - rightPos + 15;

        if (moveX > (rightPos - markerWidth - 10) || moveX < 0) return;

        console.log(moveX, rightPos)
        requestAnimationFrame(() => {
            navMarker.style.transform = `translateX(${moveX}px) scaleX(1.2)`;
        })

        currentPos = moveX;
    }
});

document.body.addEventListener("touchend", () => {
    if (isMove) {

        isMove = false;

        if (currentPos > 40.3333 && currentPos < 70) {
            navMarker.style.transform = `translateX(62.999999px) scaleX(1)`;
        }
        else if (currentPos > 70) {
            navMarker.style.transform = `translateX(125px) scaleX(1)`;

        } else {
            navMarker.style.transform = `translateX(0px) scaleX(1)`;

        }



    }
})


/**=====================SIDEBAR SECTION=============================== */
let isMenuOpened = false;

/**Open side bar */
menuBtn.addEventListener("click", () => {
    if (!isMenuOpened) {
        sideBarDis.style.display = "flex";

        document.body.style.overflowY = "hidden"

        requestAnimationFrame(() => {
            sideBar.style.transform = "translateX(25%)";
            sideBarDis.style.opacity = 1;
        });
        isMenuOpened = true;
    }
})

sideBarDis.addEventListener("click", (e) => {

    if (e.target.id !== sideBarDis.id) return;
    closeSideBar();
});
/**Close side bar */
menuClsBtn.addEventListener("click", () => {
    closeSideBar();
});

const toggleBtn = document.getElementById("toggle");
const ctrBtn = document.getElementById("ctr");


let isLight = true;

toggleBtn.addEventListener("click", () => {
    if (isLight) {
        toggleBtn.style.backgroundColor = "rgba(60, 173, 248, 0.4)";
        toggleBtn.style.backdropFilter = "blur(5px)";
        document.body.classList.add("dark");
        ctrBtn.style.alignSelf = "flex-end"
        isLight = false;
    }
    else {
        toggleBtn.style.backgroundColor = "";
        document.body.classList.remove("dark");
        ctrBtn.style.alignSelf = "flex-start"
        isLight = true;

    }
});

const addPanel = document.getElementById("addPanel");
const addBtn = document.getElementById("add");
const homeBtn = document.getElementById("home");
const addCancel = document.getElementById("cancel_add");
const UploadBtn = document.getElementById("uploadBtn");
let isAddActive = false;

//to display the section of the page
addBtn.addEventListener("click", () => {

    document.body.style.overflow = "hidden";
    if (!isAddActive) {

        animatePanel(addPanel, {
            axis: "Y",
            value: 0
        });
        isAddActive = true;
    }
});

//cancel the upload
addCancel.addEventListener("click", () => {
    if (isAddActive) {

        animatePanel(addPanel, {
            axis: "Y",
            value: 100
        })
        isAddActive = false;
        navMarker.style.transform = `translateX(0px) scaleX(1)`;
        document.body.style.overflow = "";

        setTimeout(() => {

            addPanel.style.display = "none";

        }, 300);
    }
})

//set to flag to false to prevent unexpected behaviour
UploadBtn.addEventListener("click", () => {
    isAddActive = false;
});

const imageHandler = document.getElementById("img");
const imageSelector = document.getElementById("img_selector");

imageHandler.addEventListener("click", () => {
    imageSelector.click();
})

imageSelector.addEventListener("change", () => {
    const blobImage = imageSelector.files[0];

    const imgUrl = URL.createObjectURL(blobImage);

    const imageElement = document.createElement("img");
    imageElement.setAttribute('class', 'image');
    imageElement.src = imgUrl;
    imageHandler.innerHTML = "";
    imageElement.alt = "Select Image";
    imageHandler.appendChild(imageElement);
});

const fileHandler = document.getElementById("file_handler");
const fileSelector = document.getElementById("file_selector");

fileHandler.addEventListener("click", () => {
    fileSelector.click();
})

fileSelector.addEventListener("change", () => {
    try {
        fileHandler.innerHTML = "";
        [...fileSelector.files].forEach(file => {
            const fileUrl = URL.createObjectURL(file);

            const anchor = document.createElement("span");
            anchor.setAttribute("class", "files_block");
            anchor.innerText = file.name;

            fileHandler.appendChild(anchor);
        });
    }
    catch (e) {
        alert("Sorry you can't view thsi file: ", e);
    }
});