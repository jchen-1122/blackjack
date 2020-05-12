const elements = {
    dealerCards: document.querySelector(".dealer_hand"),
    dealerValue: document.querySelector(".dealer_value")
}

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
const finalDeck = [];
for (let i = 0; i < numDecks; i++) {
    finalDeck.push(...deck);
}

// generate one face down card and one card up
const generateDealerCard = () => {
    // face down
    const faceDown = Math.floor(Math.random() * finalDeck.length); // TODO: Can't be random
    const faceDownMarkup = `
        <img src="cards/back.png">
    `;
    elements.dealerCards.insertAdjacentHTML('beforeend', faceDownMarkup);

    const randomCard = Math.floor(Math.random() * finalDeck.length); // TODO: Can't be random
    const markup = `
        <img src="cards/${finalDeck[randomCard]}.png">
    `;
    elements.dealerCards.insertAdjacentHTML('beforeend', markup);
    elements.dealerValue.textContent = cardValue(finalDeck[randomCard]);
    return faceDown;
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

const controller = () => {
    shuffle();
    const indexOfFlipped = generateDealerCard();
}

controller();