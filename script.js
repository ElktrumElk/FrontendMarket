const card = document.getElementById("card");
const main = document.getElementById("main");
const quickAccessCnt = document.getElementById("q_a_c");
const navMarker = document.getElementById("nav_marker");


const qAnimation = quickAccessCnt.getAnimations()[0]

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
        navMarker.style.transform = `translateX(${moveX}px) scaleX(1.2)`;
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

for (let i = 0; i < 20; i++) {
    const newCard = card.cloneNode(true);

    main.appendChild(newCard);
}

