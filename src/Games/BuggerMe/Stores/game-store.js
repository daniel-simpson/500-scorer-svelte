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
      let currentRound = rounds[currentRoundIndex];

      currentRound.playerScores = estimates.map(e => {
        return {
          estimate: e,
          actual: "",
          score: ""
        };
      });

      let newRounds = [...rounds];
      newRounds[currentRoundIndex] = currentRound;

      return {
        currentRoundIndex,
        rounds: newRounds
      };
    });
  },

  addActual: actuals => {
    gameStore.update(({ currentRoundIndex, rounds }) => {
      const previousRound =
        currentRoundIndex > 0 ? rounds[currentRoundIndex - 1] : undefined;
      let currentRound = rounds[currentRoundIndex];

      if (actuals.length != currentRound.playerScores.length) {
        console.error(
          "Unexpected actuals length:",
          actuals.length,
          currentRound.playerScores.length
        );
      }

      currentRound.playerScores = currentRound.playerScores.map((x, i) => {
        const previousRoundScore = previousRound
          ? previousRound.playerScores[i]
          : 0;
        const expected = x.expected;
        const actual = actuals[i];

        const roundScore = 5 * Math.abs(expected - actual);

        return {
          expected: x.expected,
          actual: actual,
          score: previousRoundScore + roundScore
        };
      });

      let newRounds = [...rounds];
      newRounds[currentRoundIndex] = currentRound;

      return {
        currentRoundIndex: currentRoundIndex + 1,
        rounds: newRounds
      };
    });
  }
};
