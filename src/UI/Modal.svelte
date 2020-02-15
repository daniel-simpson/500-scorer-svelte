<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import Portal from "svelte-portal";

  export let show = true;
  let dispatch = createEventDispatcher();

  function closeModal() {
    dispatch("close");
  }
</script>

<style>
  .modal-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    background: rgba(100, 100, 100, 0.1);

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .modal {
    min-width: 300px;
    margin-top: 10vh;
    background: white;
    padding: 2rem;
  }

  footer {
    display: flex;
    justify-content: center;
  }
</style>

{#if show}
  <Portal>
    <div class="modal-wrapper" on:click|preventDefault={closeModal}>
      <div class="modal" on:click|stopPropagation out:fade>
        <header>
          <slot name="header" />
        </header>
        <main>
          <slot />
        </main>
        <footer>
          <slot name="buttons">
            <hr />
            <button on:click={closeModal}>Close</button>
          </slot>
        </footer>
      </div>
    </div>
  </Portal>
{/if}
