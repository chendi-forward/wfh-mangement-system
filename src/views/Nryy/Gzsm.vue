<template>
  <div class="gzsm">
    <main class="gzsm-main">
      <div class="flsm flsm-dx gzsm-box">
        <div class="title">返利说明</div>
        <div class="content">
          <img-upload
            size='5'
            class="upload-img"
            key-name="goods"
            tip='代销返利帮助'
            :imgurl='imageUrl_flsm_dx'
            @delete-img='imgDelete("flsm_dx")'
            @upload-success='(res) => uploadSuccess(res, "flsm_dx")'
            @upload-error='uploadError("flsm_dx")'
          />
          <div class="content-tool">
            <p class="upload-img__info">*支持jpg/png格式，不超过5M</p>
            <el-button
              class="upload-img__btn--cancel"
              size="small"
              @click="preview('flsm_dx')"
            >预览</el-button>
          </div>
        </div>
      </div>
      <div class="hyz gzsm-box">
        <div class="title">活跃值说明</div>
        <div class="content">
          <img-upload
            size='5'
            class="upload-img"
            key-name="goods"
            :imgurl='imageUrl_hyzsm'
            @delete-img='imgDelete("hyzsm")'
            @upload-success='(res) => uploadSuccess(res, "hyzsm")'
            @upload-error='uploadError("hyzsm")'
          />
          <div class="content-tool">
            <p class="upload-img__info">*支持jpg/png格式，不超过5M</p>
            <el-button
              class="upload-img__btn--cancel"
              size="small"
              @click="preview('hyzsm')"
            >预览</el-button>
          </div>
        </div>
      </div>
      <div class="flsm flsm-tj gzsm-box">
        <div
          class="title"
          style="opacity: 0;"
        >返利说明</div>
        <div class="content">
          <img-upload
            size='5'
            class="upload-img"
            key-name="goods"
            tip='推荐返利帮助'
            :imgurl='imageUrl_flsm_fm'
            @delete-img='imgDelete("flsm_fm")'
            @upload-success='(res) => uploadSuccess(res, "flsm_fm")'
            @upload-error='uploadError("flsm_fm")'
          />
          <div class="content-tool">
            <p class="upload-img__info">*支持jpg/png格式，不超过5M</p>
            <el-button
              class="upload-img__btn--cancel"
              size="small"
              @click="preview('flsm_fm')"
            >预览</el-button>
          </div>
        </div>
      </div>
      <div class="hydj gzsm-box">
        <div class="title">会员等级说明</div>
        <div class="content">
          <img-upload
            size='5'
            class="upload-img"
            key-name="goods"
            :imgurl='imageUrl_hydj'
            @delete-img='imgDelete("hydj")'
            @upload-success='(res) => uploadSuccess(res, "hydj")'
            @upload-error='uploadError("hydj")'
          />
          <div class="content-tool">
            <p class="upload-img__info">*支持jpg/png格式，不超过5M</p>
            <el-button
              class="upload-img__btn--cancel"
              size="small"
              @click="preview('hydj')"
            >预览</el-button>
          </div>
        </div>
      </div>
      <div class="hydj gzsm-box">
        <div class="title">我的邀请码说明</div>
        <div class="content">
          <img-upload
            size='5'
            class="upload-img"
            key-name="goods"
            :imgurl='imageUrl_wdyqm'
            @delete-img='imgDelete("wdyqm")'
            @upload-success='(res) => uploadSuccess(res, "wdyqm")'
            @upload-error='uploadError("wdyqm")'
          />
          <div class="content-tool">
            <p class="upload-img__info">*支持jpg/png格式，不超过5M</p>
            <el-button
              class="upload-img__btn--cancel"
              size="small"
              @click="preview('wdyqm')"
            >预览</el-button>
          </div>
        </div>
      </div>
    </main>
    <el-dialog
      title="图片预览"
      :visible.sync="isShowImgPreview"
    >
      <img
        style="width: 100%"
        :src="base_url + image_preview"
        alt="图片预览"
      >
    </el-dialog>
  </div>
