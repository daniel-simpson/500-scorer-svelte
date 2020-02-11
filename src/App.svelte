<script>
  import PlayerEntry from "./Player/Entry.svelte";
  import fivehundred from "./Games/500/500.svelte";
  import buggerme from "./Games/BuggerMe/BuggerMe.svelte";
  import canasta from "./Games/Canasta/Canasta.svelte";

  let gameList = [
    {
      name: "500",
      requiredPlayers: [2, 4, 6],
      component: fivehundred
    },
    {
      name: "Bugger Me!",
      requiredPlayers: [],
      component: buggerme
    }
    // {
    //   name: "Canasta",
    //   requiredPlayers: [2, 4],
    //   component: canasta
    // }
  ];

  let game = gameList.length === 1 ? gameList[0] : undefined;
  let status = "gameplay"; //"new-game";
  let winner = "";

  $: title =
    game != undefined ? `Playing ${game.name}...` : "Card games, baby!";

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

<svelte:head>
  <title>{title}</title>
</svelte:head>

<main>
  <h1>{title}</h1>

  {#if game === undefined}
    <p>Select a game:</p>
    {#each gameList as gameItem}
      <button on:click={() => gameSelected(gameItem)}>{gameItem.name}</button>
    {/each}
  {:else}
    {#if gameList.length !== 1}
      <small
        on:click={() => {
          game = undefined;
        }}>
        Select a different game
      </small>
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
      <p>Congratulations team {winner}!</p>
    {/if}
  {/if}
</main>
