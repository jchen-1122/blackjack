const elements = {
    dealerCards: document.querySelector(".dealer_hand"),
    dealerValue: document.querySelector(".dealer_value"),
    playerCards: document.querySelector(".player_hand"),
    playerValue: document.querySelector(".player_value"),
    hitButton: document.querySelector(".btn-hit"),
    standButton: document.querySelector(".btn-stand"),
    newButton: document.querySelector(".btn-new"),
}

let finalDeck = [];

let playerHand = [];
let playerTotal = 0;
let dealerHand = [];
let dealerTotal = 0;
let faceDown = -1;
let stand = false;
let bust = false;

// card controller
const generateCards = () => {
    const playerGenerateCard = () => {
        const card = getTopCard();
        const cardVal = cardValue(card);
        const markup = `
            <img src="cards/${card}.png">
            `;
        elements.playerCards.insertAdjacentHTML('beforeend', markup);
        playerHand.push(cardVal);
        playerTotal = sumOfCards(playerHand);
        if (playerTotal > 21) {
            bust = true;
        }
        elements.playerValue.textContent = playerTotal;
    };

    const dealerGenerateCard = () => {
        const card = getTopCard();
        const cardVal = cardValue(card);
        dealerHand.push(cardVal);
        dealerTotal = sumOfCards(dealerHand);
        const markup = `
            <img src="cards/${card}.png">
        `;
        elements.dealerCards.insertAdjacentHTML('beforeend', markup);
        elements.dealerValue.textContent = dealerTotal;
    };

    const sumOfCards = cardArr => {
        if (cardArr.length === 2 && cardArr[0] + cardArr[1] === 21) {
            return 21;
        } 
        let sumWOAce = 0;
        let numAces = 0;
        cardArr.forEach(el => {
            if (el !== 11) {
                sumWOAce += el;
            } else {
                numAces += 1;
            }
        });
        if (sumWOAce <= 10 && numAces >= 1) {
            return sumWOAce + 11 + (numAces - 1);
        } else if (sumWOAce > 10 && numAces >= 1) {
            return sumWOAce + numAces;
        } else {
            return sumWOAce;
        }
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
                 <img src="cards/back.png" id="0">
                `;
            const cardVal = cardValue(card);
            elements.dealerCards.insertAdjacentHTML('beforeend', faceDownMarkup);
            return card;
        },
        playerNextCard: () => {
            playerGenerateCard();
        },
        dealerNextCard: () => {
            dealerGenerateCard();
        },
        flipCard: () => {
            const markup = `
                <img src="cards/${faceDown}.png">
            `;
            document.getElementById("0").parentNode.removeChild(document.getElementById("0"));
            elements.dealerCards.insertAdjacentHTML('afterbegin', markup);
            const cardVal = cardValue(faceDown);
            dealerHand.push(cardVal);
            dealerTotal = sumOfCards(dealerHand);
            elements.dealerValue.textContent = dealerTotal;
        }
    }
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

const clear = () => {
    playerHand = [];
    playerTotal = 0;
    dealerHand = [];
    dealerTotal = 0;
    faceDown = -1;
    stand = false;
    bust = false;
    elements.dealerCards.innerHTML = '';
    elements.playerCards.innerHTML = '';
}


const controller = () => {
    shuffle();
    clear();
    generateCards().playerFirstCard();
    faceDown = generateCards().dealerFaceDown();
    generateCards().playerNextCard();
    generateCards().dealerNextCard();
    

}

elements.newButton.addEventListener('click', e => {
    controller();
});

elements.hitButton.addEventListener('click', e => {
    if (playerTotal <= 21 && !stand) {
        generateCards().playerNextCard();
    }
    if (bust || playerTotal === 21) {
        bustOrStand();
    }
});

const bustOrStand = () => {
    stand = true;
    generateCards().flipCard();
    while (dealerTotal < 17) {
        generateCards().dealerNextCard();
    }
    let won;
    if (bust) {
        won = 'You Lost. Try Again.';
    } else if (dealerTotal > 21) {
        won = 'You Won!';
    } else if (dealerTotal > playerTotal) {
        won = 'You Lost. Try Again.';
    } else if (dealerTotal < playerTotal) {
        won = 'You Won!';
    } else {
        won = 'Push!';
    }
    const finalMessage = `Dealer had ${dealerTotal}. You had ${playerTotal}. ${won}`
    elements.dealerValue.textContent = finalMessage;
}

elements.standButton.addEventListener('click', e => {
    if (!bust) {
        bustOrStand();
    }
});