</template>

<script>
import ImgUpload from './BasicComponents/ImgUpload'
import * as commonsConfig from 'COMMONS/commonsConfig.js'
const base_url = commonsConfig.BASE_URL

export default {
  name: 'nryy-gzsm',
  components: {
    'img-upload': ImgUpload
  },
  data() {
    return {
      base_url,
      imageUrl_flsm_dx: '',
      imageUrl_hyzsm: '',
      imageUrl_flsm_fm: '',
      imageUrl_hydj: '',
      imageUrl_wdyqm: '',
      isShowImgPreview: false,
      image_preview: ''
    }
  },
  created() {
    this.getData('flsm_dx')
    this.getData('flsm_fm')
    this.getData('hyzsm')
    this.getData('hydj')
    this.getData('wdyqm')
  },
  methods: {
    imgDelete(name) {
      this['imageUrl_' + name] = ''
    },
    uploadSuccess(res, name) {
      this['imageUrl_' + name] = res.path
      let option = {}
      switch (name) {
        case 'flsm_dx':
          option = {
            source: 'rebate',
            content_pic: this['imageUrl_' + name]
          }
          break
        case 'flsm_fm':
          option = {
            source: 'rebate',
            cover_pic: this['imageUrl_' + name]
          }
          break
        case 'hyzsm':
          option = {
            source: 'active',
            content_pic: this['imageUrl_' + name]
          }
          break
        case 'hydj':
          option = {
            source: 'level',
            content_pic: this['imageUrl_' + name]
          }
          break
        case 'wdyqm':
          option = {
            source: 'invite',
            content_pic: this['imageUrl_' + name]
          }
          break
        default:
          break
      }
      this.$post('/content/active/add_other_pic', option).then(res => {
        if (res.data && res.message === 'ok') {
          this.$message({
            type: 'success',
            message: '上传成功！'
          })
        }
      })
    },
    uploadError(name) {},

    preview(name) {
      this.isShowImgPreview = true
      this.image_preview = this['imageUrl_' + name]
    },
    getData(name) {
      let option
      switch (name) {
        case 'flsm_dx':
          option = {
            type: 'rebate'
          }
          this.$get('/discover/active_other_info', {...option}).then(res => {
            if (res.data && res.message === 'ok') {
              this.imageUrl_flsm_dx = res.data[0].content_pic
              this.imageUrl_flsm_fm = res.data[0].pic_link
            }
          })
          break
        case 'hyzsm':
          option = {
            type: 'active'
          }
          this.$get('/discover/active_other_info', {...option}).then(res => {
            if (res.data && res.message === 'ok') {
              
              this['imageUrl_' + name] = res.data[0].content_pic
            }
          })
          break
        case 'hydj':
          option = {
            type: 'level'
          }
          this.$get('/discover/active_other_info', {...option}).then(res => {
            if (res.data && res.message === 'ok') {
              this['imageUrl_' + name] = res.data[0].content_pic
            }
          })
          break
        case 'wdyqm':
          option = {
            type: 'invite'
          }
          this.$get('/discover/active_other_info', {...option}).then(res => {
            if (res.data && res.message === 'ok') {
              this['imageUrl_' + name] = res.data[0].content_pic
            }
          })
          break
        default:
          break
      }
    }
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
    margin-bottom: 18px;
    border-radius: 4px;
    background-color: #fff;
    .title {
      height: 63px;
      line-height: 63px;
      margin-bottom: 51px;
      border-radius: 4px 4px 0 0;
      padding: 0 21px;
      background-color: #f7f8f9;
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
    border-bottom: 1px solid #eaeced;
    border-radius: 4px 4px 0 0;
  }
  .flsm-tj {
    width: 100%;
    border-radius: 0 0 4px 4px;
  }
}
</style>
