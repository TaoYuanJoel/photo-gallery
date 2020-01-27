let galleryImages = document.querySelectorAll('.gallery-img');
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

if (galleryImages) {
    galleryImages.forEach(function (img, index) {
        img.onclick = function () {
            let getElementCss = window.getComputedStyle(img);
            let getUrl = getElementCss.getPropertyValue("background-image");
            let getGifPos = getUrl.split('/img/');
            getGifPos = getGifPos[1].split('.');
            getGifPos = getGifPos[0].split('img');
            let setGifUrl = 'gif' + getGifPos[1] + ".gif";
            let setBGMUrl = 'bgm' + getGifPos[1] + '.mp3';

            console.log(getGifPos);

            getLatestOpenedImg = index + 1;
            //Open window background
            let container = document.body;
            let newGifWindow = document.createElement('div');
            container.appendChild(newGifWindow);
            newGifWindow.setAttribute('class', 'img-window');
            newGifWindow.setAttribute('onclick', 'closeImage()');
            //new gif
            let newGif = document.createElement("img")
            newGifWindow.appendChild(newGif);
            newGif.setAttribute('src', 'gif/' + setGifUrl);
            newGif.setAttribute('id', "current-image");
            //new audio
            let newAudio = document.createElement('audio')
            newGifWindow.appendChild(newAudio);
            newAudio.autoplay = true;
            newAudio.loop = true;
            newAudio.load();
            let newSrc = document.createElement('source')
            newAudio.appendChild(newSrc);
            newSrc.setAttribute('src', 'music/' + setBGMUrl);
            newAudio.setAttribute('id', "current-bgm");

            newGif.onload = function () {
                //calculate the position of button
                let gifWidth = this.width;
                let calcImgToEdge = (windowWidth - gifWidth) / 2 - 80;
                //Prev Button
                let newPrevBtn = document.createElement("a");
                let PrevBtnText = document.createTextNode("prev");
                newPrevBtn.appendChild(PrevBtnText);
                container.appendChild(newPrevBtn);
                newPrevBtn.setAttribute('class', 'img-btn-prev');
                newPrevBtn.setAttribute('onclick', 'changeImg(0)');
                newPrevBtn.style.cssText = 'left: ' + calcImgToEdge + 'px;';

                //Next Button
                let newNextBtn = document.createElement("a");
                let NextBtnText = document.createTextNode("next");
                newNextBtn.appendChild(NextBtnText);
                container.appendChild(newNextBtn);
                newNextBtn.setAttribute('class', 'img-btn-next');
                newNextBtn.setAttribute('onclick', 'changeImg(1)');
                newNextBtn.style.cssText = 'right: ' + calcImgToEdge + 'px;';
            }


        };
    });
}

function closeImage() {
    document.querySelector('.img-window').remove();
    document.querySelector('.img-btn-prev').remove();
    document.querySelector('.img-btn-next').remove();
}

function changeImg(changeDir) {

    document.querySelector('#current-image').remove();
    document.querySelector('#current-bgm').remove();
    //recreate gif
    let getGifWindow = document.querySelector('.img-window');
    let newGif = document.createElement("img");
    getGifWindow.appendChild(newGif);
    //recreate audio
    let newAudio = document.createElement('audio')
    getGifWindow.appendChild(newAudio);
    newAudio.autoplay = true;
    newAudio.loop = true;
    newAudio.load();
    let newSrc = document.createElement('source')
    newAudio.appendChild(newSrc);


    let calcNewImg;
    if (changeDir === 1) {
        calcNewImg = getLatestOpenedImg + 1;
        if (calcNewImg > galleryImages.length) {
            calcNewImg = 1;
        }
    } else if (changeDir === 0) {
        calcNewImg = getLatestOpenedImg - 1;
        if (calcNewImg < 1) {
            calcNewImg = galleryImages.length;
        }
    }

    newGif.setAttribute('src', 'gif/gif' + calcNewImg + '.gif');
    newGif.setAttribute('id', 'current-image');

    newSrc.setAttribute('src', 'music/bgm' + calcNewImg + '.mp3');
    newAudio.setAttribute('id', "current-bgm");

    getLatestOpenedImg = calcNewImg;

    // newGif.onload = function () {
    //     let gifWidth = this.width;
    //     let calcImgToEdge = (windowWidth - gifWidth) / 2 - 80;

    //     let nextBtn = document.querySelector('.img-btn-next');
    //     newNextBtn.style.cssText = 'right: ' + calcImgToEdge + 'px;';

    //     let prevBtn = document.querySelector('.img-btn-prev');
    //     newPrevBtn.style.cssText = 'left: ' + calcImgToEdge + 'px;';

    // }

}