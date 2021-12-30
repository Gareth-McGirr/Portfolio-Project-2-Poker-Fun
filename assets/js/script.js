//global variable array to hold the deck of cards 
let deck = new Array();
//global variable array to hold the players 5 cards 
let myHand = new Array();

//event listeners
document.getElementById("btn-deal").addEventListener("click", dealCards);


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

    for (let i = 0; i < 5; i++) {
        myHand[i] = deck.pop();
    }
    renderHand(myHand);
    document.getElementById("btn-deal").style.display = "none";
    document.getElementById("btn-draw").style.display = "inline-block";
}


function renderHand(hand) {
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
        
        //click event to hold a card
        card.addEventListener("click", function () {
            this.classList.toggle("selected");
        });

        document.getElementById("card-table").appendChild(card);
    }
}

function load() {
    deck = getDeck();
    shuffle();
}

window.onload = load;