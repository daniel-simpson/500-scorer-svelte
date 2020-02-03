<script>
  import Suit from "../../../UI/DisplaySuit.svelte";

  export let amount;
  export let suit = {};
  export let player;
  export let team;
  export let score;
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
