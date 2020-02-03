<script>
  import PlayerEntry from "./Player/Entry.svelte";
  import fivehundred from "./Games/500/500.svelte";

  const gameList = [
    {
      name: "500",
      needsEvenPlayers: true,
      component: fivehundred
    },
    {
      name: "Bugger Me!",
      needsEvenPlayers: false,
      component: null
    }
  ];

  let game = {};
  let status = "new-game";
  let winner = "";

  function gameSelected(selectedGame) {
    game = selectedGame;
  }

  function entryComplete() {
    status = "gameplay";
  }

  function gameComplete(event) {
    status = "complete";
    winner = event.detail;
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

  @media (min-width: 640px) {
    h1 {
      font-size: 4rem;
    }
  }
</style>

<main>
  <h1>Card games, baby!</h1>

  <!--Choose game-->
  {#if !game || !game.name}
    <p>Select a game:</p>
    <ul>
      {#each gameList as gameItem}
        <li on:click={gameSelected(gameItem)}>{gameList.name}</li>
      {/each}
    </ul>
  {:else}
    <small on:click{()>{(game = {})}>Select a different game</small>
    <h2>{game.name}</h2>

    {#if status === 'new-game'}
      <!--Add players-->
      <PlayerEntry
        needsEvenPlayers={game.needsEvenPlayers}
        on:entry-complete={entryComplete} />
    {:else if status === 'gameplay'}
      <!-- Gameplay-->
      <svelte:component this={fivehundred} on:game-finish={gameComplete} />
    {:else if status === 'complete'}
      <p>Congratulations team {winner}!</p>
    {/if}
  {/if}
</main>
