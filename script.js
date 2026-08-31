// ======================================================
// 1. MOOD ESCAPE ELEMENTS
// ======================================================

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


// ======================================================
// 2. AUDIO ELEMENTS
// ======================================================

const audioPlayer = document.getElementById("audio-player");
const focusAudioPlayer = document.getElementById("focus-audio-player");

const soundButton = document.getElementById("sound-btn");


// ======================================================
// 3. NAVIGATION
// ======================================================

const moodLink = document.getElementById("mood-link");
const focusLink = document.getElementById("focus-link");
const winsLink = document.getElementById("wins-link");
const aboutLink = document.getElementById("about-link");

const moodPage = document.getElementById("mood-page");
const focusPage = document.getElementById("focus-page");
const winsPage = document.getElementById("wins-page");
const aboutPage = document.getElementById("about-page");


// ======================================================
// 4. FOCUS GARDEN CHOICES
// ======================================================

const plantChoice = document.getElementById("plant-choice");
const roomChoice = document.getElementById("room-choice");

const fireplaceChoice = document.getElementById("fireplace-choice");
const rainChoice = document.getElementById("rain-choice");
const cafeChoice = document.getElementById("cafe-choice");
const nightChoice = document.getElementById("night-choice");

const choiceSummary = document.getElementById("choice-summary");


// ======================================================
// 5. BOBO
// ======================================================

const boboMessage = document.getElementById("bobo-message");


// ======================================================
// 6. PROGRESS WORLD
// ======================================================

const progressWorldVisual =
  document.getElementById("progress-world-visual");

const progressWorldText =
  document.getElementById("progress-world-text");

const resetProgressButton =
  document.getElementById("reset-progress-btn");


// ======================================================
// 7. FOCUS SESSION
// ======================================================

const startFocusButton =
  document.getElementById("start-focus-btn");

const clearFocusButton =
  document.getElementById("clear-focus-btn");

const sessionPanel =
  document.getElementById("session-panel");

const sessionTitle =
  document.getElementById("session-title");

const sessionMessage =
  document.getElementById("session-message");

const sessionDetails =
  document.getElementById("session-details");


// ======================================================
// 8. TIMER
// ======================================================

const timerDisplay =
  document.getElementById("timer-display");

const pauseTimerButton =
  document.getElementById("pause-timer-btn");

const resetTimerButton =
  document.getElementById("reset-timer-btn");

const endSessionButton =
  document.getElementById("end-session-btn");

const timeButtons =
  document.querySelectorAll(".time-btn");

const customMinutesInput =
  document.getElementById("custom-minutes");


// ======================================================
// 9. FOCUS PAGE SECTIONS
// ======================================================

const focusSetupSections =
  document.querySelectorAll(".focus-setup");

const focusIntroTexts =
  document.querySelectorAll(".focus-intro");


// ======================================================
// 10. COMPLETION + SMALL WINS
// ======================================================

const completionPanel =
  document.getElementById("completion-panel");

const achievementInput =
  document.getElementById("achievement-input");

const saveAchievementButton =
  document.getElementById("save-achievement-btn");

const winsList =
  document.getElementById("wins-list");


// ======================================================
// 11. STATS BOARD
// ======================================================

const totalSessionsStat =
  document.getElementById("total-sessions-stat");

const totalMinutesStat =
  document.getElementById("total-minutes-stat");

const plantLevelStat =
  document.getElementById("plant-level-stat");

const roomLevelStat =
  document.getElementById("room-level-stat");


// ======================================================
// 12. APP STATE
// ======================================================

let soundOn = true;

let selectedProgress = "";
let selectedAtmosphere = "";

let selectedMinutes = 25;

let focusDuration = selectedMinutes * 60;
let timeLeft = focusDuration;

let timerInterval = null;
let timerRunning = false;


// ======================================================
// 13. LOAD SAVED DATA FROM LOCAL STORAGE
// ======================================================

let savedWins =
  JSON.parse(localStorage.getItem("cozyEscapeWins")) || [];

let plantLevel =
  Number(localStorage.getItem("cozyEscapePlantLevel")) || 0;

let roomLevel =
  Number(localStorage.getItem("cozyEscapeRoomLevel")) || 0;


