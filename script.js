/**
 *    SET GAME NAME
 */
let gameName = "HANGMAN";
document.querySelector(".header h1").innerHTML = gameName;
/**
 *    WORDS AND DECSRIPTIONS OBJECT
 */
let wordsAndDescriptions = {
  JavaScript:
    "A high-level, interpreted programming language that is widely used for web development.",
  HTML: "Hypertext Markup Language, used for structuring content on the web.",
  CSS: "Cascading Style Sheets, used for styling HTML elements.",
  "Node.js":
    "A JavaScript runtime built on Chrome's V8 JavaScript engine, used for server-side development.",
  React:
    "A JavaScript library for building user interfaces, developed by Facebook.",
  Python:
    "A versatile programming language known for its readability and ease of use.",
  API: "Application Programming Interface, a set of rules for building and interacting with software applications.",
  Database:
    "A structured collection of data, often stored and managed using a database management system (DBMS).",
  Variable: "A container for storing data values.",
  Function: "A reusable block of code that performs a specific task.",
  "Responsive Design":
    "A design approach that ensures web applications work well on various devices and screen sizes.",
  Algorithm:
    "A step-by-step procedure or formula for solving a problem or accomplishing a task.",
  Authentication:
    "The process of verifying the identity of a user, system, or application.",
  Deployment: "The process of making a software application available for use.",
  Scalability:
    "The ability of a system to handle an increasing amount of work or users.",
  "Web Browser":
    "A software application used to access and view websites on the internet.",
  SEO: "Search Engine Optimization, the practice of optimizing web content to rank higher in search engine results.",
  "Machine Learning":
    "A subset of artificial intelligence that enables computers to learn and improve from experience.",
  Abandon: "To leave behind or give up entirely.",
  Benevolent: "Showing kindness and goodwill.",
  Cacophony: "A harsh, discordant mixture of sounds.",
  Diligent: "Showing care and conscientiousness in one's work.",
  Ephemeral: "Lasting for a very short time.",
  Furtive: "Attempting to avoid notice or attention.",
  Gregarious: "Fond of company; sociable.",
  Hapless: "Unfortunate or unlucky.",
  Ineffable: "Too great or extreme to be expressed in words.",
  Juxtapose: "To place or deal with close together for contrasting effect.",
  Quintessential:
    "Representing the most perfect or typical example of a quality or class.",
  Resilient: "Able to withstand or recover quickly from difficult conditions.",
  Serendipity:
    "The occurrence and development of events by chance in a happy or beneficial way.",
  Ubiquitous: "Present, appearing, or found everywhere.",
  Voracious: "Wanting or devouring great quantities of food.",
  Whimsical:
    "Playfully quaint or fanciful, especially in an appealing and amusing way.",
  Curious: "Eager to learn or know about something.",
  Joyful: "Feeling, expressing, or causing great pleasure and happiness.",
  Calm: "Peaceful, free from disturbance or agitation.",
  Friendly: "Kind and pleasant, showing a willingness to be friends.",
  Gentle: "Having a mild and kind nature, not harsh or severe.",
  Brave: "Courageous and ready to face danger.",
  Creative:
    "Having the ability to think imaginatively and produce original ideas.",
  Honest: "Truthful and sincere, not deceitful or fraudulent.",
  Patient: "Capable of waiting calmly, not easily annoyed by delays.",
  Playful: "Full of fun and high spirits, characterized by a sense of play.",
  Simple: "Easy to understand, not complicated or complex.",
  Steady: "Consistent and reliable, not easily disturbed.",
  Wise: "Having good judgment and the ability to make sound decisions.",
  Generous: "Willing to give and share freely with others.",
  Lively: "Full of energy and enthusiasm.",
  Neat: "Clean, orderly, and well-organized.",
  Polite: "Behaving in a respectful and considerate manner.",
  Cheerful: "Full of cheer, happiness, and optimism.",
  Helpful: "Ready to give assistance or support.",
  Sincere: "Genuine and honest in feelings or expression.",
};
let randomSelect = Math.floor(
  Math.random() * Object.keys(wordsAndDescriptions).length
);
/**
 *    RANDOM WORD
 */
