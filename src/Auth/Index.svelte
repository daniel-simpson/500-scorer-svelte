<script>
  import { user } from "./auth-store.js";
  import SignUp from "./UI/SignUp.svelte";
  import SignIn from "./UI/SignIn.svelte";
  import SignOut from "./UI/SignOut.svelte";
</script>

<div>
  {#if $user}
    <SignOut />
  {:else}
    <SignUp />
    <SignIn />
  {/if}
</div>
