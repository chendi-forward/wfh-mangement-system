<template>
  <div class="gzsm">
    <main class="gzsm-main">
      <div class="flsm flsm-dx gzsm-box">
        <div class="title">返利说明</div>
        <div class="content">
          <img-upload class="upload-img" tip='代销' v-model="imageUrl_flsm_dx"></img-upload>
          <div class="content-tool">
            <p class="upload-img__info">*支持jpg/png格式，不超过5M</p>
            <el-button class="upload-img__btn--cancel" size="small" @click="preview('flsm_dx')">预览</el-button>
          </div>
        </div>
      </div>
      <div class="hyz gzsm-box">
        <div class="title">活跃值说明</div>
        <div class="content">
          <img-upload class="upload-img" v-model="imageUrl_hyzsm"></img-upload>
          <div class="content-tool">
            <p class="upload-img__info">*支持jpg/png格式，不超过5M</p>
            <el-button class="upload-img__btn--cancel" size="small" @click="preview('hyzsm')">预览</el-button>
          </div>
        </div>
      </div>
      <div class="flsm flsm-tj gzsm-box">
        <div class="title" style="opacity: 0;">返利说明</div>
        <div class="content">
          <img-upload class="upload-img" tip='封面' v-model="imageUrl_flsm_fm"></img-upload>
          <div class="content-tool">
            <p class="upload-img__info">*支持jpg/png格式，不超过5M</p>
            <el-button class="upload-img__btn--cancel" size="small" @click="preview('flsm_fm')">预览</el-button>
          </div>
        </div>
      </div>
      <div class="hydj gzsm-box">
        <div class="title">会员等级说明</div>
        <div class="content">
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
  </div>
</template>

<script>
  import ImgUpload from './BasicComponents/ImgUpload'
  export default {
    name: 'nryy-gzsm',
    components: {
      'img-upload': ImgUpload
    },
    data () {
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
        border-radius: 4px 4px 0 0;
        padding: 0 21px;
        background-color: #F7F8F9;
        font-size: 18px;
      }
      .content {
        display: flex;
        justify-content: space-between;
        margin: 35px 0;
        padding-left: 10%;
        padding-right: 10%;
        .content-img {
          width: 180px;
          height: 150px;
        }
        .upload-img {
          width: 180px;
          height: 150px;
        }
      }
      .content-tool {
        .upload-img__info {
          margin-top: 0;
          color: #fe4a56;
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
