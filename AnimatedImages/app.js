const track = document.getElementById("image_horizontal_track");
let imagesSlide;

const aim = document.querySelector(".aim");
const aimsSide = document.querySelectorAll(".aim_side");

const counterDiv = document.getElementById("counter");
const totalImagesNumber = document.getElementById("totalImagesNumber");
const currentImagesNumber = document.getElementById("currentImagesNumber");
const dash = document.getElementById("dash");

const fullScreenImagesDiv = document.getElementById("fullScreenImagesDiv");
const fullScreenImagesHeadline = document.getElementById(
  "fullScreenImagesHeadline"
);
fullScreenImagesDiv.innerHTML = `<img id="central" draggable="false" />
    <img id="left" draggable="false" />
    <img id="right" draggable="false" />`;

const centralFullScreenImage = document.getElementById("central");
const leftFullScreenImage = document.getElementById("left");
const rightFullScreenImage = document.getElementById("right");

const storyImagesDiv = document.getElementById("storyImagesDiv");

let isStoryOpen = false;
let stopScroll = false;
let ImageFullScreen = false;
let ImageFullScreenClose = true;
let currentImageNumber = 1;
let imageClicked;
let bottomScroll = -1;

const imagesForStory = [
  //1
  [
    "https://img.freepik.com/free-photo/old-german-shepherd-laying-tree-garden-sunny-day_181624-15130.jpg?t=st=1731959140~exp=1731962740~hmac=db7d69a4543fbd2073552d23aafe005b2f6f3ff7e142c578910f8f82721a4b21&w=996",
    "https://img.freepik.com/free-photo/cute-black-king-shepherd-laying-middle-park-sunny-day_181624-57171.jpg?t=st=1731959160~exp=1731962760~hmac=912a15978f48ad15b61674bb70e6e9f28131f55c5982eddd6f09de585023a521&w=996",
    "https://img.freepik.com/free-photo/selective-focus-shot-adorable-german-shepherd-outdoors-daylight_181624-36837.jpg?t=st=1731959184~exp=1731962784~hmac=96e280a8e323480ed74fd72c90e9ccdc2dadbe10d1638c4a7a558066e1312bea&w=996",
    "https://img.freepik.com/free-photo/selective-focus-shot-adorable-german-shepherd_181624-30217.jpg?t=st=1731959214~exp=1731962814~hmac=87e72aeee8f3fd096079421d4758feb004a40e1e0fe95e1eb598b65d9da3e20c&w=900"
  ],
  //2
  [
    "https://img.freepik.com/free-photo/selective-focus-shot-young-tricolor-beagle-lying-grass-his-ball_181624-53206.jpg?t=st=1731959728~exp=1731963328~hmac=79f56b4dc7844eba3c7f03a2137761c2e0ae6af157daecc0b063ca84cdc7caca&w=996",
    "https://img.freepik.com/free-photo/close-up-outdoor-shot-adorable-cute-puppy-beagle-wearing-collar_343059-3081.jpg?t=st=1731959678~exp=1731963278~hmac=313145587bf898e633c48e0227c491b3148fcfbbc3d9d3f4e937db0a974a8b89&w=996",
    "https://img.freepik.com/free-photo/beagle-puppy-yellow_155003-30007.jpg?t=st=1731959802~exp=1731963402~hmac=d0e05ec665bc57219bf27d8adff0cd2356da54a6cce2e9b8c838e230d390e5e9&w=1060"
  ],
  //3
  [
    "https://img.freepik.com/free-photo/adorable-little-poodle-with-cute-striped-shirt-white-skirt-blue_181624-49964.jpg?t=st=1731959942~exp=1731963542~hmac=f15d46d45e7f67436c87c6dc18a01545592b3c28ec6620cac6a371d79374e0ad&w=996",
    "https://img.freepik.com/free-photo/happiness-cute-sweet-puppy-maltipoo-brown-dog-pet-posing-isolated-white-wall-concept-motion-pets-love-animal-life-looks-happy-funny-copyspace-ad-playing-running_155003-36747.jpg?t=st=1731959984~exp=1731963584~hmac=5246c0e92872713ad286e13cdd7bbf8d4f002f4fefec0e7ad64fda335fa40059&w=996"
  ],
  //4
  [
    "https://img.freepik.com/free-photo/shot-adorable-fierce-rottweiler-dog-running-forest_181624-58654.jpg?t=st=1731960349~exp=1731963949~hmac=34cc0c112ac086614caa7c7dbe3011d10602d050f4e6fa51812c80c26605734f&w=996",
    "https://img.freepik.com/free-photo/side-view-closeup-shot-black-white-australian-shepherd-after-swim_181624-21953.jpg?t=st=1731960368~exp=1731963968~hmac=62652359b65bca78a6f155a0ddd94796adf640dff5357f6626d6a018a11873c6&w=996",
    "https://img.freepik.com/free-photo/handsome-young-male-casual-outfit-playing-with-cute-dog-with-orange-ball-while-sitting-near-lake-dog-gives-paw_1157-50534.jpg?t=st=1731960395~exp=1731963995~hmac=4980a11c03ffd90efdfb63810ca7cbfd1bf1b7ab4bb6baec69e6ce773aaf19f6&w=996"
  ],
  //5
  [
    "https://img.freepik.com/free-photo/old-german-shepherd-laying-tree-garden-sunny-day_181624-15130.jpg?t=st=1731959140~exp=1731962740~hmac=db7d69a4543fbd2073552d23aafe005b2f6f3ff7e142c578910f8f82721a4b21&w=996",
    "https://img.freepik.com/free-photo/cute-black-king-shepherd-laying-middle-park-sunny-day_181624-57171.jpg?t=st=1731959160~exp=1731962760~hmac=912a15978f48ad15b61674bb70e6e9f28131f55c5982eddd6f09de585023a521&w=996",
    "https://img.freepik.com/free-photo/selective-focus-shot-adorable-german-shepherd-outdoors-daylight_181624-36837.jpg?t=st=1731959184~exp=1731962784~hmac=96e280a8e323480ed74fd72c90e9ccdc2dadbe10d1638c4a7a558066e1312bea&w=996",
    "https://img.freepik.com/free-photo/selective-focus-shot-adorable-german-shepherd_181624-30217.jpg?t=st=1731959214~exp=1731962814~hmac=87e72aeee8f3fd096079421d4758feb004a40e1e0fe95e1eb598b65d9da3e20c&w=900"
  ],
  //6
  [
    "https://img.freepik.com/free-photo/adorable-little-poodle-with-cute-striped-shirt-white-skirt-blue_181624-49964.jpg?t=st=1731959942~exp=1731963542~hmac=f15d46d45e7f67436c87c6dc18a01545592b3c28ec6620cac6a371d79374e0ad&w=996",
    "https://img.freepik.com/free-photo/happiness-cute-sweet-puppy-maltipoo-brown-dog-pet-posing-isolated-white-wall-concept-motion-pets-love-animal-life-looks-happy-funny-copyspace-ad-playing-running_155003-36747.jpg?t=st=1731959984~exp=1731963584~hmac=5246c0e92872713ad286e13cdd7bbf8d4f002f4fefec0e7ad64fda335fa40059&w=996"
  ],
  //7
  [
    "https://img.freepik.com/free-photo/shot-adorable-fierce-rottweiler-dog-running-forest_181624-58654.jpg?t=st=1731960349~exp=1731963949~hmac=34cc0c112ac086614caa7c7dbe3011d10602d050f4e6fa51812c80c26605734f&w=996",
    "https://img.freepik.com/free-photo/side-view-closeup-shot-black-white-australian-shepherd-after-swim_181624-21953.jpg?t=st=1731960368~exp=1731963968~hmac=62652359b65bca78a6f155a0ddd94796adf640dff5357f6626d6a018a11873c6&w=996",
    "https://img.freepik.com/free-photo/handsome-young-male-casual-outfit-playing-with-cute-dog-with-orange-ball-while-sitting-near-lake-dog-gives-paw_1157-50534.jpg?t=st=1731960395~exp=1731963995~hmac=4980a11c03ffd90efdfb63810ca7cbfd1bf1b7ab4bb6baec69e6ce773aaf19f6&w=996"
  ],
  //8
  [
    "https://img.freepik.com/free-photo/selective-focus-shot-young-tricolor-beagle-lying-grass-his-ball_181624-53206.jpg?t=st=1731959728~exp=1731963328~hmac=79f56b4dc7844eba3c7f03a2137761c2e0ae6af157daecc0b063ca84cdc7caca&w=996",
    "https://img.freepik.com/free-photo/close-up-outdoor-shot-adorable-cute-puppy-beagle-wearing-collar_343059-3081.jpg?t=st=1731959678~exp=1731963278~hmac=313145587bf898e633c48e0227c491b3148fcfbbc3d9d3f4e937db0a974a8b89&w=996",
    "https://img.freepik.com/free-photo/beagle-puppy-yellow_155003-30007.jpg?t=st=1731959802~exp=1731963402~hmac=d0e05ec665bc57219bf27d8adff0cd2356da54a6cce2e9b8c838e230d390e5e9&w=1060"
  ]
];
const imagesArr = [
  "https://img.freepik.com/free-photo/closeup-portrait-cute-german-shepherd-dog-running-grass_181624-30360.jpg?t=st=1731958967~exp=1731962567~hmac=ed12d3866c5e26aed2d526e677947c4eebbaf6d940c589de40027bb6045bdc51&w=996",
  "https://img.freepik.com/free-photo/outdoor-portrait-sweet-beagle-dog-with-smart-brown-eyes-sitting-grass-countryside-with-flowers_343059-3089.jpg?t=st=1731960496~exp=1731964096~hmac=bc8c32f719066f5f17101203a452f03d4870e559daf28b9751cf3588b22af960&w=996",
  "https://img.freepik.com/free-photo/toy-poodle-grassy-field_1359-57.jpg?t=st=1731959899~exp=1731963499~hmac=d7d238506dc7eb75368b85fd4bf07a38894ca6c69743ee44eecc2abf06f0b070&w=996",
  "https://img.freepik.com/free-photo/shot-adorable-puppy-playing-grass_181624-24136.jpg?t=st=1731960226~exp=1731963826~hmac=160f16746b01bf564bfaec20c9317d399045355efe176f03ae07d75ad4029db7&w=996",
  "https://img.freepik.com/free-photo/selective-focus-shot-adorable-german-shepherd_181624-30217.jpg?t=st=1731960839~exp=1731964439~hmac=74c6b54deb76965ef97cc61e347b1146c8e75920d39e45b7ef8996cc4f76d051&w=900",
  "https://img.freepik.com/free-photo/happy-pet-dogs-playing-grass-park_1359-298.jpg?t=st=1731960928~exp=1731964528~hmac=c803e5794c9d8fde7e23fde28285a40192ad6193b2d5f60d6b32f04207880d22&w=996",
  "https://img.freepik.com/free-photo/closeup-rottweiler-dog_181624-53364.jpg?t=st=1731961021~exp=1731964621~hmac=fd4a79022086b43e5f58bf9e537b60261d89d17421da173a4fcc084852ea3da8&w=996",
  "https://img.freepik.com/free-photo/close-up-outdoor-shot-adorable-cute-puppy-beagle-wearing-collar_343059-3081.jpg?t=st=1731959678~exp=1731963278~hmac=313145587bf898e633c48e0227c491b3148fcfbbc3d9d3f4e937db0a974a8b89&w=996"
];

