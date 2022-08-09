
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

    const newQuote = document.createElement('p');
    newQuote.classList.add('quote');
    newQuote.id = 'quote';
    newQuote.textContent = randomQuote;
    quoteBoard.append(newQuote);
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

