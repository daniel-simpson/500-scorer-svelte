<script>
  import players from "../../../Player/Stores/player-store";

  import {
    getMaxNumberOfCards,
    getNumberOfRounds,
    getCardsInPlay
  } from "../util";

  export let numberOfCardsInPlay;
  export let displayTotalCardNumber = false;

  $: maxNumberOfCards = getMaxNumberOfCards(
    numberOfCardsInPlay,
    $players.length
  );
  $: numberOfRounds = getNumberOfRounds(numberOfCardsInPlay, $players.length);
  $: cardsInPlay = getCardsInPlay(numberOfCardsInPlay);
</script>

<blockquote>
  {#if displayTotalCardNumber}
    <p>Selected {numberOfCardsInPlay} cards</p>
  {/if}
  <p>There are {$players.length} players in this game</p>
  <p>Biggest round has {maxNumberOfCards} cards each</p>
  <p>Which means {numberOfRounds} rounds</p>
  <p>And playing with {cardsInPlay}</p>
</blockquote>
