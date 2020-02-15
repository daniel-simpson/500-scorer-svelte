<script>
  import { signin } from "../auth-store";

  import Modal from "../../UI/Modal.svelte";

  let show = false;
  let email;
  let password;
  let signInPromise;

  $: isValid = validate(email, password);

  function showModal() {
    show = true;
  }

  function hideModal() {
    show = false;
  }

  function validate(email, password) {
    return email && password;
  }

  function onSubmit() {
    if (!isValid) {
      return;
    }
    signInPromise = signin(email, password);
    signInPromise.then(() => {
      setTimeout(hideModal, 2000);
    });
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
    <form on:submit|preventDefault={onSubmit}>
      <input placeholder="Email" type="email" bind:value={email} />
      <input placeholder="Password" type="password" bind:value={password} />
    </form>

    {#if signInPromise}
      {#await signInPromise}
        <p>Signing you in...</p>
      {:then}
        <p>Success!</p>
      {:catch}
        <p>
          There was a problem signing you in. Please check your details and try
          again
        </p>
      {/await}
    {/if}
  </div>
  <div slot="buttons">
    <button disabled={!isValid} on:click={onSubmit}>Sign in</button>
    <button on:click={hideModal}>Cancel</button>
  </div>
</Modal>
