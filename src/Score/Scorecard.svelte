<script>
  import { createEventDispatcher, onDestroy } from "svelte";
  import { getEvenElements, getOddElements } from "../util";

  import playerStore from "../Player/player-store";
  import roundsStore from "./rounds-store";
  import dealer from "../Player/dealer-store";

  import Bid from "./Bid.svelte";
  import Call from "./Call.svelte";

  let dispatch = createEventDispatcher();

  let players = [];
  let rounds = [];
  const unsubscribePlayers = playerStore.subscribe(items => {
    players = items;
  });
  const unsubscribeRounds = roundsStore.subscribe(items => {
    rounds = items;
  });

  onDestroy(() => {
    if (unsubscribePlayers) {
      unsubscribePlayers();
    }
    if (unsubscribeRounds) {
      unsubscribeRounds();
    }
  });

  $: teamBlack = getEvenElements(players);
  $: teamRed = getOddElements(players);
  $: numberOfPlayersPerTeam = players.length / 2;

  function resetCurrentBid() {
    return {
      index: rounds.length + 1,
      dealer: $dealer,
      blackTricks: 4,
      redTricks: 5
    };
  }

  let isBidding = true;
  let currentBid = resetCurrentBid();

  function bidComplete(call) {
    console.log("in bidComplete", call);
    isBidding = false;
    currentBid = {
      ...currentBid,
      call: call.detail
    };
  }

  function roundComplete() {
    // Add score to current bid and push to rounds
    rounds;

    //TODO: If someone's score is +500 or -500, emit event
    if (false) {
      currentBid = null;
      dispatch("game-finish");
    } else {
      isBidding = true;
      // TODO: scroll to bidding section

      currentBid = resetCurrentBid();
    }
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

        {#each teamBlack as player}
          <td>{player}</td>
        {/each}

        {#each teamRed as player}
          <td>{player}</td>
        {/each}
      </tr>
    </thead>

    <!-- Display Rounds -->
    <tbody>
      {#each rounds as round}
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
