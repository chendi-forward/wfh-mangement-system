<template>
  <div class="brand-introduction">
    <main class="brand-introduction__main">
      <div class="upload-img__box">
        <div class="upload-img--upload">上传长图:</div>
        <div class="upload-img--img">
          <img-upload
            size='5'
            class="upload-img--long"
            key-name="goods"
            tip='长图'
            :imgurl='imageUrl_long'
            @delete-img='longDelete'
            @upload-success='longUploadSuccess'
            @upload-error='coverUploadError'
          >
          </img-upload>
        </div>
        <div class="upload-img--step">
          <div class="upload-img__tool">
            <span class="upload-img__tool--info">*支持jpg/png格式，不超过5M</span>
            <el-button
              class="upload-img__tool--preview"
              size="small"
              @click="previewLong"
            >预览</el-button>
          </div>
        </div>
      </div>
      <!-- <hr> -->
      <!-- <div class="upload-img__box">
        <div class="upload-img--upload">上传封面:</div>
        <div class="upload-img--img">
          <img-upload v-model="imageUrl_cover" class="upload-img--cover" tip='封面'></img-upload>
          <img-upload
            size='5'
            class="upload-img--cover"
            key-name="goods"
            tip='封面'
            :imgurl='imageUrl_cover'
            @delete-img='coverDelete'
            @upload-success='coverUploadSuccess'
            @upload-error='coverUploadError'
          >
          </img-upload>
        </div>
        <div class="upload-img--step">
          <div class="upload-img__tool">
            <span class="upload-img__tool--info">*持jpg/png格式 ，尺寸750 : 360 px，不超过5M</span>
            <el-button
              class="upload-img__tool--preview"
              size="small"
              @click="previewCover"
            >预览</el-button>
          </div>
        </div>
      </div> -->
    </main>
    <footer class="brand-introduction__footer">
      <el-button
        size="small"
        type="success"
        @click="save"
      >保存</el-button>
      <el-button
        class="upload-img__btn--cancel"
        size="small"
      >取消</el-button>
    </footer>
    <el-dialog
      title="图片预览"
      :visible.sync="isShowImgPreview"
    >
      <img
        style='width: 100%'
        :src="image_preview"
        alt="图片预览"
      >
    </el-dialog>
  </div>
</template>

<script>
import ImgUpload from '../BasicComponents/ImgUpload'
import * as commonsConfig from 'COMMONS/commonsConfig.js'
const base_url = commonsConfig.BASE_URL

export default {
  name: 'brand-introduction',
  components: {
    'img-upload': ImgUpload
  },
  data() {
    return {
      imageUrl_long: '',
      imageUrl_cover: '',
      isShowImgPreview: false,
      image_preview: ''
    }
  },
  created() {
    this.getData()
  },
  methods: {
    coverUploadSuccess(res) {
      this.imageUrl_cover = res.path
    },
    coverUploadError() {
      this.$message({
        type: 'error',
        message: '上传错误！'
      })
    },
    longUploadSuccess(res) {
      this.imageUrl_long = res.path
    },
    previewLong() {
      this.isShowImgPreview = true
      this.image_preview = base_url + this.imageUrl_long
    },
    previewCover() {
      this.isShowImgPreview = true
      this.image_preview = base_url + this.imageUrl_cover
    },
    longDelete() {
      this.imageUrl_long = ''
    },
    coverDelete() {
      this.imageUrl_cover = ''
    },
    save() {
      if (!this.imageUrl_long) return this.$message.error('请上传图片！')
      let params = {
        source: 'brand',
        // cover_pic: this.imageUrl_cover,
        content_pic: this.imageUrl_long
      }
      this.$post('/content/active/add_other_pic', params).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功！'
        })
      })
    },
    getData() {
      let params = {
        type: 'brand'
      }
      this.$get('/discover/active_other_info', params)
      .then(res => {
        this.imageUrl_long = res.data[0].content_pic
        this.imageUrl_cover = res.data[0].pic_link
      })
    }
  }
}
</script>

<style lang="less" scoped>
.brand-introduction__main {
  padding-left: 47px;
  padding-right: 50px;
  // height: 620px;
  background-color: #fff;
  padding-bottom: 67px;
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
