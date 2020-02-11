<script>
  import { createEventDispatcher, onDestroy } from "svelte";

  import gameStore from "./Stores/game-store";

  import Entry from "./UI/Entry.svelte";
  import PickNumberOfCards from "./UI/PickNumberOfCards.svelte";
  import Scorecard from "./UI/Scorecard.svelte";

  let rounds = [];
  let currentRoundIndex = 0;
  let unsubscribeGame = gameStore.subscribe(gameData => {
    if (!gameData) {
      return;
    }

    rounds = gameData.rounds;
    currentRoundIndex = gameData.currentRoundIndex;
  });

  let status = "setup";
  $: console.log("status", status);

  $: console.log("currentRoundIndex", currentRoundIndex);
  $: console.log("rounds", rounds);

  onDestroy(() => {
    if (unsubscribeGame) {
      unsubscribeGame();
    }
  });

  let maximumCards = 0;
  function onSetupComplete(event) {
    gameStore.init(event.detail);
    status = "bidding";
  }

  function bidComplete(event) {
    const estimates = event.detail;
    gameStore.addEstimate();
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
