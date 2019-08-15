<template>
  <div class="spgl">
    <div class="spgl-item">
      <div class="spgl-item--title">商品信息</div>
      <div class="spgl-item--content">
        <form name="spxx" class="spgl-form">
          <div class="spgl-form-item">
            <label for="goodsTitle" class="spgl-form--label">
              <span>商品标题</span>
              <span>：</span>
            </label>
            <el-input
              class="spgl-form--input"
              v-model="formSpxx.goodsTitle"
              placeholder='输入标题...'
              name="goodsTitle">
            </el-input>
            <div class="spgl-form--rule">*必填项，30个字符以内</div>
          </div>
          <div class="spgl-form-item">
            <label for="typeEffect" class="spgl-form--label">
              <span>类型功效</span>
              <span>：</span>
            </label>
            <div class="spgl-form--input">
              <select-input
                :preset="preset_typeEffect"
                v-model="formSpxx.typeEffects"
              ></select-input>
            </div>
          </div>
          <div class="spgl-form-item">
            <label for="price" class="spgl-form--label">
              <span>价格</span>
              <span>：</span>
            </label>
            <el-input
              class="spgl-form--input"
              v-model="formSpxx.price"
              placeholder='输入金额...'
              name="price">
            </el-input>
            <div class="spgl-form--unit">（单位：元）</div>
            <div class="spgl-form--rule">*必填项</div>
          </div>
          <div class="spgl-form-item">
            <label for="num" class="spgl-form--label">
              <span>返利比例</span>
              <span>：</span>
            </label>
            <div class="spgl-form--input">
              <div class="spgl-form--num">
                <span>V1</span>
                <el-input
                  class="spgl-form--num__input"
                  v-model="formSpxx.v1"
                  name="num">
                </el-input>
              </div>
              <div class="spgl-form--num">
                <span>V2</span>
                <el-input
                  class="spgl-form--num__input"
                  v-model="formSpxx.v2"
                  name="num">
                </el-input>
              </div>
              <div class="spgl-form--num">
                <span>V3</span>
                <el-input
                  class="spgl-form--num__input"
                  v-model="formSpxx.v3"
                  name="num">
                </el-input>
              </div>
              <div class="spgl-form--num">
                <span>V4</span>
                <el-input
                  class="spgl-form--num__input"
                  v-model="formSpxx.v4"
                  name="num">
                </el-input>
              </div>
              <div class="spgl-form--num">
                <span>V5</span>
                <el-input
                  class="spgl-form--num__input"
                  v-model="formSpxx.v5"
                  name="num">
                </el-input>
              </div>
            </div>
            <div class="spgl-form--unit">（单位：%）</div>
          </div>
          <div class="spgl-form-item">
            <label for="date" class="spgl-form--label">
              <span>生产日期</span>
              <span>：</span>
            </label>
            <el-date-picker
              class="spgl-form--input data-input"
              v-model="formSpxx.date"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <div class="spgl-form--rule">*必填项</div>
          </div>
          <div class="spgl-form-item">
            <label for="origin" class="spgl-form--label">
              <span>产地</span>
              <span>：</span>
            </label>
            <el-input
              class="spgl-form--input"
              v-model="formSpxx.origin"
              placeholder='输入产地...'
              name="origin">
            </el-input>
            <div class="spgl-form--rule">*必填项</div>
          </div>
          <div class="spgl-form-item">
            <label for="typeEffect" class="spgl-form--label">
              <span>说明</span>
              <span>：</span>
            </label>
            <div class="spgl-form--input">
              <el-checkbox-group v-model="formSpxx.description">
              <el-checkbox label="药监认证"></el-checkbox>
              <el-checkbox label="假一赔十"></el-checkbox>
              <el-checkbox label="极速退款"></el-checkbox>
            </el-checkbox-group>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="spgl-item">
      <div class="spgl-item--title">显示设置</div>
      <div class="spgl-item--content">
        <form name="xssz" class="spgl-form">
          <div class="spgl-form-item">
            <label for="goodStauts" class="spgl-form--label">
              <span>商品状态</span>
              <span>：</span>
            </label>
            <el-radio-group class="spgl-form--content" v-model="formXssz.goodStauts">
              <el-radio :label="1">上线</el-radio>
              <el-radio :label="0">下架</el-radio>
            </el-radio-group>
          </div>
          <div class="spgl-form-item spgl-form__state">
            <label for="activeLabel" class="spgl-form--label">
              <span>活动标签</span>
              <span>：</span>
            </label>
            <el-select class="spgl-form--content" v-model="formXssz.activeLabel" filterable placeholder="请选择">
              <el-option
                v-for="(item, index) in currentTag"
                :key="index"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <el-button class="spgl-form--setLabel" size="small" @click="setLabel">设置标签</el-button>
          </div>
          <div class="spgl-form-item">
            <label class="spgl-form--label">
              <span>规格设置</span>
              <span>：</span>
            </label>
            <div class="spgl-form--content spgl-form--format">
              <el-input
                class="spgl-form--format__input"
                type="text"
                placeholder="输入关键字并回车..."
                v-model="formXssz.formatAdd">
              </el-input>
            </div>
            <div class="spgl-form--unit">（单位：g）</div>
          </div>
          <div class="spgl-form-item">
            <label class="spgl-form--label">
              <span>口味设置</span>
              <span>：</span>
            </label>
            <div class="spgl-form--content">
              <div class="spgl-form__taste" v-for="(item, i) in formXssz.taste" :key="item.taste">
                <div class="taste-box">
                  <div class="taste-box__text text-overflow"><span class="taste-box__text--span">{{item.taste}}</span></div>
                  <span class="avater-delete" @click="deleteTaste(i)">×</span>
                </div>
                <label class="taste__label">库存：</label>
                <el-input
                  class="spgl-form--format__input taste__input"
                  type="number"
                  placeholder="输入数量..."
                  v-model="item.stock">
                </el-input>
                <div class="spgl-form--unit taste--unit">（单位：件）</div>
              </div>
              <input
                class="el-input__inner"
                type='text'
                placeholder="输入口味并回车..."
                v-model="taste"
                @keyup.enter="addTaste"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="spgl-item">
      <div class="spgl-item--title">上传图片</div>
      <div class="spgl-item--content">
        <p class="spgl-item--content__sub">
          展示图片：
          <span>
            <span>*支持jpg/png格式，不超过10M</span>
            <el-button class="upload-img__tool--preview" size="small" @click="preview_exhibit">预览</el-button>
          </span>
        </p>
        <div class="upload-img__tool">
          <div class="img__list">
            <div class="img__list--wrap" v-for="(imgUrl, i) in imgListExhibit" :key="i">
              <img  class="img__list--item" :src="imgUrl">
              <span class="avater-delete" @click.stop="deleteExhibitImg(i)">×</span>
            </div>
            <img-upload size='10' class="spgl-item--content__img" v-show="imgListExhibit.length < 6" :is-show-img='false' @input="inputExhibit"></img-upload>
          </div>
        </div>
      </div>
      <div class="spgl-item--content">
        <p class="spgl-item--content__sub">
          商品详情长图：
          <span>
            <span>*支持jpg/png格式，不超过10M</span>
            <el-button class="upload-img__tool--preview" size="small" @click="preview_detail">预览</el-button>
          </span>
        </p>
        <div class="upload-img__tool">
          <div class="img__list">
            <div class="img__list--wrap" v-for="(imgUrl, i) in imgListDetail" :key="i">
              <img  class="img__list--item" :src="imgUrl">
              <span class="avater-delete" @click.stop="deleteDetailImg(i)">×</span>
            </div>
            <img-upload size='10' class="spgl-item--content__img" v-show="imgListDetail.length < 6" :is-show-img='false' @input="inputDetail"></img-upload>
          </div>
        </div>
      </div>
    </div>
    <div class="spgl-item">
      <div class="spgl-item--title">发布设置</div>
      <div class="spgl-item--content spgl-item__padding spgl-item--content__fusz">
        <form name="fbsz" class="spgl-form spgl-form__fusz">
          <el-checkbox class="spgl-item--content__setTime" v-model="isDefinitTime">定时发布：</el-checkbox>
          <div class="spgl-form--dateSelect">
            <el-date-picker
              class="spgl-form--input data-input"
              v-model="definitData"
              type="datetime"
              placeholder="选择发布时间">
            </el-date-picker>
          </div>
          <div class="spgl-form-item">
            <label class="spgl-form--label">
              <span>是否推荐</span>
              <span>：</span>
            </label>
            <div class="spgl-form--content spgl-form--recommend">
              <div class="spgl-form--recommend__group" v-for="(item, index) in recommends" :key="index">
                <el-checkbox :label="item.label" v-model="item.isSelect"></el-checkbox>
                <el-input
                  class="spgl-form--recommend__input"
                  type="number"
                  :disabled="!item.isSelect"
                  v-model="item.value">
                </el-input>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="spgl-item--space"></div>
      <div class="spgl-item--footer spgl-item__padding">
        <el-button size="mini" class="success-btn" @click="save">保存并发布</el-button>
        <el-button size="mini" class="cancel-btn" @click="cancel">取消</el-button>
      </div>
    </div>
    <el-dialog title="展示图片预览" :visible.sync="isShowImgPreview" width="600px">
      <el-carousel trigger="click" :autoplay='false' :arrow='imgListExhibit.length > 1 ? "always" : "never"' height="400px">
        <el-carousel-item v-for="(item, i) in imgListExhibit" :key="i">
          <img :src="item" style="width: 560px;">
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
    <el-dialog title="详情图片预览" :visible.sync="isShowImgDetail" width="600px">
      <el-carousel trigger="click" :autoplay='false' :arrow='imgListDetail.length > 1 ? "always" : "never"' height="700px">
        <el-carousel-item v-for="(item, i) in imgListDetail" :key="i">
          <img :src="item" style="width: 560px;">
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
    <el-dialog title="设置标签" :visible.sync="isShowTag" class="tag-dialog">
      <div class="current-tag">
        <div class="tag--title">当前标签</div>
        <div class="current-tag--content">
          <div class="current-tag__item" v-for="(item, i) in currentTag" :key="item.name">
            <span>{{item.name}}</span>
            <span class="avater-delete" @click="deleteTag(i)">×</span>
          </div>
        </div>
      </div>
      <div class="add-tag">
        <div class="tag--title">添加标签</div>
        <div class="add-tag--content">
          <input
            class="el-input__inner"
            type='text'
            placeholder="输入标签并回车..."
            v-model="newTag"
            @keyup.enter="addTag"
          />
        </div>
      </div>
      <div class="save-tag">
        <el-button size="mini" class="success-btn" @click="saveTag">保存</el-button>
        <el-button size="mini" class="cancel-btn" @click="cancelTag">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ImgUpload from './BasicComponents/ImgUpload'
  import SelectInput from './BasicComponents/SelectInput'
  import $ from 'jquery'
  export default {
    name: 'spgl',
    components: {
      'img-upload': ImgUpload,
      'select-input': SelectInput
    },
    data () {
      return {
        isShowImgPreview: false,
        isShowImgDetail: false,
        isShowTag: false,
        preset_typeEffect: [
          {name: '代餐', isSelect: false},
          {name: '塑形', isSelect: false},
          {name: '增肌', isSelect: false}
        ],
        formSpxx: {
          goodsTitle: '',
          typeEffects: ['美容'],
          stock: '',
          price: '',
          v1: '',
          v2: '',
          v3: '',
          v4: '',
          v5: '',
          data: '', // 生产日期
          origin: '', // 产地
          description: [] // 说明
        },
        taste: '', // 添加的口味
        formXssz: {
          goodStauts: '',
          activeLabel: '',
          taste: [
            {taste: '牛奶味', stock: ''},
            {taste: '草莓味', stock: ''}
          ]
        },
        imgListExhibit: [], // 展示图片
        imgListDetail: [], // 详情长图
        isDefinitTime: false, // 是否定时发布
        definitData: '',
        recommends: [
          {label: '首页推荐排序', isSelect: false, value: ''},
          {label: '购物车推荐排序', isSelect: false, value: ''}
        ],
        currentTag: [
          {name: '新品优惠'},
          {name: '节日促销'},
          {name: '新客专享'},
          {name: '周年大促'}
        ],
        newTag: ''
      }
    },
    watch: {
      'formSpxx.typeEffects' (n) {
        console.log(n)
      }
    },
    methods: {
      addTaste () {
        this.formXssz.taste.push({
          taste: this.taste,
          stock: ''
        })
        this.$nextTick(() => {
          this.taste = ''
          $('.spgl-form__taste:last .taste__input .el-input__inner').focus()
        })
      },
      deleteTaste (i) {
        this.formXssz.taste.splice(i, 1)
      },
      setLabel () {
        this.isShowTag = true
      },
      deleteTag (i) {
        this.currentTag.splice(i, 1)
      },
      addTag () {
        this.currentTag.push({
          name: this.newTag
        })
        this.$nextTick(() => {
          this.newTag = ''
        })
      },
      saveTag () {
        // ..
      },
      cancelTag () {
        // ..
      },
      save () {
        // ..
      },
      cancel () {
        // ..
      },
      uploadImg () {
        // ..
      },
      inputExhibit (val) {
        this.imgListExhibit.push(val)
      },
      deleteExhibitImg (i) {
        this.imgListExhibit.splice(i, 1)
      },
      inputDetail (val) {
        this.imgListDetail.push(val)
      },
      deleteDetailImg (i) {
        this.imgListDetail.splice(i, 1)
      },
      preview_exhibit () {
        this.isShowImgPreview = true
      },
      preview_detail () {
        this.isShowImgDetail = true
      }
    }
  }
