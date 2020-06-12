<template>
  <footer class="footer">
    <hr>
    <hr>
    <hr>
    <div class="container-fluid d-flex flex-wrap justify-content-between">
      <!-- <nav>
        <ul>
          <li>
            <router-link :to="{path:'/helloworld'}">Dashboard</router-link>
          </li>
        </ul>
      </nav> -->
      <div class="right copyright d-flex flex-wrap">
        &copy; Coded by <div>  {{empty}} </div>
        <a href="https://github.com/VUE-Poc/BotOrchestration" target="_blank"> &nbsp; Team Secure PMS </a>&nbsp;
        Designed by &nbsp;<a href="https://www.evry.in/" target="_blank"> &nbsp; Evry India.</a>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
 empty: ' '
}
</script>
<style>
</style>
