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

/** Takes 5 cards from top of deck 
 * and adds to players hand 
 * 
 */
function dealCards() {

    for (let i = 0; i < 5; i++) {
        myHand[i] = deck.pop();
    }
    renderHand(myHand);
}


function renderHand(hand) {
    document.getElementById('card-table').innerHTML = '';
    for (let i = 0; i < hand.length; i++) {
        let card = document.createElement("div");
        let value = document.createElement("div");
        let suit = document.createElement("div");
        card.className = "card dealt-card";
        value.className = "value";
        suit.className = "suit " + hand[i].suit;

        value.innerHTML = hand[i].value;
        card.appendChild(value);
        card.appendChild(suit);
        document.getElementById("card-table").appendChild(card);
    }
}

function load() {
    deck = getDeck();
}

window.onload = load;