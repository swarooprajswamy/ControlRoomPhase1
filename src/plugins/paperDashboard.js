
import Sidebar from '../components/SidebarPlugin';

// PrimeVue Components  -- https://github.com/primefaces/primevue/
import PrimeVueDataTable from "primevue/datatable"
import PrimeVueColumn from 'primevue/column';
import PrimeVueInputText from 'primevue/inputtext';
import PrimeVueDropdown from 'primevue/dropdown';
import PrimeVueMultiSelect from 'primevue/multiselect';
import PrimeVueDialog from 'primevue/dialog';
import PrimeVueButton from 'primevue/button';
import PrimeVueContextMenu from 'primevue/contextmenu';


import "es6-promise/auto";

//css assets
import "bootstrap/dist/css/bootstrap.css";
import "@/assets/sass/paper-dashboard.scss";
import "@/assets/css/themify-icons.css";
import '@/assets/css/theme.css';


export default  {
    install(Vue){
        Vue.use(Sidebar);
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