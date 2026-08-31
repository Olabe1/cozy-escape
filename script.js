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

const totalSessionsStat =
  document.getElementById("total-sessions-stat");

const totalMinutesStat =
  document.getElementById("total-minutes-stat");

const plantLevelStat =
  document.getElementById("plant-level-stat");

const roomLevelStat =
  document.getElementById("room-level-stat");


// ======================================================
// 11. APP STATE
// ======================================================

// Mood sound starts enabled
let soundOn = true;

// Focus choices
let selectedProgress = "";
let selectedAtmosphere = "";

// Default focus time
let selectedMinutes = 25;

// Convert minutes into seconds
let focusDuration = selectedMinutes * 60;
let timeLeft = focusDuration;

// Timer variables
let timerInterval = null;
let timerRunning = false;


// ======================================================
// 12. LOAD SAVED DATA FROM LOCAL STORAGE
// ======================================================

// Load saved Small Wins
let savedWins =
  JSON.parse(localStorage.getItem("cozyEscapeWins")) || [];

// Load plant progress
let plantLevel =
  Number(localStorage.getItem("cozyEscapePlantLevel")) || 0;

// Load room progress
let roomLevel =
  Number(localStorage.getItem("cozyEscapeRoomLevel")) || 0;


// ======================================================
// 13. INITIAL PAGE STATE
// ======================================================

scene.style.display = "none";
backButton.style.display = "none";
soundButton.style.display = "none";


// ======================================================
// 14. GENERAL HELPER FUNCTIONS
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
// 15. PAGE NAVIGATION
// ======================================================

function showPage(pageToShow) {
  moodPage.classList.remove("active-page");
  focusPage.classList.remove("active-page");
  winsPage.classList.remove("active-page");
  aboutPage.classList.remove("active-page");

  pageToShow.classList.add("active-page");
}


// ======================================================
// 16. MOOD ESCAPE
// ======================================================

function showMood(
  quoteText,
  imagePath,
  backgroundColor,
  soundPath
) {
  // Stop any focus audio first
  stopFocusSound();

  quote.textContent = quoteText;

  hero.classList.remove("active");

  setTimeout(function () {
    hero.classList.add("active");
  }, 10);

  // Hide intro content
  titleSmall.style.display = "none";
  mainTitle.style.display = "none";
  introText.style.display = "none";

  // Show mood scene
  scene.style.display = "block";
  scene.style.backgroundImage = `url("${imagePath}")`;
  scene.style.backgroundSize = "cover";
  scene.style.backgroundPosition = "center";

  // Hide mood buttons
  moodButtons.style.display = "none";

  // Show Back + Sound buttons
  backButton.style.display = "inline-block";
  soundButton.style.display = "inline-block";

  // Change page background
  document.body.style.background = backgroundColor;

  // Load selected mood sound
  audioPlayer.src = soundPath;

  if (soundOn) {
    audioPlayer.play();
  }
}


// Reset Mood Escape back to normal
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
// 17. MOOD BUTTON EVENTS
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


// Back button
backButton.addEventListener("click", function () {
  resetMoodView();
});


// Mood sound toggle
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
// 18. NAVIGATION BUTTON EVENTS
// ======================================================

moodLink.addEventListener("click", function () {
  // Stop any active focus session
  endFocusSession();

  resetMoodView();

  showPage(moodPage);
});


focusLink.addEventListener("click", function () {
  resetMoodView();

  stopFocusSound();

  resetBoboMessage();

  showPage(focusPage);
});


winsLink.addEventListener("click", function () {
  endFocusSession();

  resetMoodView();

  renderSavedWins();

  showPage(winsPage);
});


aboutLink.addEventListener("click", function () {
  endFocusSession();

  resetMoodView();

  showPage(aboutPage);
});


// ======================================================
// 19. SELECT PROGRESS STYLE
// ======================================================

