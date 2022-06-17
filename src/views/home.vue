<script setup>
import {
  Warning
} from '@element-plus/icons-vue'
</script>

<template>
  <Page>
    <Block title="Hop Base NODE">
      <el-card shadow="never">
        <template #header>
          <div class="version">4.1</div>
        </template>
        <div class="item">
          <span>Publick Key</span>
          <p>030ec63337c3d4f09cffe40caaaca7d9e9719714a9b72ad4a6c3e33c76f563675b</p>
        </div>
        <div class="item">
          <span>Publick Key</span>
          <p>030ec63337c3d4f09cffe40caaaca7d9e9719714a9b72ad4a6c3e33c76f563675b</p>
        </div>
        <div class="item">
          <span>Publick Key</span>
          <p>030ec63337c3d4f09cffe40caaaca7d9e9719714a9b72ad4a6c3e33c76f563675b</p>
        </div>
      </el-card>
    </Block>
    <Block title="Hop NODE Connectivity">
      <el-card shadow="never">
       <div class="board-card">
         <div>
           <h3>Overall Health Indicator</h3>
           <div>
             <span class="number">50%</span>
           </div>
         </div>
         <div>
           <h3>Overall Health Indicator</h3>
           <div>
             <span class="number">50%</span>
              <el-tooltip
                effect="dark"
                content="Top Left prompts info"
              >
             <el-icon class="right"><Warning /></el-icon>
            </el-tooltip>
           </div>
         </div>
         <div>
           <h3>Overall Health Indicator</h3>
           <div>
             <span class="number">50%</span>
              <el-tooltip
                effect="dark"
                content="Top Left prompts info"
              >
             <el-icon class="right"><Warning /></el-icon>
            </el-tooltip>
           </div>
         </div>
         <div>
           <h3>Overall Health Indicator</h3>
           <div>
             <span class="number">50%</span>
              <el-tooltip
                effect="dark"
                content="Top Left prompts info"
              >
             <el-icon class="right"><Warning /></el-icon>
            </el-tooltip>
           </div>
         </div>
         
       </div>
      </el-card>
    </Block>
    <Block title="Blockchain">
      <el-card shadow="never">
        <div class="item">
          <span>Publick Key</span>
          <p>030ec63337c3d4f09cffe40caaaca7d9e9719714a9b72ad4a6c3e33c76f563675b</p>
        </div>
        <div class="item">
          <span>Publick Key</span>
          <p>030ec63337c3d4f09cffe40caaaca7d9e9719714a9b72ad4a6c3e33c76f563675b</p>
        </div>
        <div class="item">
          <span>Publick Key</span>
          <p>030ec63337c3d4f09cffe40caaaca7d9e9719714a9b72ad4a6c3e33c76f563675b</p>
        </div>
      </el-card>
    </Block>
  </Page>
</template>

<style scoped lang="scss">
.version {
  text-align: right;
  font-weight: bold;
  font-size: 17px;
}
.item + .item {
  border-top: 1px solid var(--el-card-border-color);
  padding-top: 20px;
}
.board-card {
  display: flex;
  &>div{
    flex: 1 1 0;
    margin: 0 10px;
    height: 125px;
    background-color: #F8F9FD;
    padding: 0 20px;
    .number {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
