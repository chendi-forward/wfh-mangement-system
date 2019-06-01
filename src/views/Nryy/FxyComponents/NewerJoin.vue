<template>
  <div class="brand-introduction">
    <main class="brand-introduction__main">
      <div class="upload-img__box">
        <div class="upload-img--upload">上传长图:</div>
        <div class="upload-img--img upload-img--long">
          <img src="../timg.jpg">
        </div>
        <div class="upload-img--step">
          <img-upload @input-link='inputLink' @upload-img='uploadImg'></img-upload>
          <div class="upload-img__tool">
            <el-button class="upload-img__tool--upload upload__btn--sure" size="small">上传</el-button>
            <el-button class="upload-img__tool--preview" size="small">预览</el-button>
          </div>
        </div>
      </div>
      <hr>
      <div class="upload-img__box">
        <div class="upload-img--upload">上传封面:</div>
        <div class="upload-img--img upload-img--cover">
          <img src="../timg.jpg">
        </div>
        <div class="upload-img--step">
          <img-upload @input-link='inputLink' @upload-img='uploadImg'></img-upload>
          <div class="upload-img__tool">
            <el-button class="upload-img__tool--upload upload__btn--sure" size="small">上传</el-button>
            <el-button class="upload-img__tool--preview" size="small">预览</el-button>
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
        imgBase64: '',
        uploadAddress: '',
        isShowImgPreview: false,
        pageJumpLink: ''
      }
    },
    methods: {
      uploadImg (value) {
        console.log(value)
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
    padding-right: 129px;
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
        width: 21%
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
