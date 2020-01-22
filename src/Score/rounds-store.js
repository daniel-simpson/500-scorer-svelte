import { writable } from "svelte/store";

const roundsStore = writable([]);

export default {
  subscribe: roundsStore.subscribe
  // addBid: ({ caller, amount, suit }) => {
  //   scoreStore.update(items => {
  //     return [
  //       ...items,
  //       {
  //         caller,
  //         amount,
  //         suit,
  //         won: 0
  //       }
  //     ];
  //   });
  // }
};
