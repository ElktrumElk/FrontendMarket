const pName = document.getElementById("profilename");
const pTag = document.getElementById("profileTag");
const pBio = document.getElementById("profileBIo");
const pp = document.getElementById("pp_img");
const menuBtnImage = document.getElementById("acc_menu");
const following = document.getElementById("following");
const follower = document.getElementById("follower");
const product = document.getElementById("product");


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

    pName.innerText = info.info.username;
    pTag.innerText = info.info.user_tag;
    pBio.innerText = info.info.userbio;
    pp.src = "/" + info.info.p_img_link;
    menuBtnImage.src = "/" + info.info.p_img_link;
    follower.innerText = info.info.followers;
    following.innerText = info.info.following;
    product.innerText = info.info.products;
}

fetchInfo();