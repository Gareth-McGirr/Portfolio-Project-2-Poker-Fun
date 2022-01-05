//global variable array to hold the deck of cards 
let deck = new Array();
//global variable array to hold the players 5 cards 
let myHand = new Array();
//global variable to keep a count of cards in hi/low game
let indexCounter = 0;
//global array variable for high/low game card values.
let hiLoValues = new Array;



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

    let deck = new Array();

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
    document.getElementById("winnings").style.display = "none";
    document.getElementById("btn-deal").style.display = "inline-block";
    //clear the game table for next deal
    document.getElementById('card-table').innerHTML = '';
    displayMessage("Place Bet and Click Deal");

}

function takeBet() {
    // get the bet amount
    let betAmount = document.getElementById("bet-amount").value;
    console.log(betAmount);
    let currentChipsAmount = parseInt(document.getElementById("current-chips").innerText);
    console.log(currentChipsAmount);
    // check if enough chips for bet
    if (currentChipsAmount > betAmount) {
        // deduct bet from available chips
        let newChipsAmount = currentChipsAmount - betAmount;
        console.log(newChipsAmount);
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
        //shuffle();
        //deal 5 cards from the deck and add to hand
        for (let i = 0; i < 5; i++) {
            myHand[i] = deck.pop();
        }
        //display the hand on the game table
        renderHand(myHand, true);

        //hide the deal button after the initial deal and display the draw button
        document.getElementById("btn-deal").style.display = "none";
        document.getElementById("btn-draw").style.display = "inline-block";
    } else {
        alert("Insufficent funds for this bet !!!!")
    }

    displayMessage("Click Cards to Hold---------Click Draw to get new cards.")
}

/**
 * creates a new 5 card hand from held cards plus draw new cards from deck
 */
function drawCards() {

    // TO DO: POSSIBLY REPLACE CARDS IN THE ARRAY RATHER THAN CREATE A NEW ARRAY ? 
    // CARDS THAT ARE HELD WOULD THEN KEEP THE SAME POSITION ON THE GAME TABLE AFTER DRAW.   

    //new array to hold the cards that playerhas held
    let myHeldCards = new Array();
    //get the cards that are dealt
    let drawnCards = document.getElementsByClassName("dealt-card");

    // go through list of cards and add held cards to myHeldCards array
    for (let i = 0; i < 5; i++) {
        if (drawnCards[i].classList.contains("selected")) {
            myHeldCards.push(myHand[i])
        }
    }

    // deal cards from the deck to replace cards that were not held to produce new 5 card hand
    for (let i = myHeldCards.length; i < 5; i++) {
        myHeldCards[i] = deck.pop();
    }

    //display new hand on the game table
    renderHand(myHeldCards, false);

    checkHandForWin(myHeldCards);
    //setTimeout(checkHandForWin(myHeldCards), 5000);
    document.getElementById("btn-deal").style.display = "inline-block";
    document.getElementById("btn-draw").style.display = "none";


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
        let card = document.createElement("div");
        let value = document.createElement("div");
        let suit = document.createElement("div");
        let hold = document.createElement("div");
        card.className = "card dealt-card";
        value.className = "value";
        suit.className = "suit " + hand[i].suit;
        hold.className = "hold";

        value.innerHTML = hand[i].value;
        hold.innerHTML = "Hold";
        card.appendChild(value);
        card.appendChild(suit);
        card.appendChild(hold);


        //if it is the deal then add click event to each card displayed
        if (isDeal) {
            card.addEventListener("click", function () {
                this.classList.toggle("selected");
            });
        }
        document.getElementById("card-table").appendChild(card);
    }

}

function renderCard(aCard) {
    let card = document.createElement("div");
    let value = document.createElement("div");
    let suit = document.createElement("div");
    let hold = document.createElement("div");
    card.className = "card dealt-card";
    value.className = "value";
    suit.className = "suit " + aCard.suit;


    value.innerHTML = aCard.value;

    card.appendChild(value);
    card.appendChild(suit);
    card.appendChild(hold);



    document.getElementById("card-table").appendChild(card);

}

/**
 * Checks if all the cards have the same suit
 * and therefore is a flush
 * @param {Array} cards 
 * @returns Boolean
 */
function isFlush(cards) {
    for (let i = 0; i < (cards.length - 1); i++) {
        console.log(cards[i].suit);
        console.log(cards[i + 1].suit);
        console.log("----------------")
        if (cards[i].suit != cards[i + 1].suit) {
            return false;
        }
    }

    return true;
}

function isRoyalFlush(cards) {
    if (isStraightFlush(cards) && cards[0].value === "10") {
        return true;
    } else {
        return false;
    }
}

