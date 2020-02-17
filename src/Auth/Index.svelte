<script>
  import { onMount } from "svelte";
  import {
    hasConfirmationTokenInHash,
    hasRecoveryTokenInHash
  } from "../Util/url";

  import { user, confirm } from "./auth-store.js";
  import SignUp from "./UI/SignUp.svelte";
  import SignIn from "./UI/SignIn.svelte";
  import SignOut from "./UI/SignOut.svelte";
  import ConfirmAccount from "./UI/ConfirmAccount.svelte";
  import RecoverAccount from "./UI/RecoverAccount.svelte";

  let isConfirm = false;
  let isRecover = false;

  onMount(() => {
    // Ensure we're on the client side before accessing window.location.hash
    isConfirm = hasConfirmationTokenInHash();
    isRecover = hasRecoveryTokenInHash();
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

{#if isConfirm}
  <ConfirmAccount />
{/if}

{#if isRecover}
  <RecoverAccount />
{/if}
