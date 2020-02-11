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

  $: isNotValid = isNotValidTest(scores);

  function isNotValidTest(scores) {
    return scores.includes(undefined) || scores.includes("");
  }

  function entryComplete() {
    dispatch("entryComplete", scores);
  }
</script>

<style>
  ul {
    list-style: none;
    padding: 0;
  }
</style>

<section>
  <ul>
    {#each players as player, i}
      <li>
        <label>{player}</label>
        <input type="number" bind:value={scores[i]} />
      </li>
    {/each}
  </ul>
  <button disabled={isNotValid} on:click={entryComplete}>Submit</button>
</section>