function selectProgressStyle(
  selectedCard,
  progressType
) {
  // Remove selection from both
  plantChoice.classList.remove("selected");
  roomChoice.classList.remove("selected");

  // Highlight clicked card
  selectedCard.classList.add("selected");

  // Save selected type
  selectedProgress = progressType;

  updateChoiceSummary();

  // Show corresponding progress
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
// 20. SELECT ATMOSPHERE
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
// 21. UPDATE CHOICE SUMMARY
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
// 22. CLEAR FOCUS CHOICES
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

  // IMPORTANT:
  // Reset progress card to default view
  renderProgressWorld();

  resetBoboMessage();
}


clearFocusButton.addEventListener("click", function () {
  clearFocusChoices();
});


// ======================================================
// 23. ATMOSPHERE VISUAL WORLD
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
// 24. ATMOSPHERE SOUND
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
// 25. PROGRESS WORLD
// ======================================================

function renderProgressWorld() {

  // Plant stages
  const plantStages = [
    "🌰",
    "🌱",
    "🌿",
    "🪴",
    "🌸",
    "🌳"
  ];


  // Room gradually gets more objects
  const roomItems = [
    "",
    "🕯️",
    "🕯️ 🪴",
    "🕯️ 🪴 📚",
    "🕯️ 🪴 📚 🧸",
    "🕯️ 🪴 📚 🧸 🛋️",
    "🕯️ 🪴 📚 🧸 🛋️ 🪟"
  ];


  // Growing Plant selected
  if (selectedProgress === "plant") {

    // Prevent array from going past final stage
    const safePlantLevel =
      Math.min(
        plantLevel,
        plantStages.length - 1
      );

    progressWorldVisual.textContent =
      plantStages[safePlantLevel];

    progressWorldText.textContent =
      `Your plant has grown through ${plantLevel} focus session(s). Keep growing gently.`;
  }


  // Cozy Room selected
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
  }


  // Nothing selected yet
  else {
    progressWorldVisual.textContent =
      "🌰";

    progressWorldText.textContent =
      "Complete focus sessions to grow your plant or build your cozy room.";
  }
}


// ======================================================
// 26. START FOCUS SESSION
// ======================================================

function startFocusSession() {

  // User must choose BOTH options
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


  // Hide setup sections
  focusSetupSections.forEach(
    function (section) {
      section.style.display = "none";
    }
  );


  // Hide top intro text
  focusIntroTexts.forEach(
    function (text) {
      text.style.display = "none";
    }
  );


  completionPanel.style.display = "none";

  sessionPanel.style.display = "block";


  // Apply atmosphere
  applyAtmosphereWorld();

  // Start atmosphere sound
  playFocusAtmosphereSound();


  // Bobo encouragement
  boboMessage.textContent =
    "I’ll sit here quietly while you focus.";


  // Show selected session information
  sessionDetails.textContent =
    `Mode: ${selectedProgress} | Atmosphere: ${selectedAtmosphere} | Time: ${selectedMinutes} min`;


  // Reset timer to selected duration
  resetTimer();

  // Start timer
  startTimer();
}


startFocusButton.addEventListener(
  "click",
  function () {
    startFocusSession();
  }
);


// ======================================================
// 27. TIMER DISPLAY
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
// 28. START TIMER
// ======================================================

function startTimer() {

  // Prevent two timers from running
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


      // Timer finished
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


        // Stop atmosphere sound
        stopFocusSound();


        // Hide timer panel
        sessionPanel.style.display =
          "none";


        // Show completion panel
        completionPanel.style.display =
          "block";
      }

    },
    1000
  );
}


// ======================================================
// 29. PAUSE TIMER
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


// Pause / Resume button
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
// 30. RESET TIMER
// ======================================================

