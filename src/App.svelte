<script>
  import dealer from "./Player/dealer-store";

  import PlayerEntry from "./Player/Entry.svelte";
  import PlayerTable from "./Player/TableView.svelte";
  import Scorecard from "./Score/Scorecard.svelte";

  let status = "gameplay"; //"new-game";
  $: console.log("Dealer", $dealer);

  function entryComplete() {
    status = "gameplay";
  }

  function gameComplete() {
    status = "complete";
  }
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    max-width: 900px;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 2rem;
    font-weight: 100;
  }

  .input-section {
    display: flex;
    width: 200%;
    overflow: hidden;
    transition: margin-left 700ms;
  }

  .input-section.scoring {
    margin-left: auto;
  }

  .input-section > * {
    width: 100%;
  }

  @media (min-width: 640px) {
    h1 {
      font-size: 4rem;
    }
  }
</style>

<main>
  <h1>500 scorecard</h1>

  {#if status === 'new-game'}
    <PlayerEntry on:entry-complete={entryComplete} />
  {:else if status === 'gameplay'}
    <!-- <PlayerTable /> -->
    <Scorecard on:game-finish={gameComplete} />
  {:else if status === 'complete'}
    <p>Congratulations</p>
  {/if}

</main>