// ======================================================
// 14. INITIAL PAGE STATE
// ======================================================

scene.style.display = "none";
backButton.style.display = "none";
soundButton.style.display = "none";


// ======================================================
// 15. GENERAL HELPER FUNCTIONS
// ======================================================

function stopMoodSound() {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
}

function stopFocusSound() {
  focusAudioPlayer.pause();
  focusAudioPlayer.currentTime = 0;
}

function resetBodyBackground() {
  document.body.style.background =
    "linear-gradient(135deg, #3B7597, #6FD1D7)";
}

function resetBoboMessage() {
  boboMessage.textContent =
    "Hi, I’m Bobo. I’ll stay with you for a little while.";
}

function resetFocusWorld() {
  stopFocusSound();

  sessionPanel.classList.remove(
    "fireplace-theme",
    "rain-theme",
    "cafe-theme",
    "night-theme"
  );

  sessionTitle.textContent =
    "Your focus session is ready!";

  sessionMessage.textContent =
    "Choose your atmosphere and begin gently.";

  resetBodyBackground();
}


// ======================================================
// 16. PAGE NAVIGATION
// ======================================================

function showPage(pageToShow) {
  moodPage.classList.remove("active-page");
  focusPage.classList.remove("active-page");
  winsPage.classList.remove("active-page");
  aboutPage.classList.remove("active-page");

  pageToShow.classList.add("active-page");
}


// ======================================================
// 17. MOOD ESCAPE
// ======================================================

function showMood(
  quoteText,
  imagePath,
  backgroundColor,
  soundPath
) {
  stopFocusSound();

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

  quote.textContent =
    "Welcome to your cozy escape 🌿";

  stopMoodSound();
  resetBodyBackground();
}


// ======================================================
// 18. MOOD BUTTON EVENTS
// ======================================================

peacefulButton.addEventListener("click", function () {
  showMood(
    "The trees are whispering softly in the rain",
    "images/peaceful.jpeg",
    "linear-gradient(135deg, #7FA36B, #C9DDB3)",
    "sounds/peaceful.mp3"
  );
});

tiredButton.addEventListener("click", function () {
  showMood(
    "The rain is falling softly. Rest for a while",
    "images/tired.jpeg",
    "linear-gradient(135deg, #FFD6A6, #FFF0BE)",
    "sounds/tired.mp3"
  );
});

stressedButton.addEventListener("click", function () {
  showMood(
    "Let the rain carry the heavy thoughts away",
    "images/stressed.jpeg",
    "linear-gradient(135deg, #296374, #629FAD)",
    "sounds/stressed.mp3"
  );
});

dreamyButton.addEventListener("click", function () {
  showMood(
    "You are drifting through a dreamy little world",
    "images/dreamy.jpeg",
    "linear-gradient(135deg, #E6DEF7, #FDB5CE)",
    "sounds/dreamy.mp3"
  );
});

hungryButton.addEventListener("click", function () {
  showMood(
    "The smell of fresh bread drifts through the village bakery",
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

    soundButton.textContent =
      "🔇 Sound Off";
  } else {
    soundOn = true;

    audioPlayer.play();

    soundButton.textContent =
      "🔊 Sound On";
  }
});


// ======================================================
// 19. NAVIGATION BUTTON EVENTS
// ======================================================

moodLink.addEventListener("click", function () {
  endFocusSession();

  resetMoodView();

  showPage(moodPage);
});

focusLink.addEventListener("click", function () {
  endFocusSession();

  resetMoodView();

  renderProgressWorld();

  showPage(focusPage);
});

winsLink.addEventListener("click", function () {
  endFocusSession();

  resetMoodView();

  renderSavedWins();
  renderStats();

  showPage(winsPage);
});

aboutLink.addEventListener("click", function () {
  endFocusSession();

  resetMoodView();

  showPage(aboutPage);
});


// ======================================================
// 20. SELECT PROGRESS STYLE
// ======================================================

function selectProgressStyle(
  selectedCard,
  progressType
) {
  plantChoice.classList.remove("selected");
  roomChoice.classList.remove("selected");

  selectedCard.classList.add("selected");

  selectedProgress = progressType;

  updateChoiceSummary();

  renderProgressWorld();
}