function resetTimer(
  shouldStartAgain = false
) {

  clearInterval(timerInterval);

  timerInterval = null;

  timerRunning = false;


  // Rebuild total time
  focusDuration =
    selectedMinutes * 60;

  timeLeft =
    focusDuration;


  updateTimerDisplay();


  pauseTimerButton.textContent =
    "Pause";


  // Reset button should reset AND continue
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
// 31. END FOCUS SESSION
// ======================================================

function endFocusSession() {

  // Stop timer
  clearInterval(timerInterval);

  timerInterval = null;

  timerRunning = false;


  // Stop atmosphere sound
  stopFocusSound();


  // Hide session views
  sessionPanel.style.display =
    "none";

  completionPanel.style.display =
    "none";


  // Bring setup back
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


  // Reset timer
  resetTimer();


  // Reset atmosphere colors
  resetFocusWorld();


  // Reset Bobo
  resetBoboMessage();
}


endSessionButton.addEventListener(
  "click",
  function () {
    endFocusSession();
  }
);


// ======================================================
// 32. SELECT FOCUS TIME
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


  // Remove selected style
  timeButtons.forEach(
    function (button) {
      button.classList.remove("selected");
    }
  );


  // Highlight chosen button
  if (selectedButton) {
    selectedButton.classList.add(
      "selected"
    );
  }


  // Clear custom input
  customMinutesInput.value = "";


  updateTimerDisplay();
}


// Time button events
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
// 33. CUSTOM FOCUS TIME
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


      // Remove selected preset button
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
// 34. SAVE SMALL WIN
// ======================================================

saveAchievementButton.addEventListener(
  "click",
  function () {

    const achievementText =
      achievementInput.value.trim();


    // Prevent empty win
    if (achievementText === "") {

      alert(
        "Please write one small win first."
      );

      boboMessage.textContent =
        "Even one tiny sentence is enough. What did you give time to?";

      return;
    }


    // Create Small Win object
    const newWin = {
      text: achievementText,
      minutes: selectedMinutes,
      date: new Date().toLocaleDateString()
    };


    // Add newest win first
    savedWins.unshift(newWin);


    // Save wins permanently
    localStorage.setItem(
      "cozyEscapeWins",
      JSON.stringify(savedWins)
    );


    renderSavedWins();


    // ==================================================
    // PROGRESS REWARD
    // ==================================================

    // If user chose Growing Plant
    if (selectedProgress === "plant") {

      plantLevel++;

      localStorage.setItem(
        "cozyEscapePlantLevel",
        plantLevel
      );
    }


    // If user chose Cozy Room
    if (selectedProgress === "room") {

      roomLevel++;

      localStorage.setItem(
        "cozyEscapeRoomLevel",
        roomLevel
      );
    }


// Update visual progress
renderProgressWorld();

// Update stats board
renderStats();

boboMessage.textContent =
  "Let’s keep this little win safe.";

    // Clear text box
    achievementInput.value = "";

    // Hide completion
    completionPanel.style.display =
      "none";

    // Bring Focus setup back
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

    // Go to Small Wins page
    showPage(winsPage);
  }
);

// ======================================================
// 35. RENDER STATS
// ======================================================

function renderStats() {
  const totalSessions = savedWins.length;

  let totalMinutes = 0;

  savedWins.forEach(function (win) {
    totalMinutes = totalMinutes + Number(win.minutes);
  });

  totalSessionsStat.textContent = totalSessions;
  totalMinutesStat.textContent = totalMinutes;
  plantLevelStat.textContent = plantLevel;
  roomLevelStat.textContent = roomLevel;
}


// ======================================================
// 35. RENDER SAVED SMALL WINS
// ======================================================

function renderSavedWins() {

  winsList.innerHTML = "";


  // No wins yet
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


  // Create one card for every saved win
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


  // Find delete buttons
  const deleteButtons =
    document.querySelectorAll(
      ".delete-win-btn"
    );


  // Add delete event to each button
  deleteButtons.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          const index =
            Number(
              button.dataset.index
            );


          // Remove from array
          savedWins.splice(
            index,
            1
          );


          // Save updated array
          localStorage.setItem(
            "cozyEscapeWins",
            JSON.stringify(savedWins)
          );

          // Redraw list
          renderSavedWins();
          // Update stats after deleting
          renderStats();
        }
      );
    }
  );
}


// ======================================================
// 36. INITIAL RENDER
// ======================================================

// Show saved wins when website loads
renderSavedWins();

// Show progress world when website loads
renderProgressWorld();

renderStats();