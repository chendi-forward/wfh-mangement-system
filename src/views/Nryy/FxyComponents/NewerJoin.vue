<template>
  <div class="brand-introduction">
    <main class="brand-introduction__main">
      <div class="upload-img__box">
        <div class="upload-img--upload">上传长图:</div>
        <div class="upload-img--img">
          <img-upload class="upload-img--long" v-model="imageUrl_long" tip='长图'></img-upload>
        </div>
        <div class="upload-img--step">
          <div class="upload-img__tool">
            <span class="upload-img__tool--info">*支持jpg/png格式，不超过5M</span>
            <el-button class="upload-img__tool--preview" size="small" @click="previewLong">预览</el-button>
          </div>
        </div>
      </div>
      <hr>
      <div class="upload-img__box">
        <div class="upload-img--upload">上传封面:</div>
        <div class="upload-img--img">
          <img-upload v-model="imageUrl_cover" class="upload-img--cover" tip='封面'></img-upload>
        </div>
        <div class="upload-img--step">
          <div class="upload-img__tool">
            <span class="upload-img__tool--info">*持jpg/png格式 ，尺寸750 : 360 px，不超过5M</span>
            <el-button class="upload-img__tool--preview" size="small" @click="previewCover">预览</el-button>
          </div>
        </div>
      </div>
      <hr>
      <div class="page-jump-link">
        <div class="page-jump-link__title">页面生成跳转链接:</div>
        <el-input class="page-jump-link__input" v-model="pageJumpLink" placeholder="页面生成跳转链接"></el-input>
      </div>
    </main>
    <footer class="brand-introduction__footer">
      <el-button class="upload-img__btn--save upload__btn--sure" size="small">保存</el-button>
      <el-button class="upload-img__btn--cancel" size="small">取消</el-button>
    </footer>
    <el-dialog title="图片预览" :visible.sync="isShowImgPreview">
      <img :src="image_preview" alt="图片预览">
    </el-dialog>
  </div>
</template>

<script>
  import ImgUpload from '../BasicComponents/ImgUpload'
  export default {
    name: 'newer-join',
    components: {
      'img-upload': ImgUpload
    },
    data () {
      return {
        imageUrl_long: '',
        imageUrl_cover: '',
        isShowImgPreview: false,
        image_preview: '',
        pageJumpLink: ''
      }
    },
    methods: {
      uploadImgLong (value) {
        this.imgBase64Long = value
      },
      uploadImgCover (value) {
        this.imgBase64Cover = value
      },
      previewLong () {
        this.isShowImgPreview = true
        this.image_preview = this.imageUrl_long
      },
      previewCover () {
        this.isShowImgPreview = true
        this.image_preview = this.imageUrl_cover
      },
      inputLink (value) {
        console.log(value)
      }
    }
  }
</script>

<style lang="less" scoped>
  .brand-introduction__main {
    padding-left: 47px;
    padding-right: 50px;
    background-color: #fff;
    & > div {
      height: 310px;
    }
    .page-jump-link {
      display: flex;
      align-items: center;
      height: 184px;
      .page-jump-link__title {
        font-size: 15px;
        width: 16%
      }
    }
    hr {
      border: unset;
      background-color: #eaeced;
      height: 1px;
      margin: 0 -126px 0 -44px;
    }
  }
  .brand-introduction__footer {
    padding-left: 47px;
    padding-right: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 6px;
    height: 119px;
    background-color: #fff;
  }
  .upload-img__box {
    display: flex;
    padding-top: 67px;
    .upload-img--upload {
      width: 10%;
      font-size: 15px;
      color: #363f51;
    }
    .upload-img--img {
      width: 43%;
      text-align: start;
    }
    .upload-img--step {
      flex: 1;
      text-align: start;
    }
    .upload-img__tool {
      margin-top: 69px;
      text-align: end;
      .upload-img__tool--info {
        color: #fe4a56;
        margin-right: 10px;
      }
    }
    .upload-img--long {
      width: 212px;
      height: 176px;
    }
    .upload-img--cover {
      width: 368px;
      height: 176px;
    }
  }
</style>
