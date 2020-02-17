<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { getConfirmationTokenFromHash } from "../../Util/url";
  import { timeout } from "../../Util/asyncAwait";
  import { confirm } from "../auth-store";

  import Modal from "../../UI/Modal.svelte";

  let promise;

  onMount(() => {
    const token = getConfirmationTokenFromHash();
    if (!token) {
      return;
    }

    promise = confirm(token);
    promise.timeout(2000).finally(() => {
      window.location.hash = "";
    });
  });
</script>

{#if promise}
  <Modal>
    {#await promise}
      <p>Confirming your account...</p>
    {:then data}
      <p>Confirmed!</p>
    {:catch error}
      <p>An error occurred. Please try again</p>
    {/await}
  </Modal>
{/if}
