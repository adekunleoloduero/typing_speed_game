
//Quotes database
const quotesDatabase = [
    'They conquire, who believe the can.',
    'I know of no more encouraging fact than the ability of man to control himself through concious endeavour.',
    'Whatever the min of man can conceive and belive, it can achieve.',
    'Give me a lever and I will move the earth.'
]


//Get elements to target
const playButton = document.querySelector('#play');
const quoteBoard = document.querySelector('#quote-board');
const playerResponse = document.querySelector('#player-response');   


//Other global variables
let currentWordMatched = false;
let nextToMatchIndex = 0;
let matchedSection = '';


//Global variables for the quote matiching section
let  quoteSections;
let sectionIndex;

 
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
    e.preventDefault();
    
    
    // let 
    let wordToMatch = getNextToMatch();
    console.log(wordToMatch);

    let sectionToMatch = `${matchedSection}${wordToMatch}`

    if (playerResponse.value === sectionToMatch) {
        matchedSection += sectionToMatch;

        //Indicate the next word to match
        highlightNextWord(wordToMatch)
        //

        // currentWordMatched = true;
        // wordTomatch = matchEntireQuote();       
    }  
}


function highlightNextWord(wordToMatch) {
    const quote = document.querySelector('#quote-board #quote').textContent;
    const sections = quote.split(wordToMatch);
    quote.innerHTML = `${sections[0]}<span style="color: blue;">${wordToMatch}</span>${sections[1]}`
}


const getSection = () => {
    let section;

    while (sectionIndex < quoteSections.length) {
        section = quoteSections[sectionIndex];
        sectionIndex += 1;
        break;
    }
    return section;
}

playerResponse.addEventListener('focus', startTyping);
//End of section