const storyImagesFullscreen = [
  "https://img.freepik.com/free-photo/german-shepherd-lying-grass_8353-6401.jpg?t=st=1731959069~exp=1731962669~hmac=566c4fed3031b4144ce3a6dc0375a63fac10d975c91f7220d5ed6abd1a054048&w=996",
  "https://img.freepik.com/free-photo/isolated-top-view-picture-cute-beagle-dog-playing-green-grass-outdoors-park-sunny-day-looking-up-attentively-waiting-command-from-its-owner-adorable-tricolor-puppy-walk_343059-3083.jpg?t=st=1731959698~exp=1731963298~hmac=de5ebd02de9b253eb65c5cf4b39220a726c8c4ac4a0a5bd7cdd90df6e8ea370e&w=996",
  "https://img.freepik.com/free-photo/toy-poodle-grassy-field_1359-55.jpg?t=st=1731959920~exp=1731963520~hmac=2a6f09beb7408a310eb29e99adbb532048954865e82687636bc4d046d5ecdf4b&w=996",
  "https://img.freepik.com/free-photo/black-rottweiler-lake-surrounded-by-greenery-sunlight-with-blurry-background_181624-9931.jpg?t=st=1731960327~exp=1731963927~hmac=31591e8c38ceb6fd65f3293e7e89b289ee1d9ae600ff50dcb07b0fc767fc3770&w=996",
  "https://img.freepik.com/free-photo/closeup-portrait-cute-german-shepherd-dog-running-grass_181624-30360.jpg?t=st=1731958967~exp=1731962567~hmac=ed12d3866c5e26aed2d526e677947c4eebbaf6d940c589de40027bb6045bdc51&w=996",
  "https://img.freepik.com/free-photo/toy-poodle-grassy-field_1359-57.jpg?t=st=1731959899~exp=1731963499~hmac=d7d238506dc7eb75368b85fd4bf07a38894ca6c69743ee44eecc2abf06f0b070&w=996",
  "https://img.freepik.com/free-photo/shot-adorable-puppy-playing-grass_181624-24136.jpg?t=st=1731960226~exp=1731963826~hmac=160f16746b01bf564bfaec20c9317d399045355efe176f03ae07d75ad4029db7&w=996",
  "https://img.freepik.com/free-photo/close-up-outdoor-shot-adorable-cute-puppy-beagle-wearing-collar_343059-3081.jpg?t=st=1731959678~exp=1731963278~hmac=313145587bf898e633c48e0227c491b3148fcfbbc3d9d3f4e937db0a974a8b89&w=996"
];