function isStraightFlush(cards) {
    if (isFlush(cards) && isStraight(sortCardsByValue(cards))) {
        return true;
    } else {
        return false;
    }


}

function convertCardsToValues(cards) {
    let values = new Array();
    for (i = 0; i < cards.length; i++) {
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
 * 
 * @param {Array} cards 
 * @returns {Array} values
 */
function sortCardsByValue(cards) {
    let values = convertCardsToValues(cards)
    console.log(values);
    values.sort(function (a, b) {
        return a - b
    });
    console.log(values);
    console.log("----------------------------");
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
        return true
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
        return true
    } else {
        return false;
    }
}

/**
 * Checks if first 2 values in array are equal
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

function isStraight(values) {
    console.log("checking for straight");
    console.log(values);
    for (let i = 0; i < values.length - 1; i++) {
        if (values[i + 1] != (values[i] + 1)) {
            console.log("value " + i + " is " + values[i]);
            console.log("value " + i + " is " + values[i + 1])
            return false;
        }
    }
    return true;

    //to do: need code to check if straight is - A,2,3,4,5

}

function checkHandForWin(cards) {
    if (isRoyalFlush(cards)) {
        displayMessage("Royal Flush");
        //call function with delay and pass multiple of bet to calc win for the hand
        setTimeout(gambleWinnings, 3000, 500);
    } else if (isStraightFlush(cards)) {
        displayMessage("Straight Flush");
        setTimeout(gambleWinnings, 3000, 60);
        //gambleWinnings(60);
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
        displayMessaget("A Pair");
        setTimeout(gambleWinnings, 3000, 1);
    } else {
        displayMessage("No Winning hand");
        setTimeout(shuffle, 3000);
    }

}

function displayMessage(message) {
    document.getElementById("game-display-message").innerText = message;
}

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

    displayMessage("Bank your winnings or Gamble High/Low to double winnings    -    Max of 5 cards!")


}


function checkHighWin() {
    console.log(' high clicked');
    indexCounter++;
    renderCard(myHand[indexCounter]);
    if (hiLoValues[indexCounter] > hiLoValues[indexCounter - 1]) {
        console.log("Win-Card is higher")
        let currentWinnings = parseInt(document.getElementById("winnings-amount").innerText);

        //double the current winnings
        currentWinnings *= 2;
        //display new winnings
        document.getElementById("winnings-amount").innerText = currentWinnings;
    } else {
        displayMessage("Lose-Card is lower");
        document.getElementById("winnings-amount").innerText = "0";
        setTimeout(shuffle, 5000);
        //hide the gamble winnings buttons
        document.getElementById("btn-bank-win").style.display = "none";
        document.getElementById("winnings").style.display = "none";
        document.getElementById("btn-high").style.display = "none";
        document.getElementById("btn-low").style.display = "none";


        //clear the game table for next deal
        //document.getElementById('card-table').innerHTML = '';

    }

    if (indexCounter === 4) {
        document.getElementById("btn-bank-win").style.display = "none";
        //document.getElementById("winnings").style.display = "none";
        document.getElementById("btn-high").style.display = "none";
        document.getElementById("btn-low").style.display = "none";
        displayMessage("Max Gambles Reached !!!")
        let currentWinnings = parseInt(document.getElementById("winnings-amount").innerText);
        let currentChipsAmount = parseInt(document.getElementById("current-chips").innerText);
        let newChipsAmount = currentChipsAmount + currentWinnings;
        document.getElementById("current-chips").innerText = newChipsAmount;
        setTimeout(shuffle, 5000);
    }
}

function checkLoWin() {
    console.log(' Low clicked');
    indexCounter++;
    renderCard(myHand[indexCounter]);
    if (hiLoValues[indexCounter] < hiLoValues[indexCounter - 1]) {
        console.log("Win-Card is lower")
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


        //clear the game table for next deal
        //document.getElementById('card-table').innerHTML = '';
    }
    if (indexCounter === 4) {
        document.getElementById("btn-bank-win").style.display = "none";
        //document.getElementById("winnings").style.display = "none";
        document.getElementById("btn-high").style.display = "none";
        document.getElementById("btn-low").style.display = "none";
        displayMessage("Max Gambles Reached !!!")
        let currentWinnings = parseInt(document.getElementById("winnings-amount").innerText);
        let currentChipsAmount = parseInt(document.getElementById("current-chips").innerText);
        let newChipsAmount = currentChipsAmount + currentWinnings;
        document.getElementById("current-chips").innerText = newChipsAmount;
        setTimeout(shuffle, 5000);
    }

}

function bankWinnings() {
    console.log('Bank Win clicked');
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

function load() {
    deck = getDeck();
    //shuffle();
}

window.onload = load;