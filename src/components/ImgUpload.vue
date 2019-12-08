<template>
  <div>
    <div class="upload-img__btn">
      <el-upload
        action="pic/push_goods_pic"
        accept="image/jpeg, image/png"
        :name="key"
        :on-success='uploadSuccess'
        :on-error='uploadError'
        :show-file-list=false>
        <el-button class="upload-img__btn--select" size="small">选择文件</el-button>
      </el-upload>
    </div>
    <span class='upload-img__btn--subtitle'>*支持jpg/png文件，不超过5M</span>
    <el-input class="upload-img__input" v-model="uploadAddress" placeholder="请输入上传地址"></el-input>
  </div>
</template>

<script>
  import * as commonsConfig from 'COMMONS/commonsConfig.js'
  export default {
    name: 'img-upload-component',
    props: {
      key: String
    },
    data () {
      return {
      }
    },
    watch: {
      uploadAddress (n) {
        this.$emit('input-link', n)
      }
    },
    methods: {
      uploadSuccess (res) {
        this.$emit('upload-success', res)
      },
      uploadError (res) {
        this.$emit('upload-error', res)
      },
      uploadImgAction (request) {
        let file = request.file
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          this.$emit('upload-img', reader.result)
        }
      }
    }
  }
</script>

<style scoped>
  .upload-img__btn {
    display: inline-block;
  }
  .upload-img__btn--subtitle {
    font-size: 15px;
    margin-left: 16px;
    color: #96a1b6;
  }
  .upload-img__btn--select {
    color: #ff4b57;
    border-color: #96a1b6;
  }
  .upload-img__input {
    margin-top: 12px;
  }
</style>
