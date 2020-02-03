<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  import players from "../../../Player/Stores/player-store";
  import { blackTeamStore } from "../Stores/team-store";
  import { amount, suits, miseres } from "../Stores/available-calls-store";

  import Suit from "../../../UI/DisplaySuit.svelte";

  const dispatch = createEventDispatcher();

  let selectedPlayer;
  $: selectedTeam =
    $blackTeamStore.indexOf(selectedPlayer) > -1 ? "black" : "red";

  function onBidComplete(amount, suit) {
    dispatch("bidComplete", {
      player: selectedPlayer,
      team: selectedTeam,
      amount,
      suit,
      score: suit.points + (amount - 6) * 100
    });
  }

  function callMisere(misereType) {
    dispatch("bidComplete", {
      player: selectedPlayer,
      team: selectedTeam,
      amount: 0,
      suit: {},
      score: misereType
    });
  }
</script>

<style>
  table,
  tr,
  td {
    border: 1px solid black;
    border-collapse: collapse;
  }

  table {
    width: 100%;
    margin-bottom: 1rem;
  }

  button {
    width: 100%;
    height: 100%;
    margin: 0 0 0 0;
  }

  .misere {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .misere > button {
    padding: 2rem;
  }
</style>

<section transition:fade>
  <h1>Bidding Time!</h1>

  <label>Who is bidding?</label>
  <select bind:value={selectedPlayer}>
    {#each $players as player}
      <option value={player}>{player}</option>
    {/each}
  </select>

  <table>
    <thead>
      <tr>
        <td />
        {#each $amount as amount}
          <td>{amount}</td>
        {/each}
      </tr>
    </thead>

    <tbody>
      {#each $suits as suit}
        <tr>
          <td>
            <Suit {suit} showName={true} />
          </td>
          {#each $amount as amount}
            <td>
              <div class="bid-value">
                <button on:click={() => onBidComplete(amount, suit)}>
                  {amount}&nbsp;
                  <Suit {suit} />
                </button>
              </div>
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>

  <div class="misere">
    {#each $miseres as misere}
      <button on:click={() => callMisere(misere.points)}>
        {misere.Name} Misere
      </button>
    {/each}
  </div>
</section>
