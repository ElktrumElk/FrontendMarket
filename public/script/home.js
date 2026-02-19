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
    pp.src = "/" + info.p_img_link;
    menuBtnImage.src = "/" + info.p_img_link;
    follower.innerText = "Followers \n"+info.followers;
    following.innerText = "Following \n"+info.following;
    product.innerText = "Products \n"+info.products;
};

fetchInfo();

async function fetchposts() {
    const res = await fetch("/get/posts?cursor=5", {
        method: "GET",
    });

    const data = await res.json();

    if (data.state === true) {
        Array.from(data.data).forEach(async inf => { /*post details */

            const res = await fetch(`/api/usr?userId=${inf.user_id}`, {
                method: "GET",
            });

            const data = await res.json();
            const info = JSON.parse(data); //user details
            console.log(inf)

            renderCard(MainGridElement, "/" + info.info.p_img_link, info.info.username, info.info.user_tag, inf.post_des, inf.post_name, inf.post_price, inf.post_img);
        })
    };
};

fetchposts();