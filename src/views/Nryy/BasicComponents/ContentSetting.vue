<template>
  <div class="content-setting">
    <div class="content-body">
      <div class="content-title">
        内容设置
      </div>
      <div class="content-body__wrap">
        <div class="content-body__item">
          <div class="item__label">文章标题：</div>
          <div class="item__input">
            <el-input
              placeholder="输入标题..."
              v-model="title"
            ></el-input>
          </div>
          <div class="item__rule">
            *必填项，30个字符以内
          </div>
        </div>
        <div class="content-body__item">
          <div class="item__label">标签类别：</div>
          <div class="item__input">
            <el-input
              placeholder="输入标签..."
              v-model="label"
            ></el-input>
          </div>
          <div class="item__rule">
            *必填项，8 个字符以内
          </div>
        </div>
        <div class="content-body__item">
          <div class="item__label">上传封面：</div>
          <div class="item__input">
            <img-upload v-model="imageUrl_cover" class="upload-img--cover" tip='封面'></img-upload>
          </div>
          <div class="item__rule item__rule--upload">
            <span>
              *持jpg/png格式 ，尺寸750 : 360 px，不超过5M
            </span>
            <el-button class="upload-img__tool--preview" size="small" @click="previewCover">预览</el-button>
          </div>
        </div>
        <div class="content-body__item">
          <div class="item__label">上传长图：</div>
          <div class="item__input">
            <img-upload class="upload-img--long" v-model="imageUrl_long" tip='长图'></img-upload>
          </div>
          <div class="item__rule item__rule--upload">
            <span>
              *支持jpg/png格式，不超过5M
            </span>
            <el-button class="upload-img__tool--preview" size="small" @click="previewCover">预览</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="content-footer">
      <div class="content-title">发布设置</div>
      <div class="content-footer__wrap">
        <div class="content-footer__item">
          <div class="item__label">发布状态：</div>
          <div>
            <el-radio-group class="spgl-form--content" v-model="publicStauts">
              <el-radio :label="1">显示</el-radio>
              <el-radio :label="0">隐藏</el-radio>
            </el-radio-group>
          </div>
          <el-checkbox v-model="isRecommend">并推荐到首页</el-checkbox>
        </div>
        <div class="content-footer__item">
          <div class="item__label">发布时间：</div>
          <div>
            <el-radio-group class="spgl-form--content" v-model="publicTime">
              <el-radio :label="1">立即发布</el-radio>
              <el-radio :label="0">定时发布</el-radio>
            </el-radio-group>
          </div>
          <el-date-picker
              class="spgl-form--input data-input"
              v-model="definitData"
              type="datetime"
              placeholder="选择发布时间">
            </el-date-picker>
        </div>
      </div>
    </div>
    <div class="content-save">
      <el-button size="mini" class="cancel-btn" @click="save">存为草稿</el-button>
      <el-button size="mini" class="success-btn" @click="saveToDraft">保存</el-button>
      <el-button size="mini" class="cancel-btn" @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
  // import * as commonsConfig from 'COMMONS/commonsConfig.js'
  import ImgUpload from './ImgUpload'
  export default {
    name: 'content-setting',
    components: {
      'img-upload': ImgUpload
    },
    props: {
    },
    data () {
      return {
        title: '',
        label: '',
        imageUrl_cover: '',
        imageUrl_long: '',
        publicStauts: 1,
        publicTime: 1,
        isRecommend: false,
        definitData: ''
      }
    },
    methods: {
      previewCover () {
        // ..
      },
      saveToDraft () {
        // ..
      },
      save () {
        // ..
      },
      cancel () {
        // ..
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
    .content-body__item {
      display: flex;
      margin-bottom: 50px;
      & > div {
        line-height: 40px;
      }
      .item__label {
        width: 150px;
      }
      .item__input {
        flex: 1;
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
