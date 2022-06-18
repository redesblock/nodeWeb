<template>
<Page>
    <Fold label="APISettings" status>
        <div class="content">
            <h3>Hop  API</h3>
            <div>
                <el-input v-model.trim="api" placeholder="please enter" />
                <div style="margin-top: 10px;">
                    <el-button type="primary" class="mgr10">save</el-button>
                    <el-button >cancel</el-button>
                </div>
            </div>
        </div>
        <div class="content">
            <h3>Hop  Debug  API</h3>
            <div>
                <el-input v-model.trim="debugapi" placeholder="please enter" />
                <div style="margin-top: 10px;">
                    <el-button type="primary" class="mgr10">save</el-button>
                    <el-button >cancel</el-button>
                </div>
            </div>
        </div>
    </Fold>
    
</Page>
</template>
<script setup>
import Fold from "@/components/Fold.vue";
import { ref } from "vue";
let api = ref(null)
let debugapi = ref(null)

</script>

<style scoped lang="scss">
.content {
    box-sizing: border-box;
    padding: 10px 30px;
    margin: 4px 0px;
    background-color: white;
}
</style>