</script>

<style lang='less' scoped>
  .spgl {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 37px 18px;
    .spgl-item {
      .spgl-item__padding {
        padding-right: 5%;
        padding-left: 5%;
      }
    }
    .spgl-item--content {
      padding: 0 30px;
      margin-top: 16px;
      margin-bottom: 30px;
      .upload-img__tool {
        .img__list {
          display: flex;
          flex-wrap: wrap;
        }
        .img__list--wrap {
          position: relative;
          margin-right: 40px;
          margin-bottom: 30px;
        }
        .img__list--item {
          display: inline-block;
          width: 180px;
          height: 150px;
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
        }
      }
    }
    .spgl-item--footer {
      position: absolute;
      right: 0;
      bottom: 0;
      padding-top: 30px;
      padding-bottom: 30px;
    }
    .spgl-item--space {
      height: calc(~'50%' - 207px);
      background: #e9eef3;
    }
    .spgl-item--content__fusz {
      height: 50%;
    }
    .spgl-form {
      .spgl-form-item {
        display: flex;
        margin-bottom: 24px;
      }
      .spgl-form--label {
        display: inline-block;
        float: left;
        height: 40px;
        line-height: 40px;
        min-width: 75px;
        margin-right: 10px;
        span {
          display: inline-block;
          &:first-of-type {
            width: 60px;
            font-size: 15px;
            text-align-last: justify;
          }
        }
      }
      .spgl-form--input {
        display: flex;
        justify-content: space-between;
        width: 53%;
      }
      .spgl-form--checkbox {
        display: inline-block;
      }
      .spgl-form--dateSelect {
        & > div {
          width: 100%;
          &:first-of-type {
            margin-bottom: 20px
          }
        }
      }
      .spgl-form--unit {
        display: inline-block;
        line-height: 40px;
        margin-left: 12px;
      }
      .spgl-form--rule {
        display: inline-block;
        line-height: 40px;
        margin-left: 12px;
        font-size: 13px;
        color: #fe4a56;
      }
      .spgl-form--num {
        display: inline-block;
        span {
          margin-right: 4px;
        }
        .spgl-form--num__input {
          width: 35px;
          .el-input__inner {
            padding: 0 5px;
          }
        }
      }
      .spgl-form--setLabel {
        margin-left: 12px;
      }
      .spgl-form--content {
        display: inline-block;
        width: 46%;
        .el-radio {
          height: 40px;
          line-height: 40px;
        }
      }
      .spgl-form--recommend {
        width: 50%;
        .el-checkbox {
          margin-right: unset;
        }
        .spgl-form--recommend__group {
          display: flex;
          justify-content: space-between;
          align-items: center;
          &:first-of-type {
            margin-bottom: 10px;
          }
        }
        .spgl-form--recommend__input {
          margin-left: 10px;
          width: 50px;
        }
      }
      .spgl-form--format {
        .spgl-form--format__label {
          margin-bottom: 10px;
          .el-button--small {
            padding: 9px 20px;
          }
          margin-right: 20px;
        }
      }
      .spgl-form__state {
        .el-select {
          width: 46%;
        }
      }
      .spgl-form__taste {
        display: flex;
        align-items: center;
        position: relative;
        margin-bottom: 20px;
        .taste-box {
          width: 90px;
          line-height: 30px;
          height: 30px;
          margin-right: 15px;
          text-align: center;
          position: relative;
          border: 1px solid #363f51;
          border-radius: 3px;
          .taste-box__text {
            width: 90px;
            padding: 0 10px;
            .taste-box__text--span {
              white-space: nowrap;
            }
          }
        }
        .taste__label {
          white-space: nowrap;
        }
        .taste__input {
          width: 100px;
        }
        .taste--unit {
          position: absolute;
          right: -106px;
        }
      }
    }
    .spgl-item--content__sub {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      margin-top: unset;
      span {
        color: #fe4a56;
        & > span {
          margin-right: 10px;
        }
      }
    }
    .spgl-item--content__setTime {
      margin-bottom: 20px;
    }
    .spgl-item--content__img {
      display: inline-block;
      width: 180px;
      height: 150px;
      margin-bottom: 30px;
    }
  }
