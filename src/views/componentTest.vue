<template>
  <div>
    <div class="upload-img__btn">
      <el-upload
        class="upload-img__btn--upload"
        action=" "
        accept="image/jpeg, image/png"
        :http-request="uploadImgAction"
        :show-file-list=false>
        <el-button class="upload-img__btn--preview" size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-button @click="showPreview" :disabled="!uploadImg">预览</el-button>
    </div>
    <img class="upload-img__box" :src="uploadImg" alt="横图">
    <div class="upload-img__preview">
      <el-dialog title="图片预览" :visible.sync="isShowImgPreview">
        <img :src="uploadImg" alt="横图预览">
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        uploadImg: '',
        isShowImgPreview: false
      }
    },
    methods: {
      showPreview () {
        this.isShowImgPreview = true
      },
      uploadImgAction (request) {
        let file = request.file
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          console.log(reader.result)
          this.uploadImg = reader.result
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .upload-img__btn {
    display: flex;
  }
  .upload-img__box {
    display: inline-block;
      width: 200px;
      height: 200px;
      border: 1px solid #f5f5f5
  }
</style>
