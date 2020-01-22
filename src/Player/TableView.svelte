<script>
  import players from "./player-store";
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
  {#each $players as player}
    <li class="team">{player}</li>
  {/each}
</ul>
