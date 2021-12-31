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

/** 
 * Takes 5 cards from top of deck 
 * and adds to players hand 
 */
function dealCards() {
    //deal 5 cards from the deck and add to hand
    for (let i = 0; i < 5; i++) {
        myHand[i] = deck.pop();
    }
    //display the hand on the game table
    renderHand(myHand);

    //hide the deal button after the initial deal and display the draw button
    document.getElementById("btn-deal").style.display = "none";
    document.getElementById("btn-draw").style.display = "inline-block";
}

/**
 * creates a new 5 card hand from held cards plus draw new cards from deck
 */
function drawCards() {
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
    renderHand(myHeldCards);
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

function load() {
    deck = getDeck();
    shuffle();
}

window.onload = load;