const headlines = [
  "Немецкая овчарка",
  "Бигль",
  "Пудель",
  "Ротвейлер",
  "Немецкая овчарка",
  "Пудель",
  "Ротвейлер",
  "Бигль"
];

const storyHeadlines = [
  "История немецкой овчарки",
  "История бигля",
  "История пуделя",
  "История ротвейлер",
  "История немецкой овчарки",
  "История пуделя",
  "История ротвейлер",
  "История бигля"
];

const storiesText = [
  "Определяется два основных центра происхождения, а именно на нынешней территории Скандинавии и Северо-Западной России. Существует мнение[кого?], что при формировании породы подмешивали крови индийского волка.</br>Немецкая овчарка как культурная, заводская порода существует менее ста лет. Но она имеет более длительную историю как аборигенная порода, созданная пастухами и крестьянами Германии, на протяжении нескольких веков отбиравших только самых подходящих для работы собак. ",
  "Существует две версии происхождения названия этой породы. Одна из них связана со способностью издавать протяжный, мелодичный лай, из-за чего в название породы могло лечь французское слово begueule, дословно — лужёная глотка[1]. Другую версию связывают с малым размером собаки, и вспоминают о староанглийском слове begle, кельтском beag или старофранцузском beigh, которые имели значение «маленький» и применялись ко всем гончим, вне зависимости от породы и происхождения.",
  "Пудель занимает второе место в рейтинге самых умных пород, составленном доктором Стенли Кореном, после бордер-колли[2]. Они умеют приспосабливаться практически к любому климату.</br>Считается, что пудели были выведены во Франции, но некоторые называют их родиной Германию, так как слово «пудель» имеет немецкое происхождение[3]. Следует отметить, однако, что во Франции эта порода собак называется caniche от cane — утка[4][5], что свидетельствует о происхождении пуделя от охотничьих, французских водяных собак. Продолжительность жизни пуделей составляет от 10 до 18 лет.</br> Европе пудель известен с XV—XVI веков, долгое время оставался собакой, которая могла принадлежать только особам королевских кровей. За это и получил своё название большой (королевский) пудель, а вовсе не за размеры, как считают некоторые.[6]",
  "Собаки этого типа являются одними из самых древних в Германии, их происхождение уходит к собакам Римской Империи",
  "Определяется два основных центра происхождения, а именно на нынешней территории Скандинавии и Северо-Западной России. Существует мнение[кого?], что при формировании породы подмешивали крови индийского волка.</br>Немецкая овчарка как культурная, заводская порода существует менее ста лет. Но она имеет более длительную историю как аборигенная порода, созданная пастухами и крестьянами Германии, на протяжении нескольких веков отбиравших только самых подходящих для работы собак. ",
  "Пудель занимает второе место в рейтинге самых умных пород, составленном доктором Стенли Кореном, после бордер-колли[2]. Они умеют приспосабливаться практически к любому климату.</br>Считается, что пудели были выведены во Франции, но некоторые называют их родиной Германию, так как слово «пудель» имеет немецкое происхождение[3]. Следует отметить, однако, что во Франции эта порода собак называется caniche от cane — утка[4][5], что свидетельствует о происхождении пуделя от охотничьих, французских водяных собак. Продолжительность жизни пуделей составляет от 10 до 18 лет.</br> Европе пудель известен с XV—XVI веков, долгое время оставался собакой, которая могла принадлежать только особам королевских кровей. За это и получил своё название большой (королевский) пудель, а вовсе не за размеры, как считают некоторые.[6]",
  "Собаки этого типа являются одними из самых древних в Германии, их происхождение уходит к собакам Римской Империи",
  "Существует две версии происхождения названия этой породы. Одна из них связана со способностью издавать протяжный, мелодичный лай, из-за чего в название породы могло лечь французское слово begueule, дословно — лужёная глотка[1]. Другую версию связывают с малым размером собаки, и вспоминают о староанглийском слове begle, кельтском beag или старофранцузском beigh, которые имели значение «маленький» и применялись ко всем гончим, вне зависимости от породы и происхождения."
];

