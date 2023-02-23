function loadHighScores() {
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  let highScoresHTML = "";
  for (let i = 0; i < highScores.length; i++) {
    highScoresHTML += `<li>${highScores[i].initials} - ${highScores[i].score}</li>`;
  }
  document.getElementById("highscores").innerHTML = highScoresHTML;
}

document.getElementById("clear").addEventListener("click", () => {
  localStorage.removeItem("highScores");
});

function init() {
  loadHighScores();
}

init();
