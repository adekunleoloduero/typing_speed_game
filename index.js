
window.onload = () => {

    //Hide the instructions when page loads fro 1st time
    const instructions = document.querySelector('#instructions-panel');   
    instructions.style.display = 'none';
}
//End of section

//Global variables
let quoteSections;
let sectionIndex;
let highletedSectionIndex;
let matchedSections = '';
let nextSection;
let startTime, endTime;


//Get elements to target
const playButton = document.querySelector('#play');
const quoteBoard = document.querySelector('#quote-board');
const playerResponse = document.querySelector('#player-response');
const instructions = document.querySelector('#instructions-panel');
const instructionsButton = document.querySelector('#instruct');
const gamePanel = document.querySelector('#game-panel');
const backButton = document.querySelector('#back');

//Quotes database
const quotesDatabase = [
    'They conquer, who believe they can.',
    'I know of no more encouraging fact than the ability of man to control himself through concious endeavour.',
    'Whatever the mind of man can conceive and believe, it can achieve.',
    'Give me a lever and I will move the earth.'
]


 //This sections contains code that generate and display a random quote.

/**
 * 
 * @param {*} quotes 
 * @param {*} displayRandomQuote 
 */
function generateRandomQuotes(e) {
    e.preventDefault();

    let quotes = quotesDatabase;
    let randomQuote;
    let randomIndex = Math.floor(Math.random() * quotes.length);
    randomQuote = quotes[randomIndex];
    displayRandomQuote(randomQuote);

    //Reset previous values
    sectionIndex = 0;
    matchedSections = "";
    //Remove previous message
    removePreviousValue('#msg');
    startTime = performance.now();
}


/**
 * 
 * @param {*} randomQuote 
 */
function displayRandomQuote(randomQuote) {
    removePreviousValue('#quote-board #quote');
    removePreviousValue('#player-response', 'x');

    const newQuote = document.createElement('p');
    newQuote.classList.add('quote');
    newQuote.id = 'quote';
    newQuote.textContent = randomQuote;
    quoteBoard.append(newQuote);

    //Split original quote into sections
    quoteSections = newQuote.textContent.split(' ');
    playerResponse.focus();
}


function removePreviousValue(target, val) {
    const toRemove = document.querySelector(target);
    if (toRemove !== null) {
       if (val == undefined) {
           toRemove.remove();
       } else {
           toRemove.value = "";
       }
    }
} 

playButton.addEventListener('click', generateRandomQuotes);

//End of section


//This section contains code that compare and matches the quote with what the
//player types and also determine the time taken to complete the match.

function startTyping(e) {
    // console.log(playerResponse.value = e.target.value);

    const quote = document.querySelector('#quote-board #quote');
    if (quote == null) {
        return;  
    }

    if (playerResponse.value == quote.textContent) {
        endTime = performance.now();
        displayCongratulatoryMessage();
        playerResponse.blur();
    }
    //Append a space to each section coming from the quotesSection array except the last one
    if (sectionIndex !== quoteSections.length - 1) {
        nextSection = `${quoteSections[sectionIndex]} `;
    } else {
        nextSection = quoteSections[sectionIndex];
    }
    
    //Highlight next section to be matched
    highlightNextSection(nextSection, '#quote-board #quote');
    let sectionsToMatch = `${matchedSections}${nextSection}`;

    if ((playerResponse.value == sectionsToMatch)) {
        matchedSections = sectionsToMatch;
        typeNextSection();
    } 
}


function highlightNextSection(nextSection, target) {
    const originalQuote = document.querySelector(target).textContent.toString();
    console.log(sectionIndex);
    let leftOfNextSection;
    let rightOfNextSection;
    
    if (sectionIndex === 0) {
       leftOfNextSection = '';
       rightOfNextSection = originalQuote.substring(nextSection.length, originalQuote.length);
    } else if (sectionIndex === quoteSections.length - 1)  {
        leftOfNextSection = originalQuote.substring(0, originalQuote.length - nextSection.length);
        rightOfNextSection = '';
    } else if (sectionIndex > 0 && sectionIndex < quoteSections.length - 1) {
        // highletedSectionIndex = originalQuote.indexOf(nextSection);
        highletedSectionIndex = originalQuote.indexOf(nextSection);
        leftOfNextSection = originalQuote.substring(0, highletedSectionIndex);
        rightOfNextSection = originalQuote.substring(highletedSectionIndex + nextSection.length, originalQuote.length);
    }

    const highlightedQuote = document.createElement('p');
    highlightedQuote.id = 'quote';
    highlightedQuote.innerHTML = `${leftOfNextSection}<span id="next-section">${nextSection}</span>${rightOfNextSection}`;
    removePreviousValue(target);
    quoteBoard.append(highlightedQuote);
}


function typeNextSection() {
    while (sectionIndex < quoteSections.length) {
        sectionIndex += 1;
        break;
    }
}

playerResponse.addEventListener('keyup', startTyping);
//End of section

//This section display congratulatory message to the player after typign the quote
//correctly

function displayCongratulatoryMessage() {
    const msg = document.createElement('p');
    const form = document.querySelector('form');
    const timeTaken = endTime - startTime;
    msg.id = 'msg';
    msg.innerHTML = `Congratulations, you finished typing the quote correctly in <span id="time-taken">${(timeTaken/1000).toFixed(2)}</span> seconds.`
    form.prepend(msg);
}

//End of section

//This section contain codes that hide Game panel and display instructions
//As well as codes that makes it possible to navigate back to the game panel.
instructionsButton.addEventListener('click', () => {
  gamePanel.style.display = "none";
  instructions.style.display = "block";
  instructionsButton.style.display = "none";
});

backButton.addEventListener('click', () => {
    gamePanel.style.display = "block";
    instructions.style.display = "none";
    instructionsButton.style.display = "block";
});
//End of section
