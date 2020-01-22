<script>
  export let players;
  export let dealerIndex;

  $: dealer = players[dealerIndex];
</script>

<style>
  ul {
    padding-left: 0;
    display: flex;
    width: 100%;
  }
  li {
    margin-left: auto;
    margin-right: auto;
    list-style: none;
  }
</style>

<ul>
  {#each players as player}
    <li class="team">
      {player}
      <!-- {#if player === dealer}
        &nbsp;-&nbsp;
        <strong>DEALER</strong>
      {/if} -->
    </li>
  {/each}
</ul>