</style>

<style lang="less">
  .spgl-form--checkbox {
    .el-checkbox {
      margin-right: 10px;
      line-height: 40px;
    }
    .el-checkbox__label {
      padding-left: 5px;
    }
  }
  .spgl-form-item {
    .el-input__inner {
      padding: 0 6px;
    }
  }
  .spgl-form__state {
    .spgl-form--setLabel {
      color: #ff4b57
    }
  }
  .spgl-form--input {
    .el-checkbox-group {
      margin-right: -30px;
      .el-checkbox {
        line-height: 40px;
      }
    }
  }
  .data-input {
    .el-input__inner {
      padding-right: 25px;
    }
    .el-input__prefix {
      right: 5px;
      left: unset;
    }
  }
  .tag-dialog {
    padding: 30px;
    .el-dialog__header,
    .el-dialog__body {
      padding-left: 50px;
      padding-right: 50px;
    }
    .tag--title {
      font-size: 16px;
      margin-bottom: 15px;
    }
    .save-tag {
      display: flex;
      justify-content: center;
    }
    .add-tag {
      margin-bottom: 15px;
    }
  }
  .current-tag {
    .current-tag--content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 30px;
    }
    .current-tag__item {
      height: 30px;
      line-height: 30px;
      margin-bottom: 30px;
      position: relative;
      text-align: center;
      border: 1px solid;
    }
  }
</style>
