<template>
  <el-upload
    class="avatar-uploader"
    :action="action_url"
    :name="keyName"
    accept="image/jpeg, image/png"
    :show-file-list="false"
    :on-success='uploadSuccess'
    :on-error='uploadError'
    :before-upload="beforeAvatarUpload">
    <span class="avater-tip" v-if="tip">{{tip}}</span>
    <span class="avater-delete" @click.stop="deleteImg" v-show="!!imageUrl">
      ×
    </span>
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-if="!imageUrl" class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
  import { BASE_URL } from 'COMMONS/commonsConfig.js'
  export default {
    name: 'img-upload-component',
    props: {
      size: {
        type: String,
        default: '5'
      },
      tip: String,
      isShowImg: {
        type: Boolean,
        default: true
      },
      keyName: {
        type: String
      }
    },
    data () {
      return {
        imageUrl: '',
        action_url: BASE_URL + '/pic/push_goods_pic'
      }
    },
    methods: {
      deleteImg () {
        this.$emit('delete-img')
      },
      beforeAvatarUpload (file) {
        const isJPG_PNG = (file.type === 'image/jpeg' || file.type === 'image/png')
        const size = file.size / 1024 / 1024 < this.size
        if (!isJPG_PNG) {
          this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!')
        }
        if (!size) {
          this.$message.error(`上传头像图片大小不能超过 ${this.size}MB!`)
        }
        return isJPG_PNG && size
      },
      uploadSuccess (res) {
        this.imageUrl = BASE_URL + res.path
        this.$emit('upload-success', res)
      },
      uploadError (res) {
        this.$emit('upload-error', res)
      }
    }
  }
</script>

<style lang='less'>
  .avatar-uploader {
    height: 100%;
    width: 100%;
  }
  .avater-tip {
    background: #363f51;
    color: #fff;
    font-size: 14px;
    position: absolute;
    left: 0;
    top: 10px;
    padding: 6px 25px 6px 15px;
    border-radius: 0 15px 15px 0
  }
  .avater-delete {
    display: inline-flex;
    justify-content: center;
    align-content: center;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    line-height: 28px;
    font-size: 23px;
    background: #ff8282;
    color: #fff;
    position: absolute;
    right: -14px;
    top: -14px;
    cursor: pointer;
  }
  .avatar-uploader .el-upload {
    height: 100%;
    width: 100%;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    // overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    color: #8c939d;
    width: 100%;
    height: 100%;
  }
  .avatar {
    height: 100%;
    width: 100%;
    display: block;
  }
</style>
