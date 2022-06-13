import "normalize.css"
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import initRouter from "./router/index";
const app = createApp(App)

app.use(ElementPlus)
initRouter(app)
app.mount('#app')
