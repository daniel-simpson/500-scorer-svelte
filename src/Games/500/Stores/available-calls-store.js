import { readable } from "svelte/store";

export const amount = readable([6, 7, 8, 9, 10]);

export const suits = readable([
  { name: "Spades", symbol: "♠", color: "black", points: 40 },
  { name: "Clubs", symbol: "♣", color: "black", points: 60 },
  { name: "Diamonds", symbol: "♦", color: "red", points: 80 },
  { name: "Hearts", symbol: "❤", color: "red", points: 100 },
  { name: "No Trumps", symbol: "🚫", points: 120 }
]);

export const miseres = readable([
  { name: "Closed", symbol: "CM", points: 250 },
  { name: "Open", symbol: "OM", points: 500 }
]);
