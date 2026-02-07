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

//demo
for (let i = 0; i < 20; i++) {
    const newCard = card.cloneNode(true);

    main.appendChild(newCard);
}

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

sideBarDis.addEventListener("click", () => {
    closeSideBar();
});
/**Close side bar */
menuClsBtn.addEventListener("click", () => {
    closeSideBar();
});

