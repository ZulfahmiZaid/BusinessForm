import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import {createVuetify} from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

// Vuetify components
import {
    VBtn,
    VDatePicker,
    VTextField,
    VForm,
    VMenu
} from "vuetify/components";


const app = createApp(App);

// Create a Vuetify instance
const vuetify = new createVuetify({
    components:{
        VBtn,
        VDatePicker,
        VTextField,
        VForm,
        VMenu
    }
});

// Use Vuetify
app.use(vuetify);

// Mount the app
app.mount('#app');