plantChoice.addEventListener("click", function () {
  selectProgressStyle(
    plantChoice,
    "plant"
  );
});

roomChoice.addEventListener("click", function () {
  selectProgressStyle(
    roomChoice,
    "room"
  );
});


// ======================================================
// 21. SELECT ATMOSPHERE
// ======================================================

function selectAtmosphere(
  selectedCard,
  atmosphereType
) {
  fireplaceChoice.classList.remove("selected");
  rainChoice.classList.remove("selected");
  cafeChoice.classList.remove("selected");
  nightChoice.classList.remove("selected");

  selectedCard.classList.add("selected");

  selectedAtmosphere = atmosphereType;

  updateChoiceSummary();
}

fireplaceChoice.addEventListener("click", function () {
  selectAtmosphere(
    fireplaceChoice,
    "fireplace"
  );
});

rainChoice.addEventListener("click", function () {
  selectAtmosphere(
    rainChoice,
    "rain"
  );
});

cafeChoice.addEventListener("click", function () {
  selectAtmosphere(
    cafeChoice,
    "cafe"
  );
});

nightChoice.addEventListener("click", function () {
  selectAtmosphere(
    nightChoice,
    "night"
  );
});


// ======================================================
// 22. UPDATE CHOICE SUMMARY
// ======================================================

function updateChoiceSummary() {
  if (
    selectedProgress === "" &&
    selectedAtmosphere === ""
  ) {
    choiceSummary.textContent =
      "Choose a progress style and atmosphere to begin.";
  }

  else if (selectedProgress === "") {
    choiceSummary.textContent =
      `Atmosphere selected: ${selectedAtmosphere}. Now choose a progress style.`;
  }

  else if (selectedAtmosphere === "") {
    choiceSummary.textContent =
      `Progress selected: ${selectedProgress}. Now choose an atmosphere.`;
  }

  else {
    choiceSummary.textContent =
      `Ready: ${selectedProgress} mode with ${selectedAtmosphere} atmosphere.`;
  }
}


// ======================================================
// 23. CLEAR FOCUS CHOICES
// ======================================================

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

  renderProgressWorld();

  resetBoboMessage();
}

clearFocusButton.addEventListener("click", function () {
  clearFocusChoices();
});


// ======================================================
// 24. ATMOSPHERE VISUAL WORLD
// ======================================================

function applyAtmosphereWorld() {
  sessionPanel.classList.remove(
    "fireplace-theme",
    "rain-theme",
    "cafe-theme",
    "night-theme"
  );

  if (selectedAtmosphere === "fireplace") {
    sessionPanel.classList.add(
      "fireplace-theme"
    );

    sessionTitle.textContent =
      "🔥 Fireplace Focus";

    sessionMessage.textContent =
      "Stay warm. One small task at a time.";

    document.body.style.background =
      "linear-gradient(135deg, #7a3f2a, #f4b76b)";
  }

  if (selectedAtmosphere === "rain") {
    sessionPanel.classList.add(
      "rain-theme"
    );

    sessionTitle.textContent =
      "🌧️ Rain Window Focus";

    sessionMessage.textContent =
      "Let the rain carry distractions away.";

    document.body.style.background =
      "linear-gradient(135deg, #2f5f73, #8fc7d4)";
  }

  if (selectedAtmosphere === "cafe") {
    sessionPanel.classList.add(
      "cafe-theme"
    );

    sessionTitle.textContent =
      "☕ Cafe Focus";

    sessionMessage.textContent =
      "Slow work is still progress.";

    document.body.style.background =
      "linear-gradient(135deg, #6b4a35, #d6b08a)";
  }

  if (selectedAtmosphere === "night") {
    sessionPanel.classList.add(
      "night-theme"
    );

    sessionTitle.textContent =
      "🌙 Night Study Focus";

    sessionMessage.textContent =
      "Quiet night. Deep focus. No rush.";

    document.body.style.background =
      "linear-gradient(135deg, #252b4a, #7b6fa6)";
  }
}


// ======================================================
// 25. ATMOSPHERE SOUND
// ======================================================

