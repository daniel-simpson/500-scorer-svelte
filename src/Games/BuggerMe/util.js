export const getLargestNumberOfCardsDivisbleByPlayers = players => {
  const numPlayers = players.length;

  for (let i = 52; i > 0; i--) {
    if (i % numPlayers === 0) {
      return i;
    }
  }
  return undefined;
};

export const getMaxNumberOfCards = (numCardsInPlay, numPlayers) => {
  return numCardsInPlay / numPlayers;
};

export const getNumberOfRounds = (numCardsInPlay, numPlayers) => {
  const maxCards = getMaxNumberOfCards(numCardsInPlay, numPlayers);
  return maxCards * 2 + 1;
};

export const getCardsInPlay = numberOfCardsInPlay => {
  const cardNumbers = [
    "Ace",
    "King",
    "Queen",
    "Jack",
    10,
    9,
    8,
    7,
    6,
    5,
    4,
    3,
    2
  ];

  const remainder = numberOfCardsInPlay % 4;

  switch (remainder) {
    case 0:
      return `${cardNumbers[numberOfCardsInPlay / 4]}s up`;
    case 1:
      return `${
        cardNumbers[Math.floor(numberOfCardsInPlay / 4)]
      } of Hearts up (no diamonds, clubs or spades)`;
    case 2:
      return `Red ${cardNumbers[Math.floor(numberOfCardsInPlay / 4)]}s up`;
    case 3:
      return `${
        cardNumbers[Math.floor(numberOfCardsInPlay / 4)]
      } of Clubs up (no spades)`;
  }
};

export const computeGameInfo = (numberOfCardsInPlay, numPlayers) => {
  return {
    numberOfPlayers: numPlayers,
    maxNumberOfCards: getMaxNumberOfCards(numberOfCardsInPlay, numPlayers),
    numberOfRounds: getNumberOfRounds(numberOfCardsInPlay, numPlayers),
    cardsInPlay: getCardsInPlay(numberOfCardsInPlay)
  };
};
