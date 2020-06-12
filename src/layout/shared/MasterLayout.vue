<template>
    <div class="wrapper">
        <div class="main-panel">
          <side-bar
          backgroundColor="black"
          activeColor="warning">
            <template slot="links">
              <sidebar-link to="/Dashboard" name="Dashboard" icon="ti-panel"/>
              <sidebar-link to="/Jobs" name="Jobs" icon="ti-user"/>
              <sidebar-link to="/Schedules" name="Schedulers" icon="ti-text"/>
            </template>
          </side-bar>
            <app-TopNavbar></app-TopNavbar>
            <app-content></app-content>
            <app-Footer></app-Footer>
        </div>
    </div>
</template>

<script>

import appTopNavbar from './TopNavbar.vue';
import appContent from './Content.vue';
import appFooter from './Footer.vue';

export default {
  components: {
      appTopNavbar,
      appContent,
      appFooter
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>