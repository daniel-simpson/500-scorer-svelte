<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { getRecoveryTokenFromHash } from "../../Util/url";
  import { timeout } from "../../Util/asyncAwait";
  import { recover } from "../auth-store";

  import Modal from "../../UI/Modal.svelte";

  let promise;

  onMount(() => {
    const token = getRecoveryTokenFromHash();
    if (!token) {
      return;
    }

    promise = recover(token);
    promise.timeout(2000).finally(() => {
      window.location.hash = "";
    });
  });
</script>

{#if promise}
  <Modal>
    {#await promise}
      <p>Submitting account recovery...</p>
    {:then data}
      <p>Account details reset! Try signing in again.</p>
    {:catch error}
      <p>An error occurred. Please try again</p>
    {/await}
  </Modal>
{/if}
