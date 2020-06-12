<template>
  <div class="hello">
    <h1>{{ getMSg }}</h1>
  </div>
</template>

<script>
export default {
  computed: {
      getMSg() {
       return 'Wellcome to Bot Controlroom';
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
