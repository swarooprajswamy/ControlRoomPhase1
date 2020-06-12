import Sidebar from './Sidebar.vue';
import SidebarLink from './SidebarLink.vue';

const SidebarPlugin = {
  install(Vue) {
    let app = new Vue({
      data: {
      }
    });

    Vue.prototype.$sidebar = app.sidebarStore;
    Vue.component("side-bar", Sidebar);
    Vue.component("sidebar-link", SidebarLink);
  }
};

export default SidebarPlugin;
