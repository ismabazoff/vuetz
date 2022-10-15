import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
// import { defineRule } from 'vee-validate'

// defineRule('minLength', (value, [limit]) => {
//     // The field is empty so it should pass
//     if (!value || !value.length) {
//         return true
//     }
//     if (value.length < limit) {
//         return `This field must be at least ${limit} characters`
//     }
//     return true
// })

import './index.css'
createApp(App).use(store).mount('#app')
