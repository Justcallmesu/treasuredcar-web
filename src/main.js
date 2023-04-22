import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

// Components
import TheHeader from "./components/Layout/TheHeader.vue";
import BaseCard from "./components/Base/BaseCard.vue";


// Instances
const app = createApp(App);

// Components
app.component('TheHeader', TheHeader);
app.component('BaseCard', BaseCard);

// Plugins and Extensions
app.use(router);


// Mount
app.mount('#app');
