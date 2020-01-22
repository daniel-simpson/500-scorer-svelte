<script>
  import { createEventDispatcher } from "svelte";
  import players from "./player-store.js";

  const dispatch = createEventDispatcher();

  let playerName = "";
  let error = "";

  function addPlayerEnter(event) {
    console.log(event);
    if (event.keyCode == 13) {
      addPlayer();
    }
  }

  function addPlayer() {
    if (playerName.length == 0) {
      error = "Please enter a name";
      return;
    }

    if ($players.includes(playerName)) {
      error = "Player name already exists.  Please enter a unique player name";
      return;
    }

    error = "";

    players.addPlayer(playerName);
    playerName = "";
  }

  function removePlayer(player) {
    players.removePlayer(player);
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

<div>
  <div>
    <input type="text" bind:value={playerName} on:keyup={addPlayerEnter} />
    <button on:click={addPlayer}>Add Player</button>
    <p class="error">{error}</p>
  </div>

  {#if players && players.length > 0}
    <ul>
      {#each players as player}
        <li on:click={() => removePlayer(player)}>{player}</li>
      {/each}
    </ul>
    <small>Note: Click a player to remove them</small>

    <button
      on:click={() => {
        dispatch('entry-complete');
      }}>
      Let's Play!
    </button>
  {/if}
</div>
