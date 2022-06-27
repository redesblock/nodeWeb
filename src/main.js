import 'element-plus/dist/index.css'
import "normalize.css"
import "@/assets/style/index.scss";

import { createApp } from 'vue'
import ElementPlus from 'element-plus'

import {
    // create naive ui
    create,
    // component
    NUpload,
    NUploadDragger
  } from 'naive-ui'

import App from './App.vue'
import initRouter from "./router/index";
import initComponent from "./components/index"
import initStore from "./store/index";
const naive = create({
    components: [NUpload,NUploadDragger]
  })
const app = createApp(App)

app.use(ElementPlus)
app.use(naive)
// register router
initRouter(app)

// register store
initStore(app)

// register component
initComponent(app)

app.mount('#app')
