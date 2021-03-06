//global variable array to hold the deck of cards 
let deck = [];
//global variable array to hold the players 5 cards 
let myHand = [];
//global variable to keep a count of cards in hi/low game
let indexCounter = 0;
//global array variable for high/low game card values.
let hiLoValues = [];

//event listeners for buttons
document.getElementById("btn-deal").addEventListener("click", dealCards);
document.getElementById("btn-draw").addEventListener("click", drawCards);
document.getElementById('btn-bank-win').addEventListener('click', bankWinnings);
document.getElementById('btn-high').addEventListener('click', checkHighWin);
document.getElementById('btn-low').addEventListener('click', checkLoWin);

/**
 * creates a deck of 52 card objects using values and suits
 * @returns array
 */
function getDeck() {
    let cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let suits = ["diamonds", "hearts", "spades", "clubs"];

    let deck = [];

    for (let i = 0; i < suits.length; i++) {
        for (let x = 0; x < cards.length; x++) {
            let card = {
                value: cards[x],
                suit: suits[i]
            };
            deck.push(card);
        }
    }
    return deck;
}

/**
 * Shuffle the deck by switching two random cards for 1000 turns
 * 
 */
function shuffle() {
    deck = getDeck();
    for (let i = 0; i < 1000; i++) {
        let location1 = Math.floor((Math.random() * deck.length));
        let location2 = Math.floor((Math.random() * deck.length));

        //swap cards using a temp variable
        let tmp = deck[location1];
        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }

    //Show or hide buttons
    document.getElementById("winnings").style.display = "none";
    document.getElementById("btn-deal").style.display = "inline-block";
    document.getElementById("current-chips-container").style.display = "inline-block";
    document.getElementById("bet-amount-container").style.display = "inline-block";
    //enable the bet input field
    document.getElementById("bet-amount").disabled = false;
    //dispaly 5 images of back of cards on game table
    renderHandFaceDown();
    displayMessage("Place Bet and Click Deal");

}

/**
 * Take chips from availble chips if enough chips available and returns true else
 * returns false if not enough chips available for bet 
 * @returns boolean
 */
function takeBet() {
    // get the bet amount
    let betAmount = document.getElementById("bet-amount").value;
    let currentChipsAmount = parseInt(document.getElementById("current-chips").innerText);
    // check if enough chips for bet
    if (currentChipsAmount >= betAmount) {
        // deduct bet from available chips
        let newChipsAmount = currentChipsAmount - betAmount;
        //display new total chips amount
        document.getElementById("current-chips").innerText = newChipsAmount;
        return true;
    } else {
        // return flase if bet amount is larger than available chips
        return false;
    }
}

/** 
 * Takes 5 cards from top of deck 
 * and adds to players hand 
 */
function dealCards() {
    //take the bet amount chips from the current chips
    if (takeBet()) {
        //deal 5 cards from the deck and add to hand
        for (let i = 0; i < 5; i++) {
            myHand[i] = deck.pop();
        }
        //display the hand on the game table
        renderHand(myHand, true);

        //hide the deal button after the initial deal and display the draw button
        document.getElementById("btn-deal").style.display = "none";
        document.getElementById("btn-draw").style.display = "inline-block";
        // disable bet input after deal is clicked
        document.getElementById("bet-amount").disabled = true;
        displayMessage("Click Cards to Hold---------Click Draw to get new cards.");
    } else {
        displayMessage("Insufficent chips for this bet !!!!");
    }
}

/**
 * creates a new 5 card hand from held cards plus draw new cards from deck
 */
function drawCards() {
    //new array to hold the cards that playerhas held
    let myHeldCards = [];
    //get the cards that are dealt
    let drawnCards = document.getElementsByClassName("dealt-card");

    // go through list of cards and add held cards to myHeldCards array
    for (let i = 0; i < 5; i++) {
        if (drawnCards[i].classList.contains("selected")) {
            myHeldCards.push(myHand[i]);
        }
    }

    // deal cards from the deck to replace cards that were not held to produce new 5 card hand
    for (let i = myHeldCards.length; i < 5; i++) {
        myHeldCards[i] = deck.pop();
    }

    //display new hand on the game table
    renderHand(myHeldCards, false);
    checkHandForWin(myHeldCards);
    document.getElementById("btn-draw").style.display = "none";
}

