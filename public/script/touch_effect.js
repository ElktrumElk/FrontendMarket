const tch = document.querySelector("#touch");


const anim = tch.getAnimations()[0];

document.body.addEventListener("click", (e) => {

    tch.style.visibility = "visible"
    anim.cancel();
    anim.play();

    const width = tch.getBoundingClientRect().width;
    const height = tch.getBoundingClientRect().height;

    //console.log(width);
    //console.log(height);

    const posX = e.clientX - width * 2.5;
    const posY = e.clientY - height / 2;

    //console.log("postX", posX);
    //console.log("postY", posY);
    //console.log(posX, posY);
    tch.style.transform = `translateX(${posX}px) translateY(${posY}px)`;
    setTimeout(() => {
          tch.style.visibility = "hidden"
    }, 300);
})


