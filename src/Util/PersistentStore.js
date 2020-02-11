import { writable } from "svelte/store";

const isBrowser = typeof window !== undefined;

export default (key, init) => {
  let initialValue = init;
  if (isBrowser) {
    let storedValue = localStorage.getItem(key);

    try {
      initialValue = storedValue !== undefined ? JSON.parse(storedValue) : init;
    } catch {
      initialValue = init;
    }
  }

  var store = writable(initialValue);

  if (isBrowser) {
    store.subscribe(val => {
      if (!!val) {
        localStorage.setItem(key, JSON.stringify(val));
      }
    });
  }

  return store;
};