/**
 *  Display images of 5 cards face down
 */
function renderHandFaceDown() {
    document.getElementById('card-table').innerHTML = '';
    for (let i = 0; i < 5; i++) {
        let card = document.createElement("div");
        card.className = "card face-down";
        document.getElementById("card-table").appendChild(card);
    }
}

/**
 * creates images for each card in array of card objects 
 * and displays on the game table
 * @param {Array} hand 
 * @param {boolean} isDeal 
 */
function renderHand(hand, isDeal) {
    document.getElementById('card-table').innerHTML = '';
    for (let i = 0; i < hand.length; i++) {
        // create the elements
        let card = document.createElement("div");
        let value = document.createElement("div");
        let suit = document.createElement("div");
        let suitSR = document.createElement("span");
        let cardSR = document.createElement("span");
        let hold = document.createElement("div");
        // add classes to the elements
        card.className = "card dealt-card";
        value.className = "value";
        suit.className = "suit " + hand[i].suit;
        // screen reader class, reads on assistive technology but doesn't display
        suitSR.className = "sr-only";
        cardSR.className = "sr-only";
        hold.className = "hold";
        // add attribute to work with enter key
        card.setAttribute("tabindex", "0");
        card.setAttribute("onkeyup", "enterHold(event, this)");

        // add relevent value
        value.innerHTML = hand[i].value;
        cardSR.innerHTML = "Click to hold card";
        suitSR.innerHTML = hand[i].suit;
        hold.innerHTML = "Hold";
        // create image inside card
        card.appendChild(value);
        card.appendChild(suit);
        card.appendChild(suitSR);
        card.appendChild(cardSR);
        card.appendChild(hold);

        //if it is the deal then add click event to each card displayed
        if (isDeal) {
            card.addEventListener("click", function () {
                this.classList.toggle("selected");
            });
        }
        // add the card to the game table
        document.getElementById("card-table").appendChild(card);
    }
    // After card is drawn, focus on first card
    let cards = document.querySelectorAll(".card.dealt-card");
    cards[0].focus();
}

/**
 * checks if enter key is pressed
 * clicks to hold card
 * @param {Event} 
 * @param {element} card
 */
function enterHold(event, element) {
    if (event.key === 'Enter') {
        // Cancel the default action, if needed
        event.preventDefault();
        element.click();
    }
}

/**
 *  Renders a single card on game table
 * @param {*} aCard 
 */
function renderCard(aCard) {
    let card = document.createElement("div");
    let value = document.createElement("div");
    let suit = document.createElement("div");
    let hold = document.createElement("div");
    card.className = "card dealt-card";
    // make card tabbable
    card.setAttribute("tabindex", "0");
    value.className = "value";
    suit.className = "suit " + aCard.suit;

    value.innerHTML = aCard.value;
    card.appendChild(value);
    card.appendChild(suit);
    card.appendChild(hold);
    document.getElementById("card-table").appendChild(card);
    // focus drawn card
    card.focus();
}

/**
 * Checks if all the cards have the same suit
 * and therefore is a flush
 * @param {Array} cards 
 * @returns Boolean
 */
function isFlush(cards) {
    // pass through array and check that all cards have same suit
    for (let i = 0; i < (cards.length - 1); i++) {
        if (cards[i].suit != cards[i + 1].suit) {
            return false; //if any card has different suit to rest then return false
        }
    }
    return true;
}

/**
 * Checks if cards are a straight flush starting from 10
 * @param {Array} cards 
 * @returns boolean
 */
function isRoyalFlush(cards) {
    if (isStraightFlush(cards) && cards[0].value === "10") {
        return true;
    } else {
        return false;
    }
}

