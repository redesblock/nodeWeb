import Block from "./Block.vue";
import Page from "./Page.vue";
import Icon from "./Icon.vue";

function initComponent(app) {
    app.component('Block', Block)
    app.component('Page', Page)
    app.component('Icon', Icon)
}

export default initComponent