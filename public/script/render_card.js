

export function renderCard() {
    const mainCard = document.createElement("article");
    mainCard.setAttribute("class", "template_card");

    const profileCnt = document.createElement("div");
    profileCnt.setAttribute("class", "profile");

    const cardPImage = document.createElement("img");
    cardPImage.setAttribute("class", "p_image");


    const nameCnt = document.createElement("div");
    nameCnt.setAttribute("class", "name_cnt");

    const cardOwnerName = document.createElement("h2");
    cardOwnerName.setAttribute("id", "name");


    const cardTag = document.createElement("span");
    cardTag.setAttribute("class", "tags");


    const TempImg = document.createElement("div");
    TempImg.setAttribute("class", "prev");

    const des = document.createElement("p");
    des.setAttribute("class", "des");

    const btnCnt = document.createElement("div");
    btnCnt.setAttribute("class", "btns_cnt");

    const previewBtn = document.createElement("button");
    previewBtn.setAttribute("class", "btns");

    const DownloadBtn = document.createElement("button");
    DownloadBtn.setAttribute("class", "btns");



}