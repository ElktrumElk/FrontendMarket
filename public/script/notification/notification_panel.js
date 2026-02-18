import animatePanel from "../animate_panel";

export default function notificationPanel(message, type) {

    const panel = document.createElement("div");
    panel.setAttribute("class", "panel");

    const img = document.createElement("img");
    img.setAttribute("id", "typeIc");

    if (type === "success") {
        img.src = "/alertIC/correctIc.png";
    } else {
        img.src = "/alertIC/error_red.png";
    }

    const msg = document.createElement("span");
    msg.setAttribute("id", "message");
    msg.innerText = message;

    panel.appendChild(img);
    panel.appendChild(msg);

    document.body.appendChild(panel);

    animatePanel()
}