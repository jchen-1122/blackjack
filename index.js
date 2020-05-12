const elements = {
    dealerCards: document.querySelector(".dealer_hand"),
    dealerValue: document.querySelector(".dealer_value"),
    playerCards: document.querySelector(".player_hand"),
    playerValue: document.querySelector(".player_value"),
    hitButton: document.querySelector(".btn-hit"),
    standButton: document.querySelector(".btn-stand")
}

let finalDeck = [];

let playerHand = [];
let dealerHand = [];

// generate intial setup
const generateCards = () => {
    const playerGenerateCard = () => {
        const card = getTopCard();
            
        const markup = `
            <img src="cards/${card}.png">
            `;
        elements.playerCards.insertAdjacentHTML('beforeend', markup);
        const cardVal = cardValue(card);
        elements.playerValue.textContent = parseInt(elements.playerValue.textContent) + cardVal;
        playerHand.push(cardVal);
    };

    const dealerGenerateCard = () => {
        const card = getTopCard();
        const markup = `
            <img src="cards/${card}.png">
        `;
        elements.dealerCards.insertAdjacentHTML('beforeend', markup);
        const cardVal = cardValue(card);
        elements.dealerValue.textContent = cardVal;
        dealerHand.push(cardVal);
    };

    return {
        playerFirstCard: () => {
            burnTopCard();
            const card = getTopCard();
            
            const playerFirstMarkup = `
                <img src="cards/${card}.png">
                `;
            elements.playerCards.insertAdjacentHTML('beforeend', playerFirstMarkup);
            const cardVal = cardValue(card);
            elements.playerValue.textContent = cardVal;
            playerHand.push(cardVal);
        },

        dealerFaceDown: () => {
            const card = getTopCard();

            const faceDownMarkup = `
                 <img src="cards/back.png">
                `;
            const cardVal = cardValue(card);
            elements.dealerCards.insertAdjacentHTML('beforeend', faceDownMarkup);
            dealerHand.push(cardVal);
            return card;
        },
        playerNextCard: () => {
            playerGenerateCard();
        },
        dealerNextCard: () => {
            dealerGenerateCard();
        }
    }
}

const gameController = () => {

}

// get numerical value of card
const cardValue = card => {
    if (/^\d+$/.test(card.charAt(0))) {
        if (card.charAt(0) === "1") {
            return 10;
        } else {
            return parseInt(card.charAt(0));
        }
    } else if (card.charAt(0) === "A") {
        return 11;
    } else {
        return 10;
    }
}

// Fisher-Yates Shuffle (https://bost.ocks.org/mike/shuffle/)
const shuffle = () => {
    const deck = ["2C", "2D", "2H", "2S",
              "3C", "3D", "3H", "3S",
              "4C", "4D", "4H", "4S",
              "5C", "5D", "5H", "5S",
              "6C", "6D", "6H", "6S",
              "7C", "7D", "7H", "7S",
              "8C", "8D", "8H", "8S",
              "9C", "9D", "9H", "9S",
              "10C", "10D", "10H", "10S",
              "JC", "JD", "JH", "JS",
              "QC", "QD", "QH", "QS",
              "KC", "KD", "KH", "KS",
              "AC", "AD", "AH", "AS"];

    const numDecks = 2;

    // extend deck depending on numDecks
    for (let i = 0; i < numDecks; i++) {
        finalDeck.push(...deck);
    }

    let currentIndex = finalDeck.length, temporaryValue, randomIndex;

    // while there remain elements to shuffle...
    while (0 !== currentIndex) {

        // pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // and swap it with the current element.
        temporaryValue = finalDeck[currentIndex];
        finalDeck[currentIndex] = finalDeck[randomIndex];
        finalDeck[randomIndex] = temporaryValue;
    }

}

const getTopCard = () => {
    const top = finalDeck[0];
    finalDeck = finalDeck.slice(1);
    return top;
}

const burnTopCard = () => {
    finalDeck = finalDeck.slice(1);
}


const controller = () => {
    shuffle();
    generateCards().playerFirstCard();
    generateCards().dealerFaceDown();
    generateCards().playerNextCard();
    generateCards().dealerNextCard();

    elements.hitButton.addEventListener('click', e => {
        console.log("hit");
    });

    elements.standButton.addEventListener('click', e => {
        console.log("stand");
    });
}

controller();