<script>
  import { signin } from "../auth-store";
  import { isValidEmail } from "../../Util/validation";
  import { timeout } from "../../Util/asyncAwait";

  import ForgotPassword from "./ForgotPassword.svelte";
  import Modal from "../../UI/Modal.svelte";

  let show = false;
  let email;
  let password;
  let promise;

  $: isValid = validate(email, password);

  function showModal() {
    show = true;
  }

  function hideModal() {
    show = false;
  }

  function validate(email, password) {
    return isValidEmail(email) && password;
  }

  function onSubmit() {
    if (!isValid) {
      return;
    }
    promise = signin(email, password);
    promise.timeout(2000).then(hideModal);
  }
</script>

<style>
  form {
    display: flex;
    flex-direction: column;
  }
</style>

<button on:click={showModal}>Sign In</button>

<Modal {show} on:close={hideModal}>
  <div>
    <form on:submit|preventDefault|once={onSubmit}>
      <input placeholder="Email" type="email" bind:value={email} />
      <input placeholder="Password" type="password" bind:value={password} />

      {#if promise}
        {#await promise}
          <p>Signing you in...</p>
        {:then}
          <p>Success!</p>
        {:catch}
          <p>
            There was a problem signing you in. Please check your details and
            try again
          </p>
        {/await}
      {/if}

      <ForgotPassword
        initialEmail={email}
        on:forgot-password-requested={hideModal} />
    </form>
  </div>
  <div slot="buttons">
    <button disabled={!isValid} on:click={onSubmit}>Sign in</button>
    <button on:click={hideModal}>Cancel</button>
  </div>
</Modal>
