//global variable array to hold the deck of cards 
let deck = new Array();
//global variable array to hold the players 5 cards 
let myHand = new Array();



//event listeners
document.getElementById("btn-deal").addEventListener("click", dealCards);
document.getElementById("btn-draw").addEventListener("click", drawCards);

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

    for (let i = 0; i < 1000; i++) {
        let location1 = Math.floor((Math.random() * deck.length));
        let location2 = Math.floor((Math.random() * deck.length));
        let tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
}

function takeBet() {
    let betAmount = document.getElementById("bet-amount").value;
    console.log(betAmount);
    let currentChipsAmount = parseInt(document.getElementById("current-chips").innerText);
    console.log(currentChipsAmount);
    if (currentChipsAmount > betAmount) {
        let newChipsAmount = currentChipsAmount - betAmount;
        console.log(newChipsAmount);
        document.getElementById("current-chips").innerText = newChipsAmount;
        return true;
    } else {
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
    } else {
        alert("Insufficent funds for this bet !!!!")
    }

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
    if (values[0] === values[1] || values[1] === values[2] || values[2] === values[3] || values[3] === values[4]) {
        return true;
    } else {
        return false;
    }
}

function isFullHouse(values) {
    let valuesReversed = values.slice().reverse();
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
        alert("Royal Flush");
        //call function and pass multiple of bet to calc win for the hand
        gambleWinnings(500);
    } else if (isStraightFlush(cards)) {
        alert("Straight Flush");
        gambleWinnings(60);
    } else if (isFourOfKind(sortCardsByValue(cards))) {
        alert("Four of a kind");
        gambleWinnings(25);
    } else if (isFullHouse(sortCardsByValue(cards))) {
        alert("Full House");
        gambleWinnings(10);
    } else if (isFlush(cards)) {
        alert("Flush");
        gambleWinnings(5);
    } else if (isStraight(sortCardsByValue(cards))) {
        alert("Straight");
        gambleWinnings(4);
    } else if (isThreeOfKind(sortCardsByValue(cards))) {
        alert("Three of a kind");
        gambleWinnings(3);
    } else if (isTwoPair(sortCardsByValue(cards))) {
        alert("Two pair");
        gambleWinnings(2);
    } else if (isPair(sortCardsByValue(cards))) {
        alert("A Pair");
        gambleWinnings(1);
    } else {
        alert("No Winning hand");
    }

}

function gambleWinnings(winMultiplyer) {
    //deck = getDeck();
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

    //display first card
    renderCard(myHand[0]);
    highLowOrBank();

}

function highLowOrBank() {
    //set initial index
    let index = 0;
    let values = convertCardsToValues(myHand);
    

    document.getElementById('btn-high').addEventListener('click', function () {
        console.log(' high clicked');
        index++;
        renderCard(myHand[index]);
        if (values[index] > values[index - 1]) {
            console.log("Win-Card is higher")
            let currentWinnings = parseInt(document.getElementById("winnings-amount").innerText);

            //double the current winnings
            currentWinnings *= 2;
            //display new winnings
            document.getElementById("winnings-amount").innerText = currentWinnings;
        } else {
            console.log("Lose-Card is lower");
            document.getElementById("winnings-amount").innerText = "0";
        }

    });
    document.getElementById('btn-low').addEventListener('click', function () {
        console.log('low clicked');
        index++;
        renderCard(myHand[index]);
        if (values[index] < values[index - 1]) {
            console.log("Win-Card is lower")
            let currentWinnings = parseInt(document.getElementById("winnings-amount").innerText);

            //double the current winnings
            currentWinnings *= 2;
            //display new winnings
            document.getElementById("winnings-amount").innerText = currentWinnings;
        } else {
            console.log("Lose-Card is higher");
            document.getElementById("winnings-amount").innerText = "0";
        }
    });
    document.getElementById('btn-bank-win').addEventListener('click', function () {
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

        //clear the game table for next deal
        document.getElementById('card-table').innerHTML = '';
    });



}

function load() {
    deck = getDeck();
    //shuffle();
}

window.onload = load;