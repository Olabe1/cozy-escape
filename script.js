const peacefulButton = document.getElementById("peaceful-btn");
const tiredButton = document.getElementById("tired-btn");
const stressedButton = document.getElementById("stressed-btn");
const dreamyButton = document.getElementById("dreamy-btn");
const hungryButton = document.getElementById("hungry-btn");
const backButton = document.getElementById("back-btn");

const quote = document.getElementById("quote");
const scene = document.getElementById("scene");
const moodButtons = document.querySelector(".mood-buttons");

const titleSmall = document.getElementById("title-small");
const mainTitle = document.getElementById("main-title");
const introText = document.getElementById("intro-text");
const hero = document.querySelector(".hero");

const audioPlayer = document.getElementById("audio-player");
const soundButton = document.getElementById("sound-btn");

const moodLink = document.getElementById("mood-link");
const focusLink = document.getElementById("focus-link");
const aboutLink = document.getElementById("about-link");

const moodPage = document.getElementById("mood-page");
const focusPage = document.getElementById("focus-page");
const aboutPage = document.getElementById("about-page");

let soundOn = true;

scene.style.display = "none";
backButton.style.display = "none";
soundButton.style.display = "none";

function showMood(quoteText, imagePath, backgroundColor, soundPath) {
  quote.textContent = quoteText;

  hero.classList.remove("active");

  setTimeout(function () {
    hero.classList.add("active");
  }, 10);

  titleSmall.style.display = "none";
  mainTitle.style.display = "none";
  introText.style.display = "none";

  scene.style.display = "block";
  scene.style.backgroundImage = `url("${imagePath}")`;
  scene.style.backgroundSize = "cover";
  scene.style.backgroundPosition = "center";

  moodButtons.style.display = "none";
  backButton.style.display = "inline-block";
  soundButton.style.display = "inline-block";

  document.body.style.background = backgroundColor;

  audioPlayer.src = soundPath;

  if (soundOn) {
    audioPlayer.play();
  }
}

function resetMoodView() {
  scene.style.display = "none";
  backButton.style.display = "none";
  soundButton.style.display = "none";
  moodButtons.style.display = "block";

  titleSmall.style.display = "block";
  mainTitle.style.display = "block";
  introText.style.display = "block";

  hero.classList.remove("active");

  quote.textContent = "Welcome to your cozy escape 🌿";

  audioPlayer.pause();
  audioPlayer.currentTime = 0;

  document.body.style.background =
    "linear-gradient(135deg, #3B7597, #6FD1D7)";
}

function showPage(pageToShow) {
  moodPage.classList.remove("active-page");
  focusPage.classList.remove("active-page");
  aboutPage.classList.remove("active-page");

  pageToShow.classList.add("active-page");
}

peacefulButton.addEventListener("click", function () {
  showMood(
    "The trees are whispering softly in the rain 🍃",
    "images/peaceful.jpeg",
    "linear-gradient(135deg, #7FA36B, #C9DDB3)",
    "sounds/peaceful.mp3"
  );
});

tiredButton.addEventListener("click", function () {
  showMood(
    "The rain is falling softly. Rest for a while ☕",
    "images/tired.jpeg",
    "linear-gradient(135deg, #FFD6A6, #FFF0BE)",
    "sounds/tired.mp3"
  );
});

stressedButton.addEventListener("click", function () {
  showMood(
    "Let the rain carry the heavy thoughts away 🌧️",
    "images/stressed.jpeg",
    "linear-gradient(135deg, #296374, #629FAD)",
    "sounds/stressed.mp3"
  );
});

dreamyButton.addEventListener("click", function () {
  showMood(
    "You are drifting through a dreamy little world 🌙",
    "images/dreamy.jpeg",
    "linear-gradient(135deg, #E6DEF7, #FDB5CE)",
    "sounds/dreamy.mp3"
  );
});

hungryButton.addEventListener("click", function () {
  showMood(
    "The smell of fresh bread drifts through the village bakery 🍞",
    "images/hungry.jpeg",
    "linear-gradient(135deg, #F6E0B8, #FFF7EA)",
    "sounds/hungry.mp3"
  );
});

backButton.addEventListener("click", function () {
  resetMoodView();
});

soundButton.addEventListener("click", function () {
  if (soundOn) {
    soundOn = false;
    audioPlayer.pause();
    soundButton.textContent = "🔇 Sound Off";
  } else {
    soundOn = true;
    audioPlayer.play();
    soundButton.textContent = "🔊 Sound On";
  }
});

moodLink.addEventListener("click", function () {
  resetMoodView();
  showPage(moodPage);
});

focusLink.addEventListener("click", function () {
  resetMoodView();
  showPage(focusPage);
});

aboutLink.addEventListener("click", function () {
  resetMoodView();
  showPage(aboutPage);
});