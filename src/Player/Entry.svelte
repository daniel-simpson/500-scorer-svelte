<script>
  import { createEventDispatcher, onDestroy } from "svelte";
  import playersStore from "./Stores/player-store.js";

  export let requiredPlayers = [];

  const dispatch = createEventDispatcher();

  let playerName = "";
  let error = "";
  let canSubmit = false;
  let players = [];

  let unsubscribe = playersStore.subscribe(items => {
    players = items;

    if (requiredPlayers.length > 0) {
      canSubmit = requiredPlayers.includes(players.length);
    } else {
      canSubmit = players.length > 1;
    }
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  function addPlayer() {
    if (playerName.length == 0) {
      error = "Please enter a name";
      return;
    }

    if (players.includes(playerName)) {
      error = "Player name already exists.  Please enter a unique player name";
      return;
    }

    error = "";

    playersStore.addPlayer(playerName);
    playerName = "";
  }

  function removePlayer(player) {
    playersStore.removePlayer(player);
  }

  function entryComplete() {
    if (canSubmit) {
      dispatch("entry-complete");
    }
  }
</script>

<style>
  li {
    list-style: none;
  }
  li:nth-child(2n) {
    color: red;
  }

  .error {
    font-weight: bold;
    color: red;
  }
</style>

<section>
  <h1>Players</h1>
  <p>Please enter player details to continue...</p>

  <form on:submit|preventDefault={addPlayer}>
    <input type="text" bind:value={playerName} />
    <button type="submit">Add Player</button>
    <p class="error">{error}</p>
  </form>

  {#if players && players.length > 0}
    <ul>
      {#each players as player}
        <li on:click={() => removePlayer(player)}>{player}</li>
      {/each}
    </ul>
    <small>Note: Click a player to remove them</small>

    <button disabled={!canSubmit} on:click={entryComplete}>Let's Play!</button>
  {/if}
</section>
