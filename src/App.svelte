<script>
  import gameList from "./Games/gamelist-store";

  import PlayerEntry from "./Player/Entry.svelte";

  let game = $gameList.length === 1 ? $gameList[0] : undefined;
  let status = "new-game";
  let winner = "";

  $: title =
    game != undefined ? `Playing ${game.name}...` : "Card games, baby!";

  function gameSelected(selectedGame) {
    game = selectedGame;
  }

  function resetSelection() {
    game = undefined;
    status = "new-game";
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
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

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

<svelte:head>
  <title>{title}</title>
</svelte:head>

<header>
  <h1>{title}</h1>

</header>
<main>
  {#if game === undefined}
    <p>Select a game:</p>
    {#each $gameList as gameItem}
      <button on:click={() => gameSelected(gameItem)}>{gameItem.name}</button>
    {/each}
  {:else}
    {#if $gameList.length !== 1}
      <small on:click={resetSelection}>Select a different game</small>
    {/if}

    {#if status === 'new-game'}
      <!--Add players-->
      <PlayerEntry
        requiredPlayers={game.requiredPlayers}
        on:entry-complete={entryComplete} />
    {:else if status === 'gameplay'}
      <!-- Gameplay-->
      <svelte:component this={game.component} on:game-finish={gameComplete} />
    {:else if status === 'complete'}
      <p>Congratulations {winner}!</p>
      <button on:click={resetSelection}>Play another game...</button>
    {/if}
  {/if}
</main>
