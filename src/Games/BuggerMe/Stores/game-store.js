import { writable } from "svelte/store";
import { getMaxNumberOfCards, getNumberOfRounds } from "../util";

const gameStore = writable(undefined);

/*
Example round structure:

{
  currentRoundIndex: 0,
  rounds: [
    {
      dealer: "NAME",
      numCards: 9,
      playerScores: [
        {
          estimate: 1,
          actual: 1,
          score: 0,
        },
        {
          estimate: 0,
          actual: 1,
          score: 0,
        }
      ]
    },
    ...
  ]
}
*/

export default {
  subscribe: gameStore.subscribe,

  init: ({ players, numberOfCardsInPlay }) => {
    let dealerIndex = Math.floor(Math.random() * players.length + 1);
    const numberOfRounds = getNumberOfRounds(
      numberOfCardsInPlay,
      players.length
    );

    const maxNumberOfCards = getMaxNumberOfCards(
      numberOfCardsInPlay,
      players.length
    );

    let rounds = [];
    let emptyPlayerScore = [];
    for (let i = 0; i < players.length; i++) {
      emptyPlayerScore.push({
        estimate: "",
        actual: "",
        score: ""
      });
    }

    for (let i = maxNumberOfCards; i > 1; i--) {
      rounds.push({
        dealer: players[++dealerIndex % players.length],
        numCards: i,
        playerScores: [...emptyPlayerScore]
      });
    }

    for (let i = 1; i <= maxNumberOfCards; i++) {
      rounds.push({
        dealer: players[++dealerIndex % players.length],
        numCards: i,
        playerScores: [...emptyPlayerScore]
      });
    }

    rounds.push({
      dealer: players[++dealerIndex % players.length],
      numCards: 1,
      playerScores: [...emptyPlayerScore]
    });

    rounds.push({
      dealer: players[++dealerIndex % players.length],
      numCards: maxNumberOfCards,
      playerScores: [...emptyPlayerScore]
    });

    gameStore.update(() => {
      return {
        currentRoundIndex: 0,
        rounds: [...rounds]
      };
    });
  },

  addEstimate: estimates => {
    gameStore.update(({ currentRoundIndex, rounds }) => {
      // Create new rounds, add estimates
      let currentRound = rounds[currentRoundIndex];

      currentRound.playerScores = estimates.map(e => {
        return {
          estimate: e,
          actual: "",
          score: ""
        };
      });

      return {
        currentRoundIndex: currentRoundIndex,
        //TODO: splice correct element out and back in below
        rounds: [...game.rounds, currentRound, ...game.rounds]
      };
    });
  },

  addActual: actuals => {
    //TODO: fix this
    gameStore.update(game => {
      var rounds = game.rounds;
      var currentRound = rounds.pop();

      let newDirection = game.direction;
      if (game.rounds.length > 0 && currentRound.numCards === 1) {
        newDirection = game.direction * -1;
      }

      //TODO: Add actuals and compute scores

      return {
        ...game,
        direction: newDirection,
        rounds: [...rounds, currentRound]
      };
    });
  }
};