//ADD IMAGES TO HTML
imagesArr.forEach((e) => {
  let image = document.createElement("img");
  image.src = `${e}`;
  image.setAttribute("draggable", "false");
  image.classList.add("image");
  track.appendChild(image);
});

//ADD IMAGES COUNTER TO HTML
totalImagesNumber.innerHTML = `${imagesArr.length}`;
imagesArr.forEach((e, i) => {
  currentImagesNumber.innerHTML += `<span>${i + 1}</span>`;
});
imagesSlide = document.querySelectorAll(".image");

//change place of all images by slide or close full screen image
const handleOnMove = (e) => {
  if (!stopScroll) {
    if (!isStoryOpen) {
      if (track.dataset.mouseDownAt === "0") return;
      if (ImageFullScreen) {
        track.dataset.mouseDownAt = "0";
        return horizontalImagesUp();
      } else {
        horizontalImagesMath(e);
      }
    } else {
      scrollImagesAnimate(e.deltaY);
    }
  }
};

//change place of all images by wheel or close full screen image
window.addEventListener("wheel", (e) => {
  if (!stopScroll) {
    if (!isStoryOpen) {
      if (ImageFullScreen) {
        track.dataset.mouseDownAt = "0";
        return horizontalImagesUp();
      } else {
        return horizontalImagesMathWHeel(e);
      }
    } else {
      scrollImagesAnimate(e.deltaY);
    }
  }
});

//CLICKS
imagesSlide.forEach((el, i) => {
  imagesSlide[i].addEventListener("click", (e) => {
    if (e.target.closest(".imageDown"))
      return i > imageClicked ? toRight(i) : toLeft(i);
    imageClicked = i;
    horizontalImagesClickDown(e);
  });
});

central.addEventListener("click", (e) => {
  //if (track.dataset.mouseDownAt !== "0") return;
  if (ImageFullScreen) {
    const direction = window.innerWidth / 2 - e.clientX;
    if (direction >= 0 && imageClicked > 0) {
      return toLeft();
    } else if (direction < 0 && imageClicked < 7) {
      return toRight();
    }
  }
});

fullScreenImagesHeadline.addEventListener("click", (e) => {
  if (e.target.closest(".imageDown")) return openStoryContainer(imageClicked);
});

//it opens images to fullscreen
const horizontalImagesClickDown = (e) => {
  //if (e.target.closest(".imageDown")) return;
  ImageFullScreen = true;

  //
  aimsAndHeadlineShow();

  //
  imageToFullScreen(imageClicked);

  //move all images down
  horizontalImagesDownAnim();

  //change photo count
  horizontalImagesCounter(-12.645 * imageClicked);

  track.animate(
    {
      gap: "1vmin",
      transform: "translate(10vw, -50%)"
    },
    {
      duration: 520,
      easing: "ease-out",
      fill: "forwards"
    }
  );

  //
  fullScreenImagesHeadline.addEventListener("click", (e) => {
    openStoryContainer();
  });
};

//it closes fullscreen image
const horizontalImagesUp = (e) => {
  if (!ImageFullScreenClose) return;
  ImageFullScreenClose = false;
  //aims and headlines animations
  aimsAndHeadlineHide();

  /*move all images up*/
  horizontalImagesUpAnim();

  //
  imageToFullScreenClose(imageClicked);

  /*track to center*/
  trackAnimtaion();
  return;
};

