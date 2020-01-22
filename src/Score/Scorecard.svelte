<script>
  export let players;
  export let rounds;

  $: numberOfPlayersPerTeam = players.length / 2;
  $: console.log("Rounds", rounds);
</script>

<style>
  table,
  thead,
  tr,
  td {
    border: 1px solid black;
  }
  table,
  thead {
    border: 2px solid black;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  tbody > tr:nth-child(2n) {
    background-color: gray;
  }
</style>

<table>
  <thead>
    <tr>
      <td>Dealer</td>
      <td>Call</td>
      <td class="team" colspan={numberOfPlayersPerTeam}>Team {players[0]}</td>
      <td class="team" colspan={numberOfPlayersPerTeam}>Team {players[1]}</td>
    </tr>

    <!--TODO: Add player names by team-->
    <tr>
      <td />
      <td />
      {#each players.filter((p, i) => i % 2 == 0) as player}
        <td>{player}</td>
      {/each}

      {#each players.filter((p, i) => i % 2 == 1) as player}
        <td>{player}</td>
      {/each}
    </tr>
  </thead>

  <tbody>
    {#each rounds as round}
      <tr>
        <!-- Display Rounds -->
        <td>{round.dealer}</td>
        <td>{round.call}</td>
        <td colspan={numberOfPlayersPerTeam}>{round.blueScore}</td>
        <td colspan={numberOfPlayersPerTeam}>{round.redScore}</td>
      </tr>
    {/each}
  </tbody>
</table>