let randomWord = Object.keys(wordsAndDescriptions)[randomSelect];
/**
 *    RANDOM WORD'S DESCRIPTION
 */
let randomWordDescription =
  wordsAndDescriptions[Object.keys(wordsAndDescriptions)[randomSelect]];
/**
 *    SET WORD'S DESCRIPTION
 */
document.querySelector(".header h2 span").innerHTML =
  wordsAndDescriptions[Object.keys(wordsAndDescriptions)[randomSelect]];
console.log(Object.keys(wordsAndDescriptions)[randomSelect]);
console.log(
  wordsAndDescriptions[Object.keys(wordsAndDescriptions)[randomSelect]]
);
/**
 *    CREATE KEYBOARD BUTTONS
 */
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerHTML = String.fromCharCode(i).toUpperCase();
  document.querySelector(".buttons").appendChild(button);
}

/**
 *    CREATE THE GAME FUNCTION
 */
let lettersToGuess = document.querySelector(".lettersToGuess");
function createGame() {
  /**
   *    CREATING EMPTY DIV's FOR GUESSED LETTERS
   */
  for (i = 0; i <= randomWord.length - 1; i++) {
    let generatedLetter = document.createElement("div");
    generatedLetter.className = "letter";
    if ([...randomWord][i] === " ") {
      generatedLetter.classList.add("guessed");
      generatedLetter.innerHTML = " ";
    }
    if ([...randomWord][i] === ".") {
      generatedLetter.classList.add("guessed");
      generatedLetter.innerHTML = ".";
    }
    lettersToGuess.append(generatedLetter);
  }
  /**
   *    ADD CLICK EVEN FOR EACH KEYBOARD BUTTON
   */
  let emptyLetters = document.querySelectorAll(".lettersToGuess .letter");
  let randomWordArray = [...randomWord.toLowerCase()];
  let keyboardBtns = document.querySelectorAll(".buttons button");
  let drawing = document.querySelector(".drawing");
  let emptyArray = [];
  let wrongTries = 0;
  keyboardBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.target.disabled = true;
      e.target.classList.add("disabled");
      // console.log(e.target.innerHTML.toLowerCase());
      if (
        [...randomWord.toLowerCase()].includes(e.target.innerHTML.toLowerCase())
      ) {
        for (i = 0; i <= [...randomWord].length - 1; i++) {
          if (randomWordArray[i] === e.target.innerHTML.toLowerCase()) {
            emptyLetters[i].innerHTML = e.target.innerHTML.toLowerCase();
            emptyLetters[i].classList.add("guessed");
            emptyArray.push(e.target.innerHTML.toLowerCase());
            if (emptyArray.length === randomWordArray.length) {
              winGame();
            }
          }
        }
      } else {
        console.log("NO");
        wrongTries++;
        drawing.classList.add(`wrong-${wrongTries}`);
        wrongTries === 7 ? loseGame() : "";
      }
    });
  });
}

let theEnd = document.querySelector(".the-end");
let theEndImg = document.querySelector(".the-end-div img");
let theEndMsgOne = document.querySelector(".the-end-div .first-line");
let theEndMsgtwo = document.querySelector(".the-end-div .second-line");
let theEndBtn = document.querySelector(".the-end-div button");
function winGame() {
  theEndImg.src = "./win.gif";
  theEndMsgOne.innerHTML = `<b>Congratulations!!</b><p>You Won</p>`;
  theEndMsgtwo.innerHTML = ` The Word Was <span>${randomWord}</span>`;
  theEndBtn.addEventListener("click", function () {
    location.reload(true);
  });
  theEnd.style.display = "block";
}
function loseGame() {
  theEndImg.src = "./lost.gif";
  theEndMsgOne.innerHTML = `<b>Owh Sorry!!</b><p>You Lost</p>`;
  theEndMsgtwo.innerHTML = ` The Word Was <span>${randomWord}</span>`;
  theEndBtn.addEventListener("click", function () {
    location.reload(true);
  });
  theEnd.style.display = "block";

  /**
   *    FOOTER
   */
}
window.onload = createGame();

document.querySelector("footer").innerHTML = "This Game Was Created By ©MSW ";
let footer = document.querySelector("footer");
