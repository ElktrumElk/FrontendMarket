import animatePanel from "../animate_panel.js";

export default function notificationPanel({ message = "", type = "success", toggleTime = 1000 }) {

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

    animatePanel(panel, {
        axis: "Y",
        value: 0
    });

    setTimeout(() => {
        animatePanel(panel, {
            axis: "Y",
            value: -140
        });

        setTimeout(() => {
            panel.remove();
        }, toggleTime)
    }, toggleTime);
}