//AIMS AND HEADLINES ANIMATE
const aimsAndHeadlineShow = () => {
  aim.style.opacity = "0";
  aimsSide.forEach((e) => (e.style.opacity = "1"));
  imagesHeadlineShow();
};
const aimsAndHeadlineHide = () => {
  aim.style.opacity = "1";
  aimsSide.forEach((e) => (e.style.opacity = "0"));
  imagesHeadlineHide();
};
const imagesHeadlineShow = () => {
  fullScreenImagesHeadline.innerHTML = `${headlines[imageClicked]}`;
  fullScreenImagesHeadline.classList.remove("imagesHeadlineHide");
  fullScreenImagesHeadline.classList.add("imagesHeadlineShow");
};
const imagesHeadlineHide = () => {
  fullScreenImagesHeadline.classList.remove("imagesHeadlineChange");
  fullScreenImagesHeadline.classList.remove("imagesHeadlineShow");
  fullScreenImagesHeadline.classList.add("imagesHeadlineHide");
};

//HORIZONTAL IMAGES DOWN ANIMATE
async function horizontalImagesDownAnim() {
  imagesSlide[imageClicked].classList.toggle("imageHide");

  let leftSide = imageClicked;
  let rightSide = imagesArr.length - imageClicked - 1;
  let largestSide = Math.max(leftSide, rightSide);

  for (let i = 1; i <= largestSide; i++) {
    if (leftSide > 0) {
      imagesSlide[imageClicked - i].classList.toggle("imageDown");
      leftSide--;
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
    if (rightSide > 0) {
      imagesSlide[imageClicked + i].classList.toggle("imageDown");
      rightSide--;
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
  }

  imagesSlide[imageClicked].classList.toggle("imageHide");
  imagesSlide[imageClicked].classList.toggle("imageDown");
}
//TRACK ANIMATION TO DOWN
const trackAnimtaion = () => {
  track.animate(
    {
      gap: "4vmin"
    },
    {
      duration: 800,
      easing: "ease-out",
      fill: "forwards"
    }
  );

  horizontalImagesAnimation(imageClicked * -12.645);
  track.dataset.prevPercentage = track.dataset.percentage;
};

//HORIZONTAL IMAGES UP ANIMATE
async function horizontalImagesUpAnim() {
  imagesSlide[imageClicked].classList.toggle("imageStoreHide");
  for (let i = 0; i < imagesArr.length; i++) {
    imagesSlide[i].classList.toggle("imageDown");
    await new Promise((resolve) => setTimeout(resolve, 40));
  }

  await new Promise((resolve) => setTimeout(resolve, 700));

  imagesSlide[imageClicked].classList.toggle("imageStoreHide");
}

//FULLCSREEN IMAGE CHANGE TO LEFT
async function toLeft(i) {
  imageClicked -= 1;
  if (i) imageClicked = i;
  left.src = `${imagesSlide[imageClicked].src}`;

  left.animate(
    {
      left: "0%"
    },
    {
      duration: 800,
      easing: "ease-out",
      fill: "forwards"
    }
  );
  //
  aimsSide.forEach((e) => e.classList.add("rotateCounterClockwise"));
  /*change photo count*/
  horizontalImagesCounter(-12.645 * imageClicked);

  //
  fullScreenImagesHeadline.classList.remove("imagesHeadlineShow");
  fullScreenImagesHeadline.classList.add("imagesHeadlineChange");
  await new Promise((resolve) => setTimeout(resolve, 400));
  fullScreenImagesHeadline.innerHTML = `${headlines[imageClicked]}`;
  await new Promise((resolve) => setTimeout(resolve, 400));

  central.src = `${left.src}`;
  left.animate(
    {
      left: "-120%"
    },
    {
      duration: 0,
      fill: "forwards"
    }
  );

  fullScreenImagesHeadline.classList.remove("imagesHeadlineChange");
  aimsSide.forEach((e) => e.classList.remove("rotateCounterClockwise"));
}

//FULLCSREEN IMAGE CHANGE TO RIGHT
async function toRight(i) {
  /*rotate crosses, change text and photo count*/

  imageClicked += 1;
  if (i) imageClicked = i;
  right.src = `${imagesSlide[imageClicked].src}`;
  right.animate(
    {
      left: "0%"
    },
    {
      duration: 800,
      easing: "ease-out",
      fill: "forwards"
    }
  );
  //
  aimsSide.forEach((e) => e.classList.add("rotateClockwise"));
  /*change photo count*/
  horizontalImagesCounter(-12.645 * imageClicked);
  //
  fullScreenImagesHeadline.classList.remove("imagesHeadlineShow");
  fullScreenImagesHeadline.classList.add("imagesHeadlineChange");
  await new Promise((resolve) => setTimeout(resolve, 400));
  fullScreenImagesHeadline.innerHTML = `${headlines[imageClicked]}`;
  await new Promise((resolve) => setTimeout(resolve, 400));

  //
  central.src = `${right.src}`;
  right.animate(
    {
      left: "120%"
    },
    {
      duration: 0,
      fill: "forwards"
    }
  );

  fullScreenImagesHeadline.classList.remove("imagesHeadlineChange");
  aimsSide.forEach((e) => e.classList.remove("rotateClockwise"));
}

//IMAGE TO FULLSCREEN ANIMATION
const imageToFullScreen = (imageClicked) => {
  central.src = `${imagesSlide[imageClicked].src}`;
  central.animate(
    {
      left: `${imagesSlide[imageClicked].getBoundingClientRect().x}px`,
      top: `${imagesSlide[imageClicked].getBoundingClientRect().y}px`
    },
    {
      duration: 0,
      fill: "forwards"
    }
  );
  fullScreenImagesDiv.style.opacity = 1;

  central.animate(
    {
      left: "0",
      height: "100vmin",
      top: "0",
      objectPosition: "0% center",
      width: "100vw"
    },
    {
      duration: 800,
      easing: "ease-out",
      fill: "forwards"
    }
  );
};

//IMAGE TO FULLSCREEN CLOSE ANIMATION
async function imageToFullScreenClose() {
  central.animate(
    {
      left: "calc(50% - 20vmin)",
      height: "56vmin",
      top: "22vh",
      objectPosition: `${100 + imageClicked * -12.645}% center`,
      width: "40vmin"
    },
    {
      duration: 1100,
      easing: "ease",
      fill: "forwards"
    }
  );
  await new Promise((resolve) => setTimeout(resolve, 1110));
  fullScreenImagesDiv.style.opacity = 0;

  ImageFullScreenClose = true;
  ImageFullScreen = false;
}

//HORIZONTAL IMAGES SLIDE AND COUNTER MATH AND ANIMATONS
const horizontalImagesMathWHeel = (e) => {
  const maxDelta = window.innerWidth / 2;
  const percentage = (e.deltaY / maxDelta) * -37;
  const nextPercentageUnconstrained =
    parseFloat(track.dataset.prevPercentage) + percentage;
  const nextPercentage = Math.max(
    Math.min(nextPercentageUnconstrained, 0),
    -100
  );

  horizontalImagesAnimation(nextPercentage);
  track.dataset.prevPercentage = track.dataset.percentage;
};
const horizontalImagesMath = (e) => {
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth / 2;
  const percentage = (mouseDelta / maxDelta / 2) * -100;
  const nextPercentageUnconstrained =
    parseFloat(track.dataset.prevPercentage) + percentage;
  const nextPercentage = Math.max(
    Math.min(nextPercentageUnconstrained, 0),
    -100
  );

  horizontalImagesAnimation(nextPercentage);
};
const horizontalImagesAnimation = (nextPercentage) => {
  track.dataset.percentage = nextPercentage;

  if (track.dataset.percentage < -88.5) {
    track.dataset.percentage = -88.5;
    track.animate(
      {
        transform: `translate(${Number(track.dataset.percentage)}%, -50%)`
      },
      {
        duration: 800,
        easing: "ease-out",
        fill: "forwards"
      }
    );
  } else {
    track.animate(
      {
        transform: `translate(${Number(track.dataset.percentage)}%, -50%)`
      },
      {
        duration: 800,
        easing: "ease-out",
        fill: "forwards"
      }
    );
  }

  for (const image of track.getElementsByClassName("image")) {
    image.style.objectPosition = `${100 + nextPercentage}% center`;
  }
  central.style.objectPosition = `${100 + nextPercentage}% center`;
  horizontalImagesCounter(Number(track.dataset.percentage));
};
const horizontalImagesCounter = (nextPercentage) => {
  if (nextPercentage > -18) {
    if (nextPercentage <= -6.325) {
      currentImagesNumber.style.transform = "translate(0, -1.2em)";
    }
    if (nextPercentage > -6.325) {
      currentImagesNumber.style.transform = "translate(0, 0)";
    }
  } else {
    counter = Math.floor((nextPercentage + 6.325) / -12.645 + 1);

    if (currentImageNumber < counter) {
      currentImagesNumber.style.transform = `translate(0, ${-counter * 1.2}em)`;
      currentImageNumber = counter;
    }
    if (currentImageNumber > counter) {
      currentImagesNumber.style.transform = `translate(0, ${
        -(currentImageNumber - 1) * 1.2
      }em)`;
      currentImageNumber = counter;
    }
  }
};
const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX);
const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};
window.onmousedown = (e) => handleOnDown(e);
window.ontouchstart = (e) => handleOnDown(e.touches[0]);
window.onmouseup = (e) => handleOnUp(e);
window.ontouchend = (e) => handleOnUp(e.touches[0]);
window.onmousemove = (e) => handleOnMove(e);
window.ontouchmove = (e) => handleOnMove(e.touches[0]);

