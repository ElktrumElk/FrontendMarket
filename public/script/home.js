const pName = document.getElementById("profilename");
const pTag = document.getElementById("profileTag");
const pBio = document.getElementById("profileBIo");


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

    console.log(JSON.parse(data));
}

fetchInfo();