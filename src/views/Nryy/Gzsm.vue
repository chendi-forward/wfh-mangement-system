<template>
  <div class="gzsm">
    <main class="gzsm-main">
      <div class="flsm flsm-dx gzsm-box">
        <div class="title">返利说明</div>
        <div class="content">
<<<<<<< HEAD
          <img-upload class="upload-img" tip='代销' v-model="imageUrl_flsm_dx"></img-upload>
          <div class="content-tool">
            <p class="upload-img__info">*支持jpg/png格式，不超过5M</p>
            <el-button class="upload-img__btn--cancel" size="small" @click="preview('flsm_dx')">预览</el-button>
=======
          <img-upload @input-link='inputLinkFlsm' @upload-img='uploadImgFlsm'></img-upload>
          <div class="content-tool">
            <img class="content-img" src="./timg.jpg" alt="">
            <div class="upload-img__tool">
              <el-button class="upload__btn--sure" size="small">上传</el-button><br>
              <el-button class="upload-img__btn--cancel" size="small">预览</el-button>
            </div>
>>>>>>> dd63895a60853cfe221b5bfd818bf4c1d4b806af
          </div>
        </div>
      </div>
      <div class="hyz gzsm-box">
        <div class="title">活跃值说明</div>
        <div class="content">
<<<<<<< HEAD
          <img-upload class="upload-img" v-model="imageUrl_hyzsm"></img-upload>
          <div class="content-tool">
            <p class="upload-img__info">*支持jpg/png格式，不超过5M</p>
            <el-button class="upload-img__btn--cancel" size="small" @click="preview('hyzsm')">预览</el-button>
=======
          <img-upload @input-link='inputLinkFlsm' @upload-img='uploadImgFlsm'></img-upload>
          <div class="content-tool">
            <img class="content-img" src="./timg.jpg" alt="">
            <div class="upload-img__tool">
              <el-button class="upload__btn--sure" size="small">上传</el-button><br>
              <el-button class="upload-img__btn--cancel" size="small">预览</el-button>
            </div>
>>>>>>> dd63895a60853cfe221b5bfd818bf4c1d4b806af
          </div>
        </div>
      </div>
      <div class="flsm flsm-tj gzsm-box">
        <div class="title" style="opacity: 0;">返利说明</div>
        <div class="content">
<<<<<<< HEAD
          <img-upload class="upload-img" tip='封面' v-model="imageUrl_flsm_fm"></img-upload>
          <div class="content-tool">
            <p class="upload-img__info">*支持jpg/png格式，不超过5M</p>
            <el-button class="upload-img__btn--cancel" size="small" @click="preview('flsm_fm')">预览</el-button>
=======
          <img-upload @input-link='inputLinkFlsm' @upload-img='uploadImgFlsm'></img-upload>
          <div class="content-tool">
            <img class="content-img" src="./timg.jpg" alt="">
            <div class="upload-img__tool">
              <el-button class="upload__btn--sure" size="small">上传</el-button><br>
              <el-button class="upload-img__btn--cancel" size="small">预览</el-button>
            </div>
>>>>>>> dd63895a60853cfe221b5bfd818bf4c1d4b806af
          </div>
        </div>
      </div>
      <div class="hydj gzsm-box">
        <div class="title">会员等级说明</div>
        <div class="content">
<<<<<<< HEAD
          <img-upload class="upload-img" v-model="imageUrl_hydj"></img-upload>
          <div class="content-tool">
            <p class="upload-img__info">*支持jpg/png格式，不超过5M</p>
            <el-button class="upload-img__btn--cancel" size="small" @click="preview('hydj')">预览</el-button>
          </div>
        </div>
      </div>
      <div class="hydj gzsm-box">
        <div class="title">我的邀请码</div>
        <div class="content">
          <img-upload class="upload-img" v-model="imageUrl_wdyqm"></img-upload>
          <div class="content-tool">
            <p class="upload-img__info">*支持jpg/png格式，不超过5M</p>
            <el-button class="upload-img__btn--cancel" size="small" @click="preview('wdyqm')">预览</el-button>
          </div>
        </div>
      </div>
    </main>
<!--     <footer class="gzsm-footer gzsm-box">
    </footer> -->
    <el-dialog title="图片预览" :visible.sync="isShowImgPreview">
      <img :src="image_preview" alt="图片预览">
    </el-dialog>
=======
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
>>>>>>> dd63895a60853cfe221b5bfd818bf4c1d4b806af
  </div>
</template>

<script>
  import ImgUpload from './BasicComponents/ImgUpload'
  export default {
<<<<<<< HEAD
    name: 'nryy-gzsm',
=======
    name: 'gzsm',
>>>>>>> dd63895a60853cfe221b5bfd818bf4c1d4b806af
    components: {
      'img-upload': ImgUpload
    },
    data () {
<<<<<<< HEAD
      return {
        imageUrl_flsm_dx: '',
        imageUrl_flsm_fm: '',
        imageUrl_hyzsm: '',
        imageUrl_hydj: '',
        imageUrl_wdyqm: '',
        isShowImgPreview: false,
        image_preview: ''
      }
    },
    methods: {
      preview (vale) {
        this.isShowImgPreview = true
        this.image_preview = this['imageUrl_' + vale]
      },
=======
      return {}
    },
    methods: {
>>>>>>> dd63895a60853cfe221b5bfd818bf4c1d4b806af
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
<<<<<<< HEAD
=======
      height: 861px;
>>>>>>> dd63895a60853cfe221b5bfd818bf4c1d4b806af
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
<<<<<<< HEAD
=======
        margin-bottom: 51px;
>>>>>>> dd63895a60853cfe221b5bfd818bf4c1d4b806af
        border-radius: 4px 4px 0 0;
        padding: 0 21px;
        background-color: #F7F8F9;
        font-size: 18px;
      }
      .content {
<<<<<<< HEAD
        display: flex;
        justify-content: space-between;
        margin: 35px 0;
        padding-left: 10%;
        padding-right: 10%;
=======
        padding-left: 53px;
        padding-right: 71px;
>>>>>>> dd63895a60853cfe221b5bfd818bf4c1d4b806af
        .content-img {
          width: 180px;
          height: 150px;
        }
<<<<<<< HEAD
        .upload-img {
          width: 180px;
          height: 150px;
        }
      }
      .content-tool {
        .upload-img__info {
          margin-top: 0;
          color: #fe4a56;
=======
      }
      .content-tool {
        display: flex;
        justify-content: space-between;
        margin-top: 23px;
        .upload-img__tool {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
>>>>>>> dd63895a60853cfe221b5bfd818bf4c1d4b806af
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
