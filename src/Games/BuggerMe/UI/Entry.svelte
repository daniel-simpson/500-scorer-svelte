<script>
  import { createEventDispatcher, onDestroy } from "svelte";
  import playerStore from "../../../Player/Stores/player-store";

  let dispatch = createEventDispatcher();

  let players = [];
  let scores = [];

  let unsubscribe = playerStore.subscribe(p => {
    players = p;
    scores = new Array(players.length);
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  $: isValid = validateInputs(scores);

  function validateInputs(scores) {
    return !scores.includes(undefined) && !scores.includes("");
  }

  function entryComplete() {
    if (isValid) {
      dispatch("entryComplete", scores);
    }
  }
</script>

<style>
  ul {
    list-style: none;
    padding: 0;
  }
</style>

<form on:submit|preventDefault={entryComplete}>
  <ul>
    {#each players as player, i}
      <li>
        <label>{player}</label>
        <input type="number" bind:value={scores[i]} />
      </li>
    {/each}
  </ul>
  <button type="submit" disabled={!isValid}>Submit</button>
</form>
