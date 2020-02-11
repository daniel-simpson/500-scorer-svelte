<script>
  import { createEventDispatcher, onDestroy } from "svelte";
  import minBy from "lodash.minby";

  import gameStore from "./Stores/game-store";
  import players from "../../Player/Stores/player-store";

  import Entry from "./UI/Entry.svelte";
  import PickNumberOfCards from "./UI/PickNumberOfCards.svelte";
  import Scorecard from "./UI/Scorecard.svelte";

  let dispatch = createEventDispatcher();

  let rounds = [];
  let currentRoundIndex = 0;
  let unsubscribeGame = gameStore.subscribe(gameData => {
    if (!gameData) {
      return;
    }

    rounds = gameData.rounds;
    currentRoundIndex = gameData.currentRoundIndex;

    if (currentRoundIndex >= rounds.length) {
      // Game is over, calculate the winner

      const lastRound = rounds[rounds.length - 1];
      const lowestScore = minBy(lastRound.playerScores, x => x.score).score;
      const winningPlayerIndexes = lastRound.playerScores.reduce(
        (acc, x, i) => {
          if (x.score === lowestScore) {
            acc.push(i);
          }
          return acc;
        },
        []
      );

      const winningPlayers = winningPlayerIndexes.map(i => $players[i]);

      dispatch("game-finish", winningPlayers.join(", "));
    }
  });

  let status = "setup";
  let gameInfo = undefined;

  onDestroy(() => {
    if (unsubscribeGame) {
      unsubscribeGame();
    }
  });

  let maximumCards = 0;
  function onSetupComplete(event) {
    gameStore.init(event.detail);
    gameInfo = event.detail;
    status = "bidding";
  }

  function bidComplete(event) {
    const estimates = event.detail;
    gameStore.addEstimate(estimates);
    status = "scoring";
  }

  function scoreComplete(event) {
    const actuals = event.detail;
    gameStore.addActual(actuals);
    status = "bidding";
  }
</script>

<h1>Bugger Me!</h1>

{#if status !== 'setup'}
  <Scorecard {rounds} />
{/if}

{#if status === 'setup'}
  <PickNumberOfCards on:setupComplete={onSetupComplete} />
{:else if status === 'bidding'}
  <h3>Wants</h3>
  <Entry on:entryComplete={bidComplete} />
{:else if status === 'scoring'}
  <h3>Gets</h3>
  <Entry on:entryComplete={scoreComplete} />
{/if}
