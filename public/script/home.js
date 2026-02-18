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
    const info = JSON.parse(data);

    sessionStorage.setItem("inf", JSON.stringify(info.info));

    pName.innerText = info.info.username;
    pTag.innerText = info.info.user_tag;
    pBio.innerText = info.info.userbio;
    pp.src = "/" + info.info.p_img_link;
    menuBtnImage.src = "/" + info.info.p_img_link;
    follower.innerText = "Followers \n"+info.info.followers;
    following.innerText = "Following \n"+info.info.following;
    product.innerText = "Products \n"+info.info.products;
}

fetchInfo();

async function fetchposts() {
    const res = await fetch("/get/posts?cursor=5", {
        method: "GET",
    });

    const data = await res.json();

    if (data.state === true) {
        Array.from(data.data).forEach(async inf => {

            const res = await fetch(`/api/usr?userId=${inf.user_id}`, {
                method: "GET",
            });

            const data = await res.json();
            const info = JSON.parse(data);

            renderCard(MainGridElement, "/" + info.info.p_img_link, info.info.username, info.info.user_tag, inf.post_des);

        })
        console.log(data.data);
    };
};

fetchposts();