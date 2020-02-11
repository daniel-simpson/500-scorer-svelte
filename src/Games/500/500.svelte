<script>
  import { createEventDispatcher, onDestroy } from "svelte";

  import players from "../../Player/Stores/player-store";

  import dealer from "./Stores/dealer-store";
  import roundsStore from "./Stores/rounds-store";
  import { blackTeamStore, redTeamStore } from "./Stores/team-store";

  import Bid from "./UI/Bid.svelte";
  import Call from "./UI/Call.svelte";

  $: numberOfPlayersPerTeam = $players.length / 2;
  let dispatch = createEventDispatcher();
  let isBidding = true;
  let currentBid = null;

  let rounds = [];
  const unsubscribeRounds = roundsStore.subscribe(items => {
    rounds = items;

    isBidding = true;
    currentBid = {
      index: rounds.length + 1,
      dealer: $dealer,
      blackTricks: 0,
      redTricks: 0
    };

    // If no rounds are complete (first load) then bail
    if (rounds.length === 0) return;

    const latestRound = rounds[rounds.length - 1];
    if (latestRound.blackScore >= 500 || latestRound.redScore <= -500) {
      currentBid = null;
      isBidding = false;
      dispatch("game-finish", `team black - ${$blackTeamStore.join(", ")}!`);
    } else if (latestRound.redScore >= 500 || latestRound.blackScore <= -500) {
      currentBid = null;
      isBidding = false;
      dispatch("game-finish", `team red - ${$redTeamStore.join(", ")}!`);
    }
  });

  onDestroy(() => {
    if (unsubscribeRounds) {
      unsubscribeRounds();
    }
  });

  function bidComplete(call) {
    isBidding = false;
    currentBid = {
      ...currentBid,
      call: call.detail
    };
  }

  function roundComplete() {
    // Add score to current bid and push to rounds
    roundsStore.addRound({
      ...currentBid
    });
  }
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

  tfoot input {
    width: 100%;
    height: 100%;
    margin: 0 0 0 0;
  }
</style>

<h1>Five Hundred</h1>

<section>
  <table>
    <thead>
      <tr>
        <td rowspan="0">#</td>
        <td rowspan="0">Dealer</td>
        <td rowspan="0">Call</td>
        <td class="team" colspan={numberOfPlayersPerTeam}>Team Black</td>
        <td class="team" colspan={numberOfPlayersPerTeam}>Team Red</td>
      </tr>

      <tr>

        {#each $blackTeamStore as player (player)}
          <td>{player}</td>
        {/each}

        {#each $redTeamStore as player (player)}
          <td>{player}</td>
        {/each}
      </tr>
    </thead>

    <!-- Display Rounds -->
    <tbody>
      {#each rounds as round (round.index)}
        <tr>
          <td>{round.index}</td>
          <td>{round.dealer}</td>
          <td>
            <Call {...round.call} />
          </td>
          <td colspan={numberOfPlayersPerTeam}>{round.blackScore}</td>
          <td colspan={numberOfPlayersPerTeam}>{round.redScore}</td>
        </tr>
      {/each}
    </tbody>

    <tfoot>
      <!-- In progress round -->
      {#if !isBidding && currentBid}
        <tr>
          <td>Current</td>
          <td>{currentBid.dealer}</td>
          <td>
            <Call {...currentBid.call} />
          </td>
          <td colspan={numberOfPlayersPerTeam}>
            <input
              type="number"
              placeholder="Tricks Won"
              bind:value={currentBid.blackTricks}
              min="0"
              max="10" />
          </td>
          <td colspan={numberOfPlayersPerTeam}>
            <input
              type="number"
              placeholder="Tricks Won"
              bind:value={currentBid.redTricks}
              min="0"
              max="10" />
          </td>
        </tr>
      {/if}
    </tfoot>
  </table>

  <button
    disabled={!currentBid || currentBid.blackTricks + currentBid.redTricks !== 10}
    on:click={roundComplete}>
    Submit Round
  </button>

  {#if isBidding}
    <Bid on:bidComplete={bidComplete} />
  {/if}
</section>
