<script>
  export let suit = {};
  export let showName = false;
</script>

<style>
  .red {
    color: red;
  }
</style>

<span class:red={suit.color === 'red'}>
  {suit.symbol}{showName ? ` - ${suit.name}` : ''}
</span>
