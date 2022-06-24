# Vue3 Multilang

<span class="badge-npmversion"><a href="https://npmjs.org/package/vue3multilang" title="View this project on NPM"><img src="https://img.shields.io/npm/v/vue3multilang.svg" alt="NPM version"/></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/vue3multilang" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/vue3multilang.svg" alt="NPM downloads" /></a></span>
## • Quick Start Example

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import createMultilang from "vue3multilang"
const app = createApp(App)
import en from "./en.json";
import ro from "./ro.json";
app.use(createMultilang(),{
    locale: "en-UK",
    fallbackLocale:"ro-RO",
    messages:{
        "en-UK" :   en,
        "ro-RO" :   ro
    }
})
app.mount('#app')

```
