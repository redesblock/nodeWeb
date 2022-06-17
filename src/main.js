import "normalize.css"
import "@/assets/style/index.scss";

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import initRouter from "./router/index";
import initComponent from "./components/index"

const app = createApp(App)

app.use(ElementPlus)
// register router
initRouter(app)

// register component
initComponent(app)

app.mount('#app')
