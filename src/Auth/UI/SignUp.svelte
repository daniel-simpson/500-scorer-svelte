<script>
  import { signup } from "../auth-store";
  import { isValidEmail } from "../../Util/validation";
  import { timeout } from "../../Util/asyncAwait";

  import Modal from "../../UI/Modal.svelte";

  let show = false;
  let email;
  let password;
  let confirmPassword;
  let signupPromise;

  $: isValid = validate(email, password, confirmPassword);

  function showModal() {
    show = true;
  }

  function hideModal() {
    show = false;
  }

  function validate(email, password, confirmPassword) {
    return isValidEmail(email) && password && password === confirmPassword;
  }

  function onSubmit() {
    if (!isValid) {
      return;
    }

    signupPromise = signup(email, password);
    signupPromise.timeout(2000).then(hideModal);
  }
</script>

<style>
  form {
    display: flex;
    flex-direction: column;
  }
</style>

<button on:click={showModal}>Sign Up</button>

<Modal {show} on:close={hideModal}>

  <div>
    <form on:submit|preventDefault={onSubmit}>
      <input placeholder="Email" type="email" bind:value={email} />
      <input placeholder="Password" type="password" bind:value={password} />
      <input
        placeholder="Confirm Password"
        type="password"
        bind:value={confirmPassword} />
    </form>

    {#if signupPromise}
      {#await signupPromise}
        <p>Signing you up...</p>
      {:then}
        <p>
          Thank you for signing up! Please check your inbox / junk mail for a
          confirmation email before signing in
        </p>
      {:catch}
        <p>
          There was a problem signing you up. Please check your details and try
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