//OPEN STORY CONTAINER.
const openStoryContainer = () => {
  //block X-axis move function
  if (isStoryOpen) return;
  isStoryOpen = true;
  aimsSide.forEach((e) => (e.style.opacity = "0"));

  storyImagesDiv.innerHTML = `
  <div id="storyImagesContainer">
     <span id=headerStoryImageSpan>
    <img id="headerStoryImage" draggable="false" />
  </span>
    <span id="backSpan">
      <p id="back">Назад</p>
    </span>
    <div id="storyDiv">
      <p id="storyHeader"></p>
      <p id="storyText"></p>
    </div>
    
    <div id="storyImagesStickyDiv">
    <div id="scrollImages">
      <div id="borderscroll">
      </div>
      </div>
   
    <div id="storyImagesTransform">
    
    </div>
       
    <div id="nextStoryImageDiv">
      
    </div>
  </div>

  <span id="scrollbarTrack">
    <span id="scrollbarThumb"></span>
  </span>`;

  const headerStoryImage = document.getElementById("headerStoryImage");
  const headerStoryImageSpan = document.getElementById("headerStoryImageSpan");

  const storyHeader = document.getElementById("storyHeader");
  const storyText = document.getElementById("storyText");
  const back = document.getElementById("back");

  //show header, story and image for them
  storyHeader.innerHTML = `${storyHeadlines[imageClicked]}`;
  storyText.innerHTML = `${storiesText[imageClicked]}`;
  headerStoryImage.src = `${storyImagesFullscreen[imageClicked]}`;

  storyText.classList.add("showStory");
  headerStoryImageSpan.classList.add("headerStoryImageSpan");
  back.classList.add("backShow");
  storyHeader.classList.add("storyHeaderShow");

  replaceImages();

  replaceCounter();

  createStoryImages();

  scrollImagesAnimate();

  document.body.style.overflowY = "scroll";

  back.addEventListener("click", () => {
    return closeStory();
  });
};

