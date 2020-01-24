<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import players from "../Player/player-store";
  import { blackTeamStore } from "../Player/team-store";

  import Suit from "./Suit.svelte";

  const dispatch = createEventDispatcher();

  const allowedNumbers = [6, 7, 8, 9, 10];
  const allowedSuits = [
    { name: "Spades", symbol: "♠", color: "black", points: 40 },
    { name: "Clubs", symbol: "♣", color: "black", points: 60 },
    { name: "Diamonds", symbol: "♦", color: "red", points: 80 },
    { name: "Hearts", symbol: "❤", color: "red", points: 100 },
    { name: "No Trumps", symbol: "🚫", points: 120 }
  ];
  const allowedMiseres = [
    { name: "Closed", symbol: "CM", points: 250 },
    { name: "Open", symbol: "OM", points: 500 }
  ];

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
  th,
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
    width: 48%;
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
        {#each allowedNumbers as amount}
          <td>{amount}</td>
        {/each}
      </tr>
    </thead>

    <tbody>
      {#each allowedSuits as suit}
        <tr>
          <td>
            <Suit {suit} showName={true} />
          </td>
          {#each allowedNumbers as amount}
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
    <button on:click={() => callMisere(250)}>Closed Misere</button>
    <button on:click={() => callMisere(500)}>Open Misere</button>
  </div>
</section>
