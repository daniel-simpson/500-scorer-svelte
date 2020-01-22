<script>
  import Suit from "./Suit.svelte";

  export let amount;
  export let suit = {};
  export let player;

  console.log(suit);
</script>

<span>
  {amount}
  <Suit {suit} />
  {player[0]}
</span>