function playFocusAtmosphereSound() {
  stopMoodSound();
  stopFocusSound();

  if (selectedAtmosphere === "fireplace") {
    focusAudioPlayer.src =
      "sounds/fireplace.mp3";
  }

  if (selectedAtmosphere === "rain") {
    focusAudioPlayer.src =
      "sounds/rain-focus.mp3";
  }

  if (selectedAtmosphere === "cafe") {
    focusAudioPlayer.src =
      "sounds/cafe.mp3";
  }

  if (selectedAtmosphere === "night") {
    focusAudioPlayer.src =
      "sounds/night.mp3";
  }

  focusAudioPlayer.volume = 0.45;

  focusAudioPlayer.play();
}


// ======================================================
// 26. PROGRESS WORLD
// ======================================================

function renderProgressWorld() {
  const plantStages = [
    "🌰",
    "🌱",
    "🌿",
    "🪴",
    "🌸",
    "🌳"
  ];

  const roomItems = [
    "",
    "🕯️",
    "🕯️ 🪴",
    "🕯️ 🪴 📚",
    "🕯️ 🪴 📚 🧸",
    "🕯️ 🪴 📚 🧸 🛋️",
    "🕯️ 🪴 📚 🧸 🛋️ 🪟"
  ];

  if (selectedProgress === "plant") {
    const safePlantLevel =
      Math.min(
        plantLevel,
        plantStages.length - 1
      );

    progressWorldVisual.textContent =
      plantStages[safePlantLevel];

    progressWorldText.textContent =
      `Your plant has grown through ${plantLevel} focus session(s). Keep growing gently.`;

    resetProgressButton.style.display =
      "inline-block";

    resetProgressButton.textContent =
      "Start plant over";
  }

  else if (selectedProgress === "room") {
    const safeRoomLevel =
      Math.min(
        roomLevel,
        roomItems.length - 1
      );

    progressWorldVisual.textContent =
      roomItems[safeRoomLevel] || "🏡";

    progressWorldText.textContent =
      `Your cozy room has grown through ${roomLevel} focus session(s). Keep building your soft space.`;

    resetProgressButton.style.display =
      "inline-block";

    resetProgressButton.textContent =
      "Start room over";
  }

  else {
    progressWorldVisual.textContent =
      "🌰";

    progressWorldText.textContent =
      "Complete focus sessions to grow your plant or build your cozy room.";

    resetProgressButton.style.display =
      "none";
  }
}


// ======================================================
// 27. RESET SELECTED PROGRESS
// ======================================================

function resetSelectedProgress() {
  if (selectedProgress === "plant") {
    const confirmReset =
      confirm("Start your plant over? Your Small Wins will stay saved.");

    if (!confirmReset) {
      return;
    }

    plantLevel = 0;

    localStorage.setItem(
      "cozyEscapePlantLevel",
      plantLevel
    );

    boboMessage.textContent =
      "Your plant is ready for a fresh start.";
  }

  else if (selectedProgress === "room") {
    const confirmReset =
      confirm("Start your cozy room over? Your Small Wins will stay saved.");

    if (!confirmReset) {
      return;
    }

    roomLevel = 0;

    localStorage.setItem(
      "cozyEscapeRoomLevel",
      roomLevel
    );

    boboMessage.textContent =
      "Your cozy room is ready for a fresh start.";
  }

  else {
    boboMessage.textContent =
      "Choose Plant or Cozy Room first, then I can help you start over.";

    return;
  }

  renderProgressWorld();
  renderStats();
}

resetProgressButton.addEventListener(
  "click",
  function () {
    resetSelectedProgress();
  }
);


// ======================================================
// 28. START FOCUS SESSION
// ======================================================

function startFocusSession() {
  if (
    selectedProgress === "" ||
    selectedAtmosphere === ""
  ) {
    choiceSummary.textContent =
      "Please choose both a progress style and an atmosphere first.";

    boboMessage.textContent =
      "Choose your little world first. I’ll wait right here.";

    return;
  }

  focusSetupSections.forEach(
    function (section) {
      section.style.display = "none";
    }
  );

  focusIntroTexts.forEach(
    function (text) {
      text.style.display = "none";
    }
  );

  completionPanel.style.display = "none";
  sessionPanel.style.display = "block";

  applyAtmosphereWorld();

  playFocusAtmosphereSound();

  boboMessage.textContent =
    "I’ll sit here quietly while you focus.";

  sessionDetails.textContent =
    `Mode: ${selectedProgress} | Atmosphere: ${selectedAtmosphere} | Time: ${selectedMinutes} min`;

  resetTimer();

  startTimer();
}

