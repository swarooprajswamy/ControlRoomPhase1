<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <button class="navbar-toggler navbar-burger"
              type="button"
              @click="toggleSidebar"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <a class="navbar-brand" href="#">{{ routeName }}</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <div class="collapse navbar-collapse">
            <drop-down 
            tag = "li"
            class="nav-item"
            title="Profile"
            title-classes="nav-link"
            icon="ti-user" >
            <a slot="options" class="dropdown-item" href="#">Update</a>
            <a slot="options" class="dropdown-item" href="#">Settings</a>
            <a slot="options" class="dropdown-item" href="#">Roles</a>
            <a slot="options" class="dropdown-item" href="#">LogOut</a>
            </drop-down>
          </div>
        </ul>
      </div>
    </div>
    </nav>
</template>
<script>
export default {
  
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  data() {
    return {
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
    },
    hideSidebar() {
    }
  }
};
</script>
<style>
</style>