//OPEN STORY CONTAINER. HIDE HORIZONTAL IMAGES
async function replaceImages() {
  central.classList.toggle("centralStoryHide");

  if (!isStoryOpen) {
    imagesSlide.forEach((e) => {
      e.classList.toggle("imageStoreHide");
    });
  }
  for (let i = 0; i < imagesArr.length; i++) {
    imagesSlide[i].classList.toggle("imageStoryDown");
    await new Promise((resolve) => setTimeout(resolve, 40));
  }
  if (isStoryOpen) {
    imagesSlide.forEach((e) => {
      e.classList.toggle("imageStoreHide");
    });
  }
}

//OPEN STORY CONTAINER. CREATE STORY IMAGES
const createStoryImages = () => {
  imagesForStory[imageClicked].forEach((e, i) => {
    let storyimages = document.createElement("img");
    storyimages.setAttribute("class", "storyImages ");

    storyimages.setAttribute("src", `${e}`);
    storyimages.setAttribute("draggable", false);
    storyImagesTransform.appendChild(storyimages);

    let smallstoryimages = document.createElement("img");
    smallstoryimages.setAttribute("class", "smallStoryImages");
    smallstoryimages.setAttribute("src", `${e}`);
    smallstoryimages.setAttribute("draggable", false);
    scrollImages.appendChild(smallstoryimages);
  });

  storyImagesTransform.style.transform = `translateY(${
    -4 - 10 * imagesForStory[imageClicked].length
  }vh)`;
  storyImagesStickyDiv.style.height = `${
    100 * imagesForStory[imageClicked].length
  }vh`;

  let nextStoryImage = document.createElement("img");
  nextStoryImage.setAttribute("id", "nextStoryImage");
  nextStoryImage.setAttribute("draggable", false);

  let nextStoryHeadline = document.createElement("h3");
  nextStoryHeadline.setAttribute("id", "nextStoryHeadline");

  if (imageClicked < imagesArr.length - 1) {
    nextStoryImage.setAttribute("src", `${imagesArr[imageClicked + 1]}`);
    nextStoryHeadline.innerHTML = `Следующая порода <span class="percentage">0%</span>`;
  } else if (imageClicked == imagesArr.length - 1) {
    nextStoryImage.setAttribute("src", `${imagesArr[0]}`);
    nextStoryHeadline.innerHTML = `Начнем сначала? <span class="percentage">0%</span>`;
  }
  nextStoryImageDiv.appendChild(nextStoryImage);
  nextStoryImageDiv.appendChild(nextStoryHeadline);
};

//OPEN STORY CONTAINER. REPLACE COUNTER
async function replaceCounter() {
  totalImagesNumber.classList.toggle("totalImagesNumberAnimation");
  totalImagesNumber.classList.toggle("totalImagesNumberAnimationBack");

  currentImagesNumber.classList.toggle("currentImagesNumber");
  currentImagesNumber.classList.toggle("currentImagesNumberBack");

  dash.classList.toggle("dash");
  dash.classList.toggle("dashBack");

  await new Promise((resolve) => setTimeout(resolve, 400));
  counterDiv.classList.toggle("counterDown");
  counterDiv.classList.toggle("counterUp");

  totalImagesNumber.classList.toggle("totalImagesNumberAnimation");
  totalImagesNumber.classList.toggle("totalImagesNumberAnimationBack");

  currentImagesNumber.classList.toggle("currentImagesNumber");
  currentImagesNumber.classList.toggle("currentImagesNumberBack");

  dash.classList.toggle("dash");
  dash.classList.toggle("dashBack");
}

