import { createApp } from 'vue';
import App from './App.vue';
import {createVuetify} from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css'
import moment from "moment";

// Vuetify components
import {
    VBtn,
    VDatePicker,
    VTextField,
    VForm,
    VMenu,
    VSelect,
    VRadioGroup,
    VRadio,
    VContainer,
    VRow,
    VCol
} from "vuetify/components";


const app = createApp(App);

// Create a Vuetify instance
const vuetify = new createVuetify({
    components:{
        VBtn,
        VDatePicker,
        VTextField,
        VForm,
        VMenu,
        VSelect,
        VRadioGroup,
        VRadio,
        VContainer,
        VRow,
        VCol
    }
});

// Use Vuetify
app.use(vuetify);

// Mount the app
app.mount('#app');