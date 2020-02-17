<script>
  import { createEventDispatcher } from "svelte";
  import { requestPasswordRecovery } from "../auth-store";
  import { isValidEmail } from "../../Util/validation";

  let dispatch = createEventDispatcher();

  import Modal from "../../UI/Modal.svelte";

  export let initialEmail;

  let show = false;
  let email = initialEmail;
  let forgotPasswordPromise;

  $: isValid = isValidEmail(email);

  function showModal() {
    show = true;
  }

  function hideModal() {
    show = false;
  }

  function onSubmit() {
    forgotPasswordPromise = requestPasswordRecovery(email);
    forgotPasswordPromise.then(() => {
      setTimeout(function() {
        show = false;
        dispatch("forgot-password-requested");
      }, 3000);
    });
  }
</script>

<button class="link-button" on:click={showModal}>Forgot password</button>

<Modal {show} on:close={hideModal}>
  <div>
    <form on:submit|preventDefault|once={onSubmit}>
      <input placeholder="Email" type="email" bind:value={email} />

      {#if forgotPasswordPromise}
        {#await forgotPasswordPromise}
          <p>Sending you a password reset email...</p>
        {:then}
          <p>Success!</p>
          <small>
            We must look a bit shifty... please make sure you check your Junk
            mail box
          </small>
        {:catch}
          <p>
            There was a problem resetting your password. Please try again later
          </p>
        {/await}
      {/if}

    </form>
  </div>
  <div slot="buttons">
    {#if !forgotPasswordPromise}
      <button disabled={!isValid} on:click={onSubmit}>Reset password</button>
      <button on:click={hideModal}>Cancel</button>
    {/if}
  </div>
</Modal>
