<script>
  import { signup } from "../auth-store";

  import Modal from "../../UI/Modal.svelte";

  let show = false;
  let email;
  let password;
  let confirmPassword;

  $: isValid = validate(email, password);

  function showModal() {
    show = true;
  }

  function hideModal() {
    show = false;
  }

  function validate(email, password) {
    return email && password && password === confirmPassword;
  }

  function onSubmit() {
    if (!isValid) {
      return;
    }
    signup(email, password);
  }
</script>

<button on:click={showModal}>Sign Up</button>

<Modal {show}>
  <form on:submit|preventDefault={onSubmit}>
    <input type="email" bind:value={email} />
    <input type="password" bind:value={password} />
    <input type="password" bind:value={confirmPassword} />

    <button disabled={!isValid} on:click={onSubmit}>Sign in</button>
    <button on:click={hideModal}>Cancel</button>
  </form>
</Modal>
