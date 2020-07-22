
// Plugins
import Sidebar from '../components/SidebarPlugin';
import GlobalComponents from './GlobalComponents';

// PrimeVue Components  -- https://github.com/primefaces/primevue/
import PrimeVueDataTable from "primevue/datatable"
import PrimeVueColumn from 'primevue/column';
import PrimeVueInputText from 'primevue/inputtext';
import PrimeVueDropdown from 'primevue/dropdown';
import PrimeVueMultiSelect from 'primevue/multiselect';
import PrimeVueDialog from 'primevue/dialog';
import PrimeVueButton from 'primevue/button';
import PrimeVueContextMenu from 'primevue/contextmenu';

// Imported from NPM
import vClickOutside from 'v-click-outside';
import Vuelidate from 'vuelidate';

import "es6-promise/auto";

//css assets
import "bootstrap/dist/css/bootstrap.css";
// import "@/assets/sass/light-bootstrap-dashboard.scss";
// import "@/assets/sass/white-dashboard.scss";
// import "@/assets/sass/black-dashboard.scss";
import "@/assets/sass/paper-dashboard.scss";
import "@/assets/css/themify-icons.css";
// import '../../public/themes/luna-amber/theme.css';
// import '../../public/themes/nova/theme.css';
// import '../../public/themes/nova-alt/theme.css';
// import '../../public/themes/blackDashboardTheme.css';
import '../../public/themes/paperDashboardTheme.css';


export default  {
    install(Vue){
        Vue.use(Sidebar);
        Vue.use(GlobalComponents);
        Vue.use(vClickOutside);
        Vue.use(Vuelidate);
        Vue.component('DataTable',PrimeVueDataTable);
        Vue.component('Column',PrimeVueColumn);
        Vue.component('InputText',PrimeVueInputText);
        Vue.component('Dropdown',PrimeVueDropdown);
        Vue.component('MultiSelect',PrimeVueMultiSelect);
        Vue.component('Dialog',PrimeVueDialog);
        Vue.component('Button',PrimeVueButton);
        Vue.component('ContextMenu',PrimeVueContextMenu);
    }
   
}