startFocusButton.addEventListener(
  "click",
  function () {
    startFocusSession();
  }
);


// ======================================================
// 29. TIMER DISPLAY
// ======================================================

function updateTimerDisplay() {
  const minutes =
    Math.floor(timeLeft / 60);

  const seconds =
    timeLeft % 60;

  const formattedMinutes =
    String(minutes).padStart(2, "0");

  const formattedSeconds =
    String(seconds).padStart(2, "0");

  timerDisplay.textContent =
    `${formattedMinutes}:${formattedSeconds}`;
}


// ======================================================
// 30. START TIMER
// ======================================================

function startTimer() {
  if (timerRunning) {
    return;
  }

  timerRunning = true;

  pauseTimerButton.textContent =
    "Pause";

  timerInterval = setInterval(
    function () {
      timeLeft--;

      updateTimerDisplay();

      if (timeLeft <= 0) {
        clearInterval(timerInterval);

        timerInterval = null;

        timerRunning = false;

        timerDisplay.textContent =
          "Done!";

        sessionDetails.textContent =
          "Great job! You completed your focus session :)";

        boboMessage.textContent =
          "You did it. I’m proud of you for getting this far.";

        stopFocusSound();

        sessionPanel.style.display =
          "none";

        completionPanel.style.display =
          "block";
      }
    },
    1000
  );
}


// ======================================================
// 31. PAUSE TIMER
// ======================================================

function pauseTimer() {
  clearInterval(timerInterval);

  timerInterval = null;

  timerRunning = false;

  pauseTimerButton.textContent =
    "Resume";

  boboMessage.textContent =
    "Paused for a moment. That’s okay, we can continue gently.";
}

pauseTimerButton.addEventListener(
  "click",
  function () {
    if (timerRunning) {
      pauseTimer();
    }

    else {
      boboMessage.textContent =
        "Welcome back. Let’s continue softly.";

      startTimer();
    }
  }
);


// ======================================================
// 32. RESET TIMER
// ======================================================

function resetTimer(
  shouldStartAgain = false
) {
  clearInterval(timerInterval);

  timerInterval = null;

  timerRunning = false;

  focusDuration =
    selectedMinutes * 60;

  timeLeft =
    focusDuration;

  updateTimerDisplay();

  pauseTimerButton.textContent =
    "Pause";

  if (shouldStartAgain) {
    boboMessage.textContent =
      "Fresh start. I’m still here with you.";

    startTimer();
  }
}

resetTimerButton.addEventListener(
  "click",
  function () {
    resetTimer(true);
  }
);


// ======================================================
// 33. END FOCUS SESSION
// ======================================================

function endFocusSession() {
  clearInterval(timerInterval);

  timerInterval = null;

  timerRunning = false;

  stopFocusSound();

  sessionPanel.style.display =
    "none";

  completionPanel.style.display =
    "none";

  focusSetupSections.forEach(
    function (section) {
      section.style.display = "block";
    }
  );

  focusIntroTexts.forEach(
    function (text) {
      text.style.display = "block";
    }
  );

  resetTimer();

  resetFocusWorld();

  resetBoboMessage();
}

endSessionButton.addEventListener(
  "click",
  function () {
    endFocusSession();
  }
);


// ======================================================
// 34. SELECT FOCUS TIME
// ======================================================

function selectFocusTime(
  minutes,
  selectedButton
) {
  selectedMinutes = minutes;

  focusDuration =
    selectedMinutes * 60;

  timeLeft =
    focusDuration;

  timeButtons.forEach(
    function (button) {
      button.classList.remove("selected");
    }
  );

  if (selectedButton) {
    selectedButton.classList.add(
      "selected"
    );
  }

  customMinutesInput.value = "";

  updateTimerDisplay();
}

timeButtons.forEach(function (button) {
  button.addEventListener(
    "click",
    function () {
      const minutes =
        Number(button.dataset.minutes);

      selectFocusTime(
        minutes,
        button
      );
    }
  );
});