//OPEN STORY CONTAINER. SCROLL IMAGES ANIMATION
const scrollImagesAnimate = (e) => {
  if (!isStoryOpen) return;

  storyImagesScroll();

  let scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  const scrollbarThumb = document.getElementById("scrollbarThumb");
  const scrollbarTrack = document.getElementById("scrollbarTrack");

  let percentageScroll = scrollTop / (scrollHeight - window.innerHeight);
  let bottomPercentageGap = (1 - window.innerHeight / scrollHeight) * 100;

  scrollbarThumb.animate(
    {
      height: `${percentageScroll * bottomPercentageGap}%`
    },
    {
      duration: 1100,
      easing: "ease-out",
      fill: "forwards"
    }
  );

  let scrollPercentage = Math.round(
    (scrollTop / (scrollHeight - window.innerHeight)) * 100
  );

  if (scrollPercentage <= 10) {
    headerStoryImage.animate(
      {
        transform: `translateY(${-40 + scrollPercentage}vh)`
      },
      {
        duration: 1000,
        easing: "ease-out",
        fill: "forwards"
      }
    );
  }

  const VHtoVW = window.innerWidth / window.innerHeight;
  const coefficient = (window.innerHeight / scrollHeight) * 10;
  console.log(scrollPercentage);

  console.log(bottomScroll, e);
  if (scrollPercentage == 100) {
    if (e) bottomScroll += e / 100;

    if (bottomScroll >= 0) {
      //console.log(bottomScroll)
      document.body.style.overflowY = "hidden";
      if (bottomScroll <= 9) {
        document.querySelector(".percentage").textContent = `${Math.round(
          bottomScroll * 10
        )}%`;
        nextStoryImage.animate(
          {
            height: `${56 + bottomScroll * 4.4}vh`,
            paddingBottom: `${44 - bottomScroll * 4.4}vh`,
            width: `${40 + bottomScroll * VHtoVW * 6}vh`
          },
          {
            duration: 600,
            easing: "ease",
            fill: "forwards"
          }
        );
        nextStoryHeadline.animate(
          {
            //marginTop: `${-50 + bottomScroll * 2.2}vh`
          },
          {
            duration: 600,
            easing: "ease",
            fill: "forwards"
          }
        );

        scrollbarThumb.animate(
          {
            height: `${bottomPercentageGap + coefficient * bottomScroll}%`
          },
          {
            duration: 600,
            easing: "ease",
            fill: "forwards"
          }
        );
      } else if (bottomScroll > 9) {
        document.querySelector(".percentage").textContent = "100%";
        nextStoryImage.animate(
          {
            height: "100vh",
            paddingBottom: "0vh",
            width: "100vw"
          },
          {
            duration: 1000,
            easing: "ease",
            fill: "forwards"
          }
        );
        nextStoryHeadline.animate(
          {
            //marginTop: "-72vh"
          },
          {
            duration: 2000,
            easing: "ease",
            fill: "forwards"
          }
        );

        scrollbarThumb.animate(
          {
            height: "1000%"
          },
          {
            duration: 2000,
            easing: "ease",
            fill: "forwards"
          }
        );

        scrollbarTrack.animate(
          {
            top: "100vh"
          },
          {
            duration: 2000,
            easing: "ease",
            fill: "forwards"
          }
        );
        nextStoryHeadline.animate(
          {
            opacity: "0"
          },
          {
            duration: 2000,
            easing: "ease",
            fill: "forwards"
          }
        );
        scrollPercentage = 0;
        return nextImage();
      }
    } else if (bottomScroll < 1) {
      bottomScroll = -1;
      document.querySelector(".percentage").textContent = "0%";
      document.body.style.overflowY = "scroll";
      nextStoryImage.animate(
        {
          height: "56vh",
          paddingBottom: "44vh",
          width: "40vh"
        },
        {
          duration: 200,
          easing: "ease",
          fill: "forwards"
        }
      );
      nextStoryHeadline.animate(
        {
          //marginTop: "-50vh"
        },
        {
          duration: 200,
          easing: "ease",
          fill: "forwards"
        }
      );
    }
  }
};

//OPEN STORY CONTAINER. SCROLL ANIMATION
const storyImagesScroll = () => {
  const storyImages = document.querySelectorAll(".storyImages");
  let firstStoryImage = storyImages[0].getBoundingClientRect().y;
  let lastStoryImage = storyImages[
    imagesForStory[imageClicked].length - 1
  ].getBoundingClientRect().y;

  if (storyImages[0].getBoundingClientRect().y < window.innerHeight * 0.1) {
    if (lastStoryImage < 0) {
      borderscroll.animate(
        {
          transform: `translate(calc(93.5vw - 2.5vh), ${
            -0.5 + 10 * (imagesForStory[imageClicked].length - 1)
          }vh)`
        },
        {
          duration: 1100,
          easing: "ease-out",
          fill: "forwards"
        }
      );
    } else {
      let scrollCoef =
        -storyImages[0].getBoundingClientRect().y / window.innerHeight;
      borderscroll.animate(
        {
          transform: `translate(calc(93.5vw - 2.5vh), ${
            -0.5 + 10 * scrollCoef
          }vh)`
        },
        {
          duration: 1100,
          easing: "ease-out",
          fill: "forwards"
        }
      );
    }
  }
};

//CLOSE STORY CONTAINER
async function closeStory() {
  document.body.style.opacity = "0";

  await new Promise((resolve) => setTimeout(resolve, 500));
  //hide numbers

  bottomScroll = -1;
  isStoryOpen = false;

  //hide overflow
  document.body.style.overflowY = "hidden";
  //get back to top
  window.scrollTo(0, 0);

  //delete story images
  storyImagesDiv.innerHTML = "";
  //place number

  aimsSide.forEach((e) => (e.style.opacity = "1"));

  replaceImages();

  replaceCounter();

  document.body.style.opacity = "1";
}

//CLOSE STORY CONTAINER TO NEXT FULLSCREEN IMAGE
async function nextImage() {
  stopScroll = true;
  isStoryOpen = false;

  imageClicked++;
  if (imageClicked == imagesArr.length) {
    imageClicked = 0;
  }

  fullScreenImagesHeadline.innerHTML = `${headlines[imageClicked]}`;
  fullScreenImagesHeadline.classList.remove("imagesHeadlineShow");

  central.src = `${imagesSlide[imageClicked].src}`;
  horizontalImagesCounter(-12.645 * imageClicked);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  window.scrollTo(0, 0);
  //delete story images
  storyImagesDiv.innerHTML = "";

  aimsSide.forEach((e) => (e.style.opacity = "1"));
  fullScreenImagesHeadline.classList.add("imagesHeadlineShow");

  replaceImages();
  replaceCounter();
  //hide numbers

  await new Promise((resolve) => setTimeout(resolve, 900));

  bottomScroll = -1;
  stopScroll = false;
}
