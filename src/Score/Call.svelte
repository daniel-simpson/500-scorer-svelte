<script>
  import Suit from "./Suit.svelte";

  export let amount;
  export let suit = {};
  export let player;
  export let team;
  export let score;

  console.log(suit);
</script>

<style>
  .red {
    color: red;
  }
</style>

<span class:red={team === 'red'} title="Worth {score} points">
  {amount}
  <Suit {suit} />
  {player[0]}
</span>