/**
 *  Checks if cards are a straight flush
 * @param {Array} cards 
 * @returns boolean
 */
function isStraightFlush(cards) {
    if (isFlush(cards) && isStraight(sortCardsByValue(cards))) {
        return true;
    } else {
        return false;
    }
}

/**
 *  Converts face cards into values
 * @param {*} cards 
 * @returns 
 */
function convertCardsToValues(cards) {
    let values = [];
    for (let i = 0; i < cards.length; i++) {
        switch (cards[i].value) {
            case 'A':
                values.push(14);
                break;
            case 'K':
                values.push(13);
                break;
            case 'Q':
                values.push(12);
                break;
            case 'J':
                values.push(11);
                break;
            default:
                values.push(parseInt(cards[i].value));
        }
    }
    return values;
}

/**
 * Sort cards in ascending order
 * @param {Array} cards 
 * @returns {Array} values
 */
function sortCardsByValue(cards) {
    let values = convertCardsToValues(cards);
    // sort array in ascending order
    values.sort(function (a, b) {
        return a - b;
    });
    return values;
}

/**
 * Checks if the first 4 vales in array are equal
 * @param {Array} values 
 * @returns {Boolean} 
 */
function isFourOfKind(values) {
    if ((values[0] === values[1] && values[0] === values[2] && values[0] === values[3]) ||
        (values[1] === values[2] && values[1] === values[3] && values[1] === values[4])) {
        return true;
    } else {
        return false;
    }
}

/**
 * Checks if first 3 values in array are equal
 * @param {Array} values 
 * @returns {Boolean}
 */
function isThreeOfKind(values) {
    if ((values[0] === values[1] && values[0] === values[2]) ||
        (values[1] === values[2] && values[1] === values[3]) ||
        (values[2] === values[3] && values[2] === values[4])) {
        return true;
    } else {
        return false;
    }
}

/**
 * Checks if array contains a matching pair of values greater than 10
 * @param {Array} values 
 * @returns {Boolean}
 */
function isPair(values) {
    if ((values[0] === values[1] && values[0] > 10) || (values[1] === values[2] && values[1] > 10) ||
        (values[2] === values[3] && values[2] > 10) || (values[3] === values[4] && values[3] > 10)) {
        return true;
    } else {
        return false;
    }
}

/**
 *  checks if array contains a pair and 3 of a kind
 * @param {*} values 
 * @returns 
 */
function isFullHouse(values) {
    //let valuesReversed = values.slice().reverse();
    if (((values[0] === values[1]) && (values[2] === values[3] && values[2] == values[4])) ||
        ((values[3] === values[4]) && (values[0] === values[1] && values[0] == values[2]))) {
        return true;
    } else {
        return false;
    }
}

/**
 * Checks if values in array have 2 pairs
 * @param {Array} values 
 * @returns {Boolean}
 */
function isTwoPair(values) {
    if ((values[0] === values[1] && values[2] === values[3]) ||
        (values[1] === values[2] && values[3] === values[4]) ||
        (values[0] === values[1] && values[3] === values[4])) {
        return true;
    } else {
        return false;
    }
}

/**
 * check if passed array is sequential values 
 * @param {Array} values 
 * @returns boolean
 */
function isStraight(values) {
    if (isStraight_ace_to_five(values)) {
        return true;
    } else {
        for (let i = 0; i < values.length - 1; i++) {
            if (values[i + 1] != (values[i] + 1)) {
                return false;
            }
        }
    }
    return true;
}

/**
 * check if passed array is sequential values A, 2, 3, 4, 5
 * @param {Array} values 
 * @returns boolean
 */
function isStraight_ace_to_five(values) {
    let straightAceLow = [2, 3, 4, 5, 14];
    for (let i = 0; i < values.length; i++) {
        if (values[i] != (straightAceLow[i])) {
            return false;
        }
    }
    return true;
}

