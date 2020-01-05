<template>
  <div class="content-setting">
    <div class="content-body">
      <div class="content-title">
        内容设置
      </div>
      <el-form
        name="contentSetting"
        ref="formContentSetting"
        :model='formContentSetting'
        class="content-body__wrap"
      >
        <el-form-item
          class="content-body__item"
          prop="title"
        >
          <div class="item__label required">文章标题：</div>
          <div class="item__input">
            <el-input
              placeholder="输入标题..."
              v-model="formContentSetting.title"
            ></el-input>
          </div>
          <div class="item__rule">
            *必填项，30个字符以内
          </div>
        </el-form-item>
        <el-form-item
          class="content-body__item"
          prop="label"
        >
          <div class="item__label required">标签类别：</div>
          <div class="item__input">
            <el-select
              v-model="formContentSetting.label"
              placeholder="选择标签..."
            >
              <el-option
                v-for="item in labelList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="item__rule">
            *必填项，8 个字符以内
          </div>
        </el-form-item>
        <div class="content-body__item img-item">
          <div class="item__label required">上传封面：</div>
          <div class="item__input">
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
          <div class="item__rule item__rule--upload">
            <span>
              *持jpg/png格式 ，尺寸750 : 360 px，不超过5M
            </span>
            <el-button
              class="upload-img__tool--preview"
              size="small"
              @click="previewCover"
            >预览</el-button>
          </div>
        </div>
        <div class="content-body__item">
          <div class="item__label required">上传长图：</div>
          <div class="item__input">
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
          <div class="item__rule item__rule--upload">
            <span>
              *支持jpg/png格式，不超过5M
            </span>
            <el-button
              class="upload-img__tool--preview"
              size="small"
              @click="previewLong"
            >预览</el-button>
          </div>
        </div>
      </el-form>
    </div>
    <div class="content-footer">
      <div class="content-title">发布设置</div>
      <div class="content-footer__wrap">
        <div class="content-footer__item">
          <div class="item__label">发布状态：</div>
          <div>
            <el-radio-group
              class="spgl-form--content"
              v-model="publicStauts"
            >
              <el-radio :label="1">显示</el-radio>
              <el-radio :label="0">隐藏</el-radio>
            </el-radio-group>
          </div>
          <el-checkbox v-model="isRecommend">并推荐到首页</el-checkbox>
        </div>
        <div class="content-footer__item">
          <div class="item__label">发布时间：</div>
          <div>
            <el-radio-group
              class="spgl-form--content"
              v-model="publicImme"
            >
              <el-radio :label="1">立即发布</el-radio>
              <el-radio :label="0">定时发布</el-radio>
            </el-radio-group>
          </div>
          <el-date-picker
            v-show="!publicImme"
            class="spgl-form--input data-input"
            v-model="definitData"
            type="datetime"
            picker-options="pickerOptions"
            placeholder="选择发布时间"
          >
          </el-date-picker>
        </div>
      </div>
    </div>
    <div class="content-save">
      <el-button
        size="small"
        class="cancel-btn"
        @click="saveToDraft"
      >存为草稿</el-button>
      <el-button
        size="small"
        class="success-btn"
        @click="save"
      >保存</el-button>
      <el-button
        size="small"
        class="cancel-btn"
        @click="cancel"
      >取消</el-button>
    </div>
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
import ImgUpload from './ImgUpload'
import moment from 'moment'

import * as commonsConfig from 'COMMONS/commonsConfig.js'
const base_url = commonsConfig.BASE_URL

