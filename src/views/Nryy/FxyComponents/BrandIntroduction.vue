<template>
  <div class="brand-introduction">
    <main class="brand-introduction__main">
      <div class="upload-img__box">
        <div class="upload-img--upload">上传长图:</div>
        <div class="upload-img--img upload-img--long">
          <img :src="imgBase64Long">
        </div>
        <div class="upload-img--step">
          <img-upload @input-link='inputLinkLong' @upload-img='uploadImgLong'></img-upload>
          <div class="upload-img__tool">
            <el-button class="upload-img__tool--upload upload__btn--sure" size="small">上传</el-button>
            <el-button class="upload-img__tool--preview" size="small" @click="previewLong">预览</el-button>
          </div>
        </div>
      </div>
      <hr>
      <div class="upload-img__box">
        <div class="upload-img--upload">上传封面:</div>
        <div class="upload-img--img upload-img--cover">
          <img :src="imgBase64Cover">
        </div>
        <div class="upload-img--step">
          <img-upload @input-link='inputLinkCover' @upload-img='uploadImgCover'></img-upload>
          <div class="upload-img__tool">
            <el-button class="upload-img__tool--upload upload__btn--sure" size="small">上传</el-button>
            <el-button class="upload-img__tool--preview" size="small" @click="previewCover">预览</el-button>
          </div>
        </div>
      </div>
    </main>
    <footer class="brand-introduction__footer">
      <el-button class="upload-img__btn--save upload__btn--sure" size="small">保存</el-button>
      <el-button class="upload-img__btn--cancel" size="small">取消</el-button>
    </footer>
    <div>
      <el-dialog title="图片预览" :visible.sync="isShowImgPreview">
        <img :src="imgBase64Long" alt="图片预览">
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import ImgUpload from '../BasicComponents/ImgUpload'
  export default {
    name: 'brand-introduction',
    components: {
      'img-upload': ImgUpload
    },
    data () {
      return {
        imgBase64Long: '',
        imgBase64Cover: '',
        uploadAddressLong: '',
        uploadAddressCover: '',
        isShowImgPreview: false
      }
    },
    methods: {
      uploadImgLong (value) {
        this.imgBase64Long = value
      },
      uploadImgCover (value) {
        this.imgBase64Cover = value
      },
      inputLinkLong (value) {
        this.uploadAddress = value
      },
      inputLinkCover (value) {
        this.uploadAddressCover = value
      },
      previewLong () {
        this.isShowImgPreview = true
      },
      previewCover () {
        // ..
      }
    }
  }
</script>

<style lang="less" scoped>
  .brand-introduction__main {
    padding-left: 47px;
    padding-right: 129px;
    height: 620px;
    background-color: #fff;
    & > div {
      height: 50%;
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
    padding-right: 129px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 6px;
    height: 119px;
    background-color: #fff;
  }
  .upload-img__box {
    display: flex;
    & > div {
      padding-top: 67px;
    }
    .upload-img--upload {
      width: 14%;
      font-size: 15px;
      color: #363f51;
    }
    .upload-img--img {
      width: 43%;
      text-align: start;
    }
    .upload-img--step {
      width: 43%;
      text-align: start;
    }
    .upload-img__tool {
      margin-top: 69px;
      text-align: end;
    }
    .upload-img--long img {
      width: 212px;
      height: 176px;
    }
    .upload-img--cover img {
      width: 368px;
      height: 176px;
    }
  }
</style>
