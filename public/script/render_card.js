

export function renderCard(parent, p_image, owner_name, tag, desc, temp_name, price_value, temp_img_src) {

    //Comment: the main card
    const mainCard = document.createElement("article");
    mainCard.setAttribute("class", "template_card");
    
    if (parent.children.length == 0) {
        parent.appendChild(mainCard);
    }else {
        parent.insertBefore(mainCard, parent.children[parent.children.length - 1]);
    }

    //Comment: Profile Card that holds the username and tag with profile image and price
    /**
     * Holds user info and with the price
     */
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

    const pricecnt = document.createElement("span");
    pricecnt.setAttribute("class", "price");
    pricecnt.innerText = price_value;
    profileCnt.appendChild(pricecnt);

    const TempImg = document.createElement("div");
    TempImg.setAttribute("class", "prev");
    mainCard.appendChild(TempImg);

    const tempImage = document.createElement("img");
    tempImage.src = temp_img_src;
    tempImage.alt = "template"
    TempImg.appendChild(tempImage);

    const tempNameCnt = document.createElement("div");
    tempNameCnt.setAttribute("class", "tname_cnt");
    TempImg.appendChild(tempNameCnt)

    const tempName = document.createElement("h3");
    tempName.innerText = temp_name;
    tempNameCnt.appendChild(tempName);


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