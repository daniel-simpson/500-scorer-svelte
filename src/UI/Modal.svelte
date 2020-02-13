<script>
  import Portal from "svelte-portal";

  export let show = false;
</script>

<style>

</style>

{#if show}
  <Portal>
    <slot />
  </Portal>
{/if}
