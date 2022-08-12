
//Quotes database
const quotesDatabase = [
    'They conquer, who believe they can.',
    'I know of no more encouraging fact than the ability of man to control himself through concious endeavour.',
    'Whatever the mind of man can conceive and believe, it can achieve.',
    'Give me a lever and I will move the earth.'
]


//Get elements to target
const playButton = document.querySelector('#play');
const quoteBoard = document.querySelector('#quote-board');
const playerResponse = document.querySelector('#player-response');   


//Global variables for the quote matiching section
let quoteSections;
let sectionIndex = 0;
let matchedSections = '';
let nextSection;

 
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
    //Reset sectionIndex to zero
    sectionIndex = 0
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

    //Append a space to each section coming from the quotesSection array except the last one
    if (sectionIndex !== quoteSections.length - 1) {
        nextSection = `${quoteSections[sectionIndex]} `;
    } else {
        nextSection = quoteSections[sectionIndex];
    }
    
    highlightNextSection(nextSection, '#quote-board #quote');
    let sectionsToMatch = `${matchedSections}${nextSection}`;

    if ((playerResponse.value == sectionsToMatch)) {
        matchedSections = sectionsToMatch;
        console.log(playerResponse.value, sectionsToMatch);
        typeNextSection();
    }
    
    console.log(sectionIndex);
    //Highlight next section to be matched
}


function highlightNextSection(nextSection, target) {
    const originalQuote = document.querySelector(target).textContent;
    const highlightedQuote = document.createElement('p');
    highlightedQuote.id = 'quote';
    const sections = originalQuote.split(`${nextSection}`);
    highlightedQuote.innerHTML = `${sections[0]}<span id="next-section" style="color: blue; font-size: 24px;">${nextSection}</span>${sections[1]}`
    removePreviousValue(target);
    quoteBoard.append(highlightedQuote);
}


function typeNextSection() {
    while (sectionIndex < quoteSections.length) {
        sectionIndex += 1;
        break;
    }
}

playerResponse.addEventListener('keypress', startTyping);
// //End of section