// ======================================================
// 35. CUSTOM FOCUS TIME
// ======================================================

customMinutesInput.addEventListener(
  "input",
  function () {
    const customMinutes =
      Number(customMinutesInput.value);

    if (
      customMinutes > 0 &&
      customMinutes <= 180
    ) {
      selectedMinutes =
        customMinutes;

      focusDuration =
        selectedMinutes * 60;

      timeLeft =
        focusDuration;

      timeButtons.forEach(
        function (button) {
          button.classList.remove(
            "selected"
          );
        }
      );

      updateTimerDisplay();
    }
  }
);


// ======================================================
// 36. SAVE SMALL WIN
// ======================================================

saveAchievementButton.addEventListener(
  "click",
  function () {
    const achievementText =
      achievementInput.value.trim();

    if (achievementText === "") {
      alert(
        "Please write one small win first."
      );

      boboMessage.textContent =
        "Even one tiny sentence is enough. What did you give time to?";

      return;
    }

    const newWin = {
      text: achievementText,
      minutes: selectedMinutes,
      date: new Date().toLocaleDateString()
    };

    savedWins.unshift(newWin);

    localStorage.setItem(
      "cozyEscapeWins",
      JSON.stringify(savedWins)
    );

    if (selectedProgress === "plant") {
      plantLevel++;

      localStorage.setItem(
        "cozyEscapePlantLevel",
        plantLevel
      );
    }

    if (selectedProgress === "room") {
      roomLevel++;

      localStorage.setItem(
        "cozyEscapeRoomLevel",
        roomLevel
      );
    }

    renderSavedWins();
    renderProgressWorld();
    renderStats();

    boboMessage.textContent =
      "Let’s keep this little win safe.";

    achievementInput.value = "";

    completionPanel.style.display =
      "none";

    focusSetupSections.forEach(
      function (section) {
        section.style.display = "block";
      }
    );

    focusIntroTexts.forEach(
      function (text) {
        text.style.display = "block";
      }
    );

    resetFocusWorld();

    showPage(winsPage);
  }
);


// ======================================================
// 37. RENDER STATS
// ======================================================

function renderStats() {
  const totalSessions = savedWins.length;

  let totalMinutes = 0;

  savedWins.forEach(function (win) {
    totalMinutes =
      totalMinutes + Number(win.minutes);
  });

  totalSessionsStat.textContent =
    totalSessions;

  totalMinutesStat.textContent =
    totalMinutes;

  plantLevelStat.textContent =
    plantLevel;

  roomLevelStat.textContent =
    roomLevel;
}


// ======================================================
// 38. RENDER SAVED SMALL WINS
// ======================================================

function renderSavedWins() {
  winsList.innerHTML = "";

  if (savedWins.length === 0) {
    const emptyMessage =
      document.createElement("li");

    emptyMessage.classList.add(
      "win-card"
    );

    emptyMessage.innerHTML = `
      <p>
        No small wins yet.
        Finish a focus session and save your first one
        (˶ᵔ ᵕ ᵔ˶)
      </p>
    `;

    winsList.appendChild(
      emptyMessage
    );

    return;
  }

  savedWins.forEach(
    function (win, index) {
      const listItem =
        document.createElement("li");

      listItem.classList.add(
        "win-card"
      );

      listItem.innerHTML = `
        <button
          class="delete-win-btn"
          data-index="${index}">
          ×
        </button>

        <p>
          ❤ ${win.text}
        </p>

        <small>
          ⏱️ ${win.minutes} min
          •
          📅 ${win.date}
        </small>
      `;

      winsList.appendChild(
        listItem
      );
    }
  );

  const deleteButtons =
    document.querySelectorAll(
      ".delete-win-btn"
    );

  deleteButtons.forEach(
    function (button) {
      button.addEventListener(
        "click",
        function () {
          const index =
            Number(
              button.dataset.index
            );

          savedWins.splice(
            index,
            1
          );

          localStorage.setItem(
            "cozyEscapeWins",
            JSON.stringify(savedWins)
          );

          renderSavedWins();
          renderStats();
        }
      );
    }
  );
}


// ======================================================
// 39. INITIAL RENDER
// ======================================================

renderSavedWins();
renderProgressWorld();
renderStats();