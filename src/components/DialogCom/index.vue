<template>
  <div class="dialogCom">
      <el-dialog
        :title="title"
        :visible="dialogVisible"
        width="650px"
        :before-close="handleClose">
        <slot></slot>
        <span slot="footer" class="dialog-footer">
            <el-button class="saveBtn" type="primary" @click="sureSave">保 存</el-button>
            <el-button class="cancleBtn" @click="cancleSave">取 消</el-button>
        </span>
        </el-dialog>
  </div>
</template>

<script src='./script.js'></script>

<style src="./style.less" lang="less">

</style>
