

export function renderCard(parent, p_image, owner_name, tag, desc) {

    const mainCard = document.createElement("article");
    mainCard.setAttribute("class", "template_card");
    
    if (parent.children.length == 0) {
        parent.appendChild(mainCard);
    }else {
        parent.insertBefore(mainCard, parent.children[parent.children.length - 1]);
    }


    const profileCnt = document.createElement("div");
    profileCnt.setAttribute("class", "profile");
    mainCard.appendChild(profileCnt);

    const cardPImage = document.createElement("img");
    cardPImage.setAttribute("class", "p_image");
    cardPImage.src = p_image;
    profileCnt.appendChild(cardPImage);

    const nameCnt = document.createElement("div");
    nameCnt.setAttribute("class", "name_cnt");
    profileCnt.appendChild(nameCnt);

    const cardOwnerName = document.createElement("h2");
    cardOwnerName.setAttribute("id", "name");
    cardOwnerName.innerText = owner_name;
    nameCnt.appendChild(cardOwnerName);


    const cardTag = document.createElement("span");
    cardTag.setAttribute("class", "tags");
    cardTag.innerText = tag;
    nameCnt.appendChild(cardTag);


    const TempImg = document.createElement("div");
    TempImg.setAttribute("class", "prev");
    mainCard.appendChild(TempImg);


    const des = document.createElement("p");
    des.setAttribute("class", "des");
    des.innerText = desc;
    mainCard.appendChild(des);

    const btnCnt = document.createElement("div");
    btnCnt.setAttribute("class", "btns_cnt");
    mainCard.appendChild(btnCnt);

    const previewBtn = document.createElement("button");
    previewBtn.setAttribute("class", "btns2");
    previewBtn.innerText = "Preview"
    btnCnt.appendChild(previewBtn);


    const DownloadBtn = document.createElement("button");
    DownloadBtn.setAttribute("class", "btns2");
    DownloadBtn.innerText = "Download";
    DownloadBtn.style.backgroundColor = "rgb(67, 206, 245)";

    btnCnt.appendChild(DownloadBtn);




}