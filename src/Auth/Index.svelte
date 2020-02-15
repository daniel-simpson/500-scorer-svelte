<script>
  import { onMount } from "svelte";

  import { user, confirm } from "./auth-store.js";
  import SignUp from "./UI/SignUp.svelte";
  import SignIn from "./UI/SignIn.svelte";
  import SignOut from "./UI/SignOut.svelte";
  import Modal from "../UI/Modal.svelte";

  let confirmationPromise;
  let isConfirming = false;

  onMount(() => {
    const hash = window.location.hash;
    if (hash.indexOf("confirmation_token=") === -1) {
      return;
    }

    isConfirming = true;
    const token = hash.substring(hash.indexOf("=") + 1);

    console.log("Token", token);
    if (!token) {
      console.error("No token specified in hash...");
      return;
    }

    confirmationPromise = confirm(token);
    confirmationPromise.then(() => {
      setTimeout(() => {
        isConfirming = false;
      }, 2000);
    });
  });
</script>

<div>
  {#if $user}
    <SignOut />
  {:else}
    <SignUp />
    <SignIn />
  {/if}
</div>

{#if confirmationPromise}
  <Modal show={isConfirming}>
    {#await confirmationPromise}
      <p>Confirming your details...</p>
    {:then data}
      <p>Confirmed!</p>
    {/await}
  </Modal>
{/if}
