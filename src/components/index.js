import Block from "./Block.vue";
import Page from "./Page.vue";

function initComponent(app) {
    app.component('Block', Block)
    app.component('Page', Page)
}

export default initComponent