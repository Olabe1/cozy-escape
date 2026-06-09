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

const plantChoice = document.getElementById("plant-choice");
const roomChoice = document.getElementById("room-choice");

const fireplaceChoice = document.getElementById("fireplace-choice");
const rainChoice = document.getElementById("rain-choice");
const cafeChoice = document.getElementById("cafe-choice");
const nightChoice = document.getElementById("night-choice");

const choiceSummary = document.getElementById("choice-summary");
const startFocusButton = document.getElementById("start-focus-btn");

const clearFocusButton = document.getElementById("clear-focus-btn");

const sessionPanel = document.getElementById("session-panel");
const sessionDetails = document.getElementById("session-details");

const timerDisplay = document.getElementById("timer-display");
const pauseTimerButton = document.getElementById("pause-timer-btn");
const resetTimerButton = document.getElementById("reset-timer-btn");

let soundOn = true;
let selectedProgress = "";
let selectedAtmosphere = "";
let focusDuration = 25 * 60;
let timeLeft = focusDuration;
let timerInterval = null;
let timerRunning = false;

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

function selectProgressStyle(selectedCard, progressType) {
  plantChoice.classList.remove("selected");
  roomChoice.classList.remove("selected");

  selectedCard.classList.add("selected");
  selectedProgress = progressType;

  console.log("Selected progress:", selectedProgress);
  updateChoiceSummary();
}

function selectAtmosphere(selectedCard, atmosphereType) {
  fireplaceChoice.classList.remove("selected");
  rainChoice.classList.remove("selected");
  cafeChoice.classList.remove("selected");
  nightChoice.classList.remove("selected");

  selectedCard.classList.add("selected");
  selectedAtmosphere = atmosphereType;

  console.log("Selected atmosphere:", selectedAtmosphere);
  updateChoiceSummary();
}

function updateChoiceSummary() {
  if (selectedProgress === "" && selectedAtmosphere === "") {
    choiceSummary.textContent = "Choose a progress style and atmosphere to begin.";
  } else if (selectedProgress === "") {
    choiceSummary.textContent = `Atmosphere selected: ${selectedAtmosphere}. Now choose a progress style.`;
  } else if (selectedAtmosphere === "") {
    choiceSummary.textContent = `Progress selected: ${selectedProgress}. Now choose an atmosphere.`;
  } else {
    choiceSummary.textContent = `Ready: ${selectedProgress} mode with ${selectedAtmosphere} atmosphere.`;
  }
}

plantChoice.addEventListener("click", function () {
  selectProgressStyle(plantChoice, "plant");
});

roomChoice.addEventListener("click", function () {
  selectProgressStyle(roomChoice, "room");
});

fireplaceChoice.addEventListener("click", function () {
  selectAtmosphere(fireplaceChoice, "fireplace");
});

rainChoice.addEventListener("click", function () {
  selectAtmosphere(rainChoice, "rain");
});

cafeChoice.addEventListener("click", function () {
  selectAtmosphere(cafeChoice, "cafe");
});

nightChoice.addEventListener("click", function () {
  selectAtmosphere(nightChoice, "night");
});

function clearFocusChoices() {
  selectedProgress = "";
  selectedAtmosphere = "";

  plantChoice.classList.remove("selected");
  roomChoice.classList.remove("selected");

  fireplaceChoice.classList.remove("selected");
  rainChoice.classList.remove("selected");
  cafeChoice.classList.remove("selected");
  nightChoice.classList.remove("selected");

  updateChoiceSummary();

  console.log("Focus choices cleared");
}

clearFocusButton.addEventListener("click", function () {
  clearFocusChoices();
});

function startFocusSession() {
  if (selectedProgress === "" || selectedAtmosphere === "") {
    choiceSummary.textContent = "Please choose both a progress style and an atmosphere first.";
    return;
  }

  sessionPanel.style.display = "block";

  sessionDetails.textContent =
    `Mode: ${selectedProgress} | Atmosphere: ${selectedAtmosphere}`;

  resetTimer();
  startTimer();

  console.log("Focus session started");
}

startFocusButton.addEventListener("click", function () {
  startFocusSession();
});

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

function startTimer() {
  if (timerRunning) {
    return;
  }

  timerRunning = true;
  pauseTimerButton.textContent = "Pause";

  timerInterval = setInterval(function () {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      timerRunning = false;

      timerDisplay.textContent = "Done!";
      sessionDetails.textContent = "Great job! You completed your focus session 🌿";
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerRunning = false;
  pauseTimerButton.textContent = "Resume";
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerRunning = false;

  timeLeft = focusDuration;
  updateTimerDisplay();

  pauseTimerButton.textContent = "Pause";
}

pauseTimerButton.addEventListener("click", function () {
  if (timerRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
});

resetTimerButton.addEventListener("click", function () {
  resetTimer();
});