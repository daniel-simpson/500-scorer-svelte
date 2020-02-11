<script>
  import { createEventDispatcher } from "svelte";
  import players from "../../../Player/Stores/player-store";

  import { getLargestNumberOfCardsDivisbleByPlayers } from "../util";

  import GameInfo from "./GameInfo.svelte";

  let maxCards = getLargestNumberOfCardsDivisbleByPlayers($players);
  let numberOfCardsInPlay = maxCards;

  let dispatch = createEventDispatcher();
  function onSelectionComplete() {
    dispatch("setupComplete", {
      players: $players,
      numberOfCardsInPlay
    });
  }
</script>

<form on:submit|preventDefault={onSelectionComplete}>
  <h2>Select how many cards do you want to play with?</h2>
  <input
    type="range"
    min={$players.length * 2}
    max={maxCards}
    step={$players.length}
    bind:value={numberOfCardsInPlay} />

  <GameInfo {numberOfCardsInPlay} displayTotalCardNumber={true} />

  <button type="submit">Submit</button>
</form>
