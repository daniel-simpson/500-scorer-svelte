<script>
  import players from "../../../Player/Stores/player-store";
  import game from "../Stores/game-store";
</script>

<style>
  table,
  thead,
  tbody {
    width: 100%;
    border: 1px solid black;
    border-collapse: collapse;
  }

  tbody tr {
    border: 1px solid black;
  }

  td {
    padding: 0.5em 0;
  }

  .evens {
    background-color: #ddd;
  }
</style>

<table>
  <thead>
    <tr>
      <td colspan="2" />

      {#each $players as player, i}
        <td colspan="3" class:evens={i % 2 === 0}>{player}</td>
      {/each}
    </tr>
    <tr>
      <td title="Dealer">D</td>
      <td title="Number of Cards">#</td>

      {#each $players as player, i}
        <td class:evens={i % 2 === 0}>Wants</td>
        <td class:evens={i % 2 === 0}>Gets</td>
        <td class:evens={i % 2 === 0}>Score</td>
      {/each}
    </tr>
  </thead>

  <tbody>
    {#each $game.rounds as round}
      <tr>
        <td title={round.dealer}>{round.dealer[0]}</td>
        <td>{round.numCards}</td>

        {#each round.playerScores as playerScore, i}
          <td class:evens={i % 2 === 0}>{playerScore.estimate}</td>
          <td class:evens={i % 2 === 0}>{playerScore.actual}</td>
          <td class:evens={i % 2 === 0} class="score">{playerScore.score}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
