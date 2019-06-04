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
              <el-checkbox-group class="spgl-form--checkbox" v-model="formSpxx.typeEffects">
                <el-checkbox label="代餐"></el-checkbox>
                <el-checkbox label="塑性"></el-checkbox>
                <el-checkbox label="增肌"></el-checkbox>
              </el-checkbox-group>
              <el-input
                class="spgl-form--input__type"
                v-model="formSpxx.typeEffectAdd"
                placeholder='输入关键词并回车...'>
              </el-input>
            </div>
          </div>
          <div class="spgl-form-item">
            <label for="stock" class="spgl-form--label">
              <span>库存数量</span>
              <span>：</span>
            </label>
            <el-input
              class="spgl-form--input"
              v-model="formSpxx.stock"
              placeholder='输入数量...'
              name="stock">
            </el-input>
            <div class="spgl-form--unit">（单位：件）</div>
            <div class="spgl-form--rule">*必填项</div>
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
            <label for="content" class="spgl-form--label content-label">
              <span>内容简介</span>
              <span>：</span>
            </label>
            <el-input
              class="spgl-form--input"
              v-model="formSpxx.content"
              type="textarea"
              :rows="3"
              placeholder='输入内容...'
              name="content">
            </el-input>
            <div class="spgl-form--rule">*必填项，0-30个字</div>
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
            <el-select class="spgl-form--content" v-model="formXssz.activeLabel" filterable allow-create placeholder="请选择">
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button class="spgl-form--setLabel" size="small" @click="setLabel">设置标签</el-button>
          </div>
          <div class="spgl-form-item">
            <label class="spgl-form--label">
              <span>是否推荐</span>
              <span>：</span>
            </label>
            <div class="spgl-form--content spgl-form--recommend">
              <div class="spgl-form--recommend__group" v-for="(item, index) in formXssz.recommends" :key="index">
                <el-checkbox :label="item.label" v-model="item.isSelect"></el-checkbox>
                <el-input
                  class="spgl-form--recommend__input"
                  type="number"
                  v-model="item.value">
                </el-input>
              </div>
            </div>
          </div>
          <div class="spgl-form-item">
            <label class="spgl-form--label">
              <span>规格设置</span>
              <span>：</span>
            </label>
            <div class="spgl-form--content spgl-form--format">
              <el-badge v-for="(item, index) in formXssz.formats" :key="index" value="×" class="spgl-form--format__label">
                <el-button size="small">{{item}}</el-button>
              </el-badge>
              <el-input
                class="spgl-form--format__input"
                type="text"
                placeholder="输入关键字并回车..."
                v-model="formXssz.formatAdd">
              </el-input>
            </div>
            <div class="spgl-form--rule">*必填项</div>
          </div>
          <div class="spgl-form-item">
            <label class="spgl-form--label">
              <span>口味设置</span>
              <span>：</span>
            </label>
            <div class="spgl-form--content spgl-form--taste">
              <el-input
                class="spgl-form--taste__input"
                type="text"
                placeholder="输入关键字并回车..."
                v-model="formXssz.taste">
              </el-input>
            </div>
            <div class="spgl-form--rule">*必填项</div>
          </div>
        </form>
      </div>
    </div>
    <div class="spgl-item">
      <div class="spgl-item--title">上传图片</div>
      <div class="spgl-item--content">
        <p class="spgl-item--content__sub">展示图片：<span>*支持jpg/png格式，不超过10M</span></p>
        <img-upload @upload-img='uploadImg'></img-upload>
      </div>
      <div class="spgl-item--content">
        <p class="spgl-item--content__sub">商品详情长图：<span>*支持jpg/png格式，不超过10M</span></p>
        <img-upload @upload-img='uploadImg'></img-upload>
      </div>
    </div>
    <div class="spgl-item">
      <div class="spgl-item--title">发布设置</div>
      <div class="spgl-item--content spgl-item__padding spgl-item--content__fusz">
        <form name="fbsz" class="spgl-form spgl-form__fusz">
          <el-checkbox class="spgl-item--content__sub" v-model="isDefinitTime">定时发布：</el-checkbox>
          <div class="spgl-form--dateSelect">
            <el-date-picker
              v-model="definitData"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <el-time-picker
              v-model="definitTime"
              placeholder="选择时间">
            </el-time-picker>
          </div>
        </form>
      </div>
      <div class="spgl-item--space"></div>
      <div class="spgl-item--footer spgl-item__padding">
        <el-button size="mini" class="success-btn" @click="save">保存并发布</el-button>
        <el-button size="mini" class="cancel-btn" @click="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import ImgUpload from './BasicComponents/ImgUpload_1'
  export default {
    name: 'spgl',
    components: {
      'img-upload': ImgUpload
    },
    data () {
      return {
        activeLabelList: [],
        formSpxx: {
          goodsTitle: '',
          typeEffects: [],
          typeEffectAdd: '',
          stock: '',
          price: '',
          v1: '',
          v2: '',
          v3: '',
          v4: '',
          v5: '',
          content: ''
        },
        formXssz: {
          goodStauts: '',
          activeLabel: '',
          recommends: [
            {label: '热门推荐排序', isSelect: false, value: ''},
            {label: '购物车推荐排序', isSelect: false, value: ''}
          ],
          formats: ['500g', '1kg'],
          formatsAdd: '',
          taste: ''
        },
        options: [{
          value: '新品优惠',
          label: '新品优惠'
        }, {
          value: '限时折扣',
          label: '限时折扣'
        }],
        isSetLabel: false,
        isDefinitTime: false, // 是否定时发布
        definitData: '',
        definitTime: '',
      }
    },
    methods: {
      setLabel () {
        // this.isSetLabel = true
      },
      save () {
        // ..
      },
      cancel () {
        // ..
      },
      uploadImg () {
        // ..
      }      
    }
  }
</script>

<style lang='less' scoped>
  .spgl {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-template-rows: 553px 553px;
    grid-gap: 37px 18px;
    .spgl-item {
      background-color: #fff;
      position: relative;
      .spgl-item__padding {
        padding-right: 30px;
        padding-left: 30px;
      }
    }
    .spgl-item--title {
      height: 63px;
      line-height: 63px;
      margin-bottom: 51px;
      border-radius: 4px 4px 0 0;
      padding: 0 21px;
      background-color: #F7F8F9;
      font-size: 18px;
    }
    .spgl-item--content {
      padding: 0 0 0 30px;
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
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        width: 53%;
      }
      .spgl-form--checkbox {
        display: inline-block;
        width: 470px;
      }
      .spgl-form--dateSelect {
        & > div {
          width: 100%;
          &:first-of-type {
            margin-bottom: 20px
          }
        }
      }
      .spgl-form--input__type {
        // width: 50%;
      }
      .spgl-form--unit {
        display: inline-block;
        margin-left: 12px;
      }
      .spgl-form--rule {
        display: inline-block;
        margin-left: 12px;
        font-size: 13px;
        color: #fe4a56;
      }
      .spgl-form--num {
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
        height: 40px;
        line-height: 40px;
        display: inline-block;
        width: 46%;
        .el-radio {
          height: 40px;
          line-height: 40px;
        }
      }
      .spgl-form--recommend {
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
    }
    .spgl-item--content__sub {
      margin-bottom: 20px;
      span {
        color: #fe4a56;
      }
    }
  }
</style>

<style lang="less">
  .spgl-form--checkbox {
    .el-checkbox {
      margin-right: 10px;
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
</style>
