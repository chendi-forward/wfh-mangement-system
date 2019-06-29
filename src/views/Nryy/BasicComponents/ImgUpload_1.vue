<template>
  <div>
  <el-upload
    class="avatar-uploader"
    :class='{"hide-input": imageUrl}'
    action=" "
    :disabled="!!imageUrl"
    accept="image/jpeg, image/png"
    :show-file-list="false"
    :http-request="uploadImgAction"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    <span class="el-upload-list__item-actions" v-show="imageUrl">
      <span class="el-upload-list__item-preview" @click.stop.prevent="showDetail">
        <i class="el-icon-zoom-in"></i>
      </span>
      <span class="el-upload-list__item-delete" @click.stop.prevent="deleteImg">
        <i class="el-icon-delete"></i>
      </span>
    </span>
  </el-upload>
  </div>
</template>

<script>
export default {
  name: 'img-upload-component',
  data () {
    return {
      imageUrl: ''
    }
  },
  methods: {
    uploadImgAction (request) {
      let file = request.file
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        this.imageUrl = reader.result
        this.$emit('upload-img', reader.result)
      }
    },
    showDetail () {
      // ..
    },
    deleteImg () {
      this.imageUrl = ''
    }
  }
}
</script>

<style lang='less'>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 148px;
    display: block;
  }
  .el-upload-list__item-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s;
    span {
      display: none;
      cursor: pointer;
    }
    span+span {
      margin-left: 15px;
    }
    .el-upload-list__item-delete {
      position: static;
      font-size: inherit;
      color: inherit;
    }
    &:hover {
      opacity: 1;
      .el-upload-list__item-delete,
      span {
        display: inline-block;
      }
    }
  }
</style>

<style lang="less" scoped>
  .hide-input {
    .el-upload__input {
      display: none;
    }
  }
</style>
