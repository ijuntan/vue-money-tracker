import { createApp } from 'vue'
import './style.css'
import App from '@/App.vue'
import PrimeVue from "primevue/config";
import Aura from '@primevue/themes/aura';
import router from '@/routes';
import { createPinia } from 'pinia';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

app.use(ConfirmationService);
app.use(ToastService);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.dark-mode',
        }
    }
})

app.mount('#app')
