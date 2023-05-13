import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/main.js"
import './assets/tailwind.css'

// Components
import TheHeader from "./components/Layout/TheHeader.vue";
import TheFooter from "./components/Layout/TheFooter.vue";
import BaseCard from "./components/Base/BaseCard.vue";
import BaseModal from "./components/Base/BaseModal.vue";


// Instances
const app = createApp(App);

// Components
app.component('TheHeader', TheHeader);
app.component('TheFooter', TheFooter);
app.component('BaseCard', BaseCard);
app.component('BaseModal', BaseModal);

// Plugins and Extensions
app.use(router);
app.use(store);


// Mount
app.mount('#app');
