import { renderCard } from "./render_card.js";

const pName = document.getElementById("profilename");
const pTag = document.getElementById("profileTag");
const pBio = document.getElementById("profileBIo");
const pp = document.getElementById("pp_img");
const menuBtnImage = document.getElementById("acc_menu");
const following = document.getElementById("following");
const follower = document.getElementById("follower");
const product = document.getElementById("product");
const MainGridElement = document.getElementById("main");


/**Comment: Initial fetch
 * Fetch the user info
*/
async function fetchInfo() {

    const res = await fetch("/api/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await res.json();
    const info = JSON.parse(data.info);

    pName.innerText = info.username;
    pTag.innerText = info.user_tag;
    pBio.innerText = info.userbio;
    pp.src = info.p_img_link;
    menuBtnImage.src = info.p_img_link;
    follower.innerText = "Followers \n" + info.followers;
    following.innerText = "Following \n" + info.following;
    product.innerText = "Products \n" + info.products;
};

fetchInfo();
let loader;

async function fetchposts({ cursor = null }) {
    const res = await fetch(cursor == null ? "/get/posts" : `/get/posts?cursor=${cursor - 1}`, {
        method: "GET",
    });

    const data = await res.json();

    let ctr = 0;
    if (data.state === true) {
        Array.from(data.data).forEach(async inf => { /*post details */

            const res = await fetch(`/api/usr?userId=${inf.user_id}`, {
                method: "GET",
            });

            const data2 = await res.json();
            const info = JSON.parse(data2); //user details

            renderCard(MainGridElement, inf.id, info.info.p_img_link, info.info.username, info.info.user_tag, inf.post_des, inf.post_name, inf.post_price, `${inf.post_img}`);
            ctr += 1;
            if (ctr == data.data.length - 1) {
                loader = inf.id;
                console.log(inf.id)
            }
        });
    };
};


fetchposts({ cursor: null }); //initial fetch

//Comment: flag for another fetch prventing multi fetch oof the same kind
let isFetched = false;

//Comment: observer to fetch new posts
const observer = new IntersectionObserver((ent) => {
    if (ent[0].isIntersecting) {
        if (loader) {
            if (!isFetched) {
                isFetched = true;
                fetchposts({ cursor: loader }); //fetch
                isFetched = false;
                console.log("post fetched") //debugging
            }
        }
    }
});

//listen to user scroll to perform fetch
window.addEventListener("scroll", () => {
    if (loader) {
        if (!isFetched) {

            console.log(loader)
            const loaderObj = document.getElementById(`card${loader}`);

            observer.observe(loaderObj);
        }
    }

});