/**
 * Checks for each of the winning hands and calls gamble winnings if winning hand is found
 * @param {*} cards 
 */
function checkHandForWin(cards) {
    if (isRoyalFlush(cards)) {
        displayMessage("Royal Flush");
        //call function with delay and pass multiple of bet to calc win for the hand
        setTimeout(gambleWinnings, 3000, 500);
    } else if (isStraightFlush(cards)) {
        displayMessage("Straight Flush");
        setTimeout(gambleWinnings, 3000, 60);
    } else if (isFourOfKind(sortCardsByValue(cards))) {
        displayMessage("Four of a kind");
        setTimeout(gambleWinnings, 3000, 25);
    } else if (isFullHouse(sortCardsByValue(cards))) {
        displayMessage("Full House");
        setTimeout(gambleWinnings, 3000, 10);
    } else if (isFlush(cards)) {
        displayMessage("Flush");
        setTimeout(gambleWinnings, 3000, 5);
    } else if (isStraight(sortCardsByValue(cards))) {
        displayMessage("Straight");
        setTimeout(gambleWinnings, 3000, 4);
    } else if (isThreeOfKind(sortCardsByValue(cards))) {
        displayMessage("Three of a kind");
        setTimeout(gambleWinnings, 3000, 3);
    } else if (isTwoPair(sortCardsByValue(cards))) {
        displayMessage("Two pair");
        setTimeout(gambleWinnings, 3000, 2);
    } else if (isPair(sortCardsByValue(cards))) {
        displayMessage("A Pair");
        setTimeout(gambleWinnings, 3000, 1);
    } else {
        displayMessage("No Winning hand");
        setTimeout(shuffle, 3000);
    }
}

/**
 * Display message to user under the game table
 * @param {String} message 
 */
function displayMessage(message) {
    document.getElementById("game-display-message").innerText = message;
}

/**
 * Displays buttons and first card for hi/lo game
 * @param {*} winMultiplyer 
 */
function gambleWinnings(winMultiplyer) {

    // clear the game table and 
    document.getElementById('card-table').innerHTML = '';
    document.getElementById("btn-deal").style.display = "none";
    document.getElementById("btn-bank-win").style.display = "inline-block";
    document.getElementById("winnings").style.display = "inline-block";
    document.getElementById("btn-high").style.display = "inline-block";
    document.getElementById("btn-low").style.display = "inline-block";

    // calculate winnings
    let betAmount = document.getElementById("bet-amount").value;
    let winnings = betAmount * winMultiplyer;
    document.getElementById("winnings-amount").innerText = winnings;

    //get new 5 cards for high/low game
    for (let i = 0; i < 5; i++) {
        myHand[i] = deck.pop();
    }

    // get array of values from myHand
    hiLoValues = convertCardsToValues(myHand);
    //reset counter for cards
    indexCounter = 0;
    //display first card for high low game
    renderCard(myHand[indexCounter]);

    displayMessage("Bank your winnings or Gamble High/Low to double winnings    -    Max of 5 cards!");

    document.getElementById("current-chips-container").style.display = "none";
    document.getElementById("bet-amount-container").style.display = "none";
}

/**
 * Called when high button clicked and checks if next card is higher than the previous card dealt
 */
