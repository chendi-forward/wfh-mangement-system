<template>
  <div class="gzsm">
    <main class="gzsm-main">
      <div class="flsm flsm-dx gzsm-box">
        <div class="title">返利说明</div>
        <div class="content">
          <img-upload @input-link='inputLinkFlsm' @upload-img='uploadImgFlsm'></img-upload>
          <div class="content-tool">
            <img class="content-img" src="./timg.jpg" alt="">
            <div class="upload-img__tool">
              <el-button class="upload__btn--sure" size="small">上传</el-button><br>
              <el-button class="upload-img__btn--cancel" size="small">预览</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="hyz gzsm-box">
        <div class="title">活跃值说明</div>
        <div class="content">
          <img-upload @input-link='inputLinkFlsm' @upload-img='uploadImgFlsm'></img-upload>
          <div class="content-tool">
            <img class="content-img" src="./timg.jpg" alt="">
            <div class="upload-img__tool">
              <el-button class="upload__btn--sure" size="small">上传</el-button><br>
              <el-button class="upload-img__btn--cancel" size="small">预览</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="flsm flsm-tj gzsm-box">
        <div class="title" style="opacity: 0;">返利说明</div>
        <div class="content">
          <img-upload @input-link='inputLinkFlsm' @upload-img='uploadImgFlsm'></img-upload>
          <div class="content-tool">
            <img class="content-img" src="./timg.jpg" alt="">
            <div class="upload-img__tool">
              <el-button class="upload__btn--sure" size="small">上传</el-button><br>
              <el-button class="upload-img__btn--cancel" size="small">预览</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="hydj gzsm-box">
        <div class="title">会员等级说明</div>
        <div class="content">
          <img-upload @input-link='inputLinkFlsm' @upload-img='uploadImgFlsm'></img-upload>
          <div class="content-tool">
            <img class="content-img" src="./timg.jpg" alt="">
            <div class="upload-img__tool">
              <el-button class="upload__btn--sure" size="small">上传</el-button><br>
              <el-button class="upload-img__btn--cancel" size="small">预览</el-button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer class="gzsm-footer gzsm-box">
      <div class="title">我的邀请码</div>
      <div class="content gzsm-footer__content">
        <img class="content-img" src="./timg.jpg" alt="">
        <div class="gzsm-footer__tool">
          <img-upload @input-link='inputLinkFlsm' @upload-img='uploadImgFlsm'></img-upload>
          <div class="upload-img__tool">
            <el-button class="upload__btn--sure" size="small">上传</el-button><br>
            <el-button class="upload-img__btn--cancel" size="small">预览</el-button>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  import ImgUpload from './BasicComponents/ImgUpload'
  export default {
    name: 'gzsm',
    components: {
      'img-upload': ImgUpload
    },
    data () {
      return {}
    },
    methods: {
      inputLinkFlsm () {},
      uploadImgFlsm () {}
    }
  }
</script>

<style lang='less' scoped>
  .gzsm {
    .gzsm-main {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      grid-column-gap: 25px;
      grid-row-gap: 18px;
      height: 861px;
    }
    .gzsm-footer {
      margin-top: 38px;
      height: 308px;
      .gzsm-footer__content {
        display: flex;
        justify-content: space-between;
      }
      .gzsm-footer__tool {
        display: flex;
        align-items: flex-end;
        margin-bottom: 20px;
      }
      .upload-img__tool {
        margin-left: 48px;
        & > button {
          margin-top: 20px;
        }
      }
    }
    .gzsm-box {
      border-radius: 4px;
      background-color: #fff;
      .title {
        height: 63px;
        line-height: 63px;
        margin-bottom: 51px;
        border-radius: 4px 4px 0 0;
        padding: 0 21px;
        background-color: #F7F8F9;
        font-size: 18px;
      }
      .content {
        padding-left: 53px;
        padding-right: 71px;
        .content-img {
          width: 180px;
          height: 150px;
        }
      }
      .content-tool {
        display: flex;
        justify-content: space-between;
        margin-top: 23px;
        .upload-img__tool {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
      }
    }
    .flsm-dx {
      width: 100%;
      margin-bottom: -18px;
      border-bottom: 1px solid #EAECED;
      border-radius: 4px 4px 0 0;
    }
    .flsm-tj {
      width: 100%;
      border-radius: 0 0 4px 4px;
    }
  }
</style>