export default {
  name: 'content-setting',
  components: {
    'img-upload': ImgUpload
  },
  props: {
    detail: Object
  },
  data() {
    return {
      formContentSetting: {
        title: '',
        label: ''
      },
      imageUrl_cover: '',
      imageUrl_long: '',
      publicStauts: 1,
      publicImme: 1, // 是否立即发布
      isRecommend: false,
      definitData: '', // 定时发布时间

      // options
      labelList: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() <= Date.now()
        }
      },

      // dialog
      isShowImgPreview: false,
      image_preview: ''
    }
  },
  async created() {
    await this.getLabel()
    if (this.detail.active_id) {
      console.log('TCL: created -> this.detail', this.detail)
      this.formContentSetting.title = this.detail.title
      this.$nextTick(() => {
        this.formContentSetting.label = +this.detail.label_id
      })
      this.imageUrl_cover = this.detail.cover_pic
      this.imageUrl_long = this.detail.content_pic
      this.publicStauts = this.detail.state
      this.isRecommend = Boolean(this.detail.recommend)
      this.publicImme = this.detail.time === '立即发布' ? 1 : 0
      this.definitData = this.detail.time
    }
  },
  methods: {
    previewLong() {
      this.isShowImgPreview = true
      this.image_preview = base_url + this.imageUrl_long
    },
    previewCover() {
      this.isShowImgPreview = true
      this.image_preview = base_url + this.imageUrl_cover
    },
    saveToDraft() {
      // ..
    },
    longDelete() {
      this.imageUrl_long = ''
    },
    coverDelete() {
      this.imageUrl_cover = ''
    },
    save() {
      if (!this.imageUrl_cover || !this.imageUrl_long)
        return this.$alert('请上传图片！')
      this.$refs.formContentSetting.validate(valid => {
        let params = {
          title: this.formContentSetting.title,
          cover_pic: this.imageUrl_cover,
          content_pic: this.imageUrl_long,
          state: this.publicStauts,
          label_id: this.formContentSetting.label,
          recommend: +this.isRecommend
          // is_drafts: ,
        }
        if (!this.publicImme) {
          params.publish_time = moment(this.definitData).format(
            'YYYY-MM-DD HH:mm:ss'
          )
        }
        console.log(params)
        if (this.detail.active_id) {
          this.handleEdit(params)
        } else {
          this.handleAdd(params)
        }
      })
    },
    handleEdit(params) {
      params.active_id = this.detail.active_id
      this.$post('/content/active/update_goods', params)
      .then(res => {
        console.log('TCL: handleAdd -> res', res)
        this.$emit('hide-setting', {action: 'add'})
      })
      .catch(err => {
        this.$message({
          type: 'error',
          message: '获取错误！'
        })
      })
      
    },
    handleAdd(params) {
      this.$post('/content/active/add_goods', params)
      .then(res => {
        console.log('TCL: handleAdd -> res', res)
        this.$emit('hide-setting', {action: 'add'})
      })
      .catch(err => {
        this.$message({
          type: 'error',
          message: '获取错误！'
        })
      })
    },
    cancel() {
      this.$emit('hide-setting', {action: 'cancel'})
    },
    coverUploadSuccess(res) {
      console.log('111111111111');
      
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
    getLabel() {
      return this.$get('/content/active/get_label').then(res => {
        this.labelList = res.data
      })
    }
  }
}
</script>

<style lang='less' scoped>
.content-setting {
  .content-title {
    height: 63px;
    line-height: 63px;
    background-color: #f6f7f8;
    font-size: 20px;
    margin-top: 30px;
    padding: 0 20px;
  }
  .content-body__wrap,
  .content-footer__wrap,
  .content-save {
    background-color: #fff;
    padding: 50px 100px 50px 50px;
  }
  /deep/ .el-form-item__content {
    display: flex;
    width: 100%;
  }
  .content-body__item {
    display: flex;
    & > div {
      line-height: 40px;
    }
    .item__label {
      width: 150px;
    }
    .item__input {
      flex: 1;
      .el-select {
        width: 100%;
      }
    }
    .item__rule--upload,
    .item__rule {
      margin-left: 30px;
      color: #fe4a56;
    }
    .item__rule--upload {
      display: flex;
      align-items: flex-end;
      .upload-img__tool--preview {
        margin-left: 20px;
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
  .img-item {
    margin-bottom: 22px;
  }
  .content-footer__item {
    display: flex;
    line-height: 60px;
    .item__label {
      width: 150px;
    }
  }
  .content-save {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
  }
}
</style>

<style lang="less">
.content-footer__item {
  .el-radio {
    min-width: 150px;
  }
  .data-input {
    .el-input__inner {
      padding: 0 20px;
    }
    .el-input__prefix {
      right: 5px;
      left: unset;
    }
  }
}
</style>