function checkHighWin() {
    indexCounter++;
    let lose = false;
    renderCard(myHand[indexCounter]);
    if ((hiLoValues[indexCounter] >= hiLoValues[indexCounter - 1]) ||
        (hiLoValues[indexCounter] === 14 ||
            hiLoValues[indexCounter - 1] === 14)) {
        let currentWinnings = parseInt(document.getElementById("winnings-amount").innerText);
        //double the current winnings
        currentWinnings *= 2;
        //display new winnings
        document.getElementById("winnings-amount").innerText = currentWinnings;
    } else {
        displayMessage("Lose - Card is lower");
        document.getElementById("winnings-amount").innerText = "0";
        setTimeout(shuffle, 5000);
        //hide the gamble winnings buttons
        document.getElementById("btn-bank-win").style.display = "none";
        document.getElementById("winnings").style.display = "none";
        document.getElementById("btn-high").style.display = "none";
        document.getElementById("btn-low").style.display = "none";
        lose = true;
    }
    // checks if last card in hi/lo game and if so banks winnings and returns to main poker game
    if (indexCounter === 4) {
        document.getElementById("btn-bank-win").style.display = "none";
        //document.getElementById("winnings").style.display = "none";
        document.getElementById("btn-high").style.display = "none";
        document.getElementById("btn-low").style.display = "none";
        if (lose === true) {
            displayMessage("Lose - Card is lower");
        } else {
            displayMessage("Max Gambles Reached !!!");
        }
        let currentWinnings = parseInt(document.getElementById("winnings-amount").innerText);
        let currentChipsAmount = parseInt(document.getElementById("current-chips").innerText);
        let newChipsAmount = currentChipsAmount + currentWinnings;
        document.getElementById("current-chips").innerText = newChipsAmount;
        setTimeout(shuffle, 5000);
    }
}

/**
 * Called when low button clicked and checks if next card is lower than the previous card dealt
 */
function checkLoWin() {
    indexCounter++;
    let lose = false;
    renderCard(myHand[indexCounter]);
    if ((hiLoValues[indexCounter] <= hiLoValues[indexCounter - 1]) ||
        (hiLoValues[indexCounter] === 14 ||
            hiLoValues[indexCounter - 1] === 14)) {
        let currentWinnings = parseInt(document.getElementById("winnings-amount").innerText);
        //double the current winnings
        currentWinnings *= 2;
        //display new winnings
        document.getElementById("winnings-amount").innerText = currentWinnings;
    } else {
        displayMessage("Lose-Card is higher");
        document.getElementById("winnings-amount").innerText = "0";
        setTimeout(shuffle, 5000);
        //hide the gamble winnings buttons
        document.getElementById("btn-bank-win").style.display = "none";
        document.getElementById("winnings").style.display = "none";
        document.getElementById("btn-high").style.display = "none";
        document.getElementById("btn-low").style.display = "none";
        lose = true;
    }
    // checks if last card in hi/lo game and if so banks winnings and returns to main poker game
    if (indexCounter === 4) {
        document.getElementById("btn-bank-win").style.display = "none";
        document.getElementById("btn-high").style.display = "none";
        document.getElementById("btn-low").style.display = "none";
        if (lose === true) {
            displayMessage("Lose - Card is higher");
        } else {
            displayMessage("Max Gambles Reached !!!");
        }
        let currentWinnings = parseInt(document.getElementById("winnings-amount").innerText);
        let currentChipsAmount = parseInt(document.getElementById("current-chips").innerText);
        let newChipsAmount = currentChipsAmount + currentWinnings;
        document.getElementById("current-chips").innerText = newChipsAmount;
        setTimeout(shuffle, 5000);
    }
}

/**
 * Banks the winning to the players chips and returns to the main poker game
 */
function bankWinnings() {
    let currentWinnings = parseInt(document.getElementById("winnings-amount").innerText);
    let currentChipsAmount = parseInt(document.getElementById("current-chips").innerText);
    let newChipsAmount = currentChipsAmount + currentWinnings;
    document.getElementById("current-chips").innerText = newChipsAmount;

    //hide the gamble winnings buttons
    document.getElementById("btn-bank-win").style.display = "none";
    document.getElementById("winnings").style.display = "none";
    document.getElementById("btn-high").style.display = "none";
    document.getElementById("btn-low").style.display = "none";
    //display deal button again
    document.getElementById("btn-deal").style.display = "inline-block";

    //clear the game table for next deal
    document.getElementById('card-table').innerHTML = '';
    shuffle();
}

/**
 *  creates a new deck of cards and shuffles them when page loads 
 */
function load() {
    deck = getDeck();
    shuffle();
}

window.onload = load;


window.onbeforeunload = function (e) {
    return "Do you want to exit this page?";
};