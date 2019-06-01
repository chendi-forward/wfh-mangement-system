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
              <el-checkbox-group class="spgl-form--checkbox" v-model="formSpxx.typeEffect">
                <el-checkbox label="代餐" name="typeEffect"></el-checkbox>
                <el-checkbox label="塑性" name="typeEffect"></el-checkbox>
                <el-checkbox label="增肌" name="typeEffect"></el-checkbox>
              </el-checkbox-group>
              <el-input
                class="spgl-form--input__type"
                v-model="formSpxx.typeEffectAdd"
                placeholder='输入关键词并回车...'
                name="typeEffect">
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
            <el-radio-group v-model="formXssz.goodStauts">
              <el-radio :label="1">上线</el-radio>
              <el-radio :label="0">下架</el-radio>
            </el-radio-group>
          </div>
          <div class="spgl-form-item">
            <label for="activeBrand" class="spgl-form--label">
              <span>商品状态</span>
              <span>：</span>
            </label>
            <el-select v-model="formXssz.activeBrand" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </form>
      </div>
    </div>
    <div class="spgl-item">
      <div class="spgl-item--title">上传图片</div>
      <div class="spgl-item--content"></div>
    </div>
    <div class="spgl-item">
      <div class="spgl-item--title">发布设置</div>
      <div class="spgl-item--content"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'spgl',
    data () {
      return {
        activeBrandList: [],
        formSpxx: {
          goodsTitle: '',
          typeEffect: '',
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
          activeBrand: ''
        }
      }
    }
  }
</script>

<style lang='less' scoped>
  .spgl {
    display: grid;
    grid-template-columns: 7fr 4fr;
    grid-template-rows: 553px 553px;
    grid-gap: 37px 18px;
    .spgl-item {
      background-color: #fff;
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
    .spgl-form {
      .spgl-form-item {
        margin-bottom: 24px;
      }
      .spgl-form--label {
        display: inline-block;
        min-width: 75px;
        margin-right: 16px;
        span {
          display: inline-block;
          &:first-of-type {
            width: 60px;
            font-size: 15px;
            text-align-last: justify;
          }
        }
      }
      .content-label {
        transform: translateY(-54px);
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
  .spgl-form--num {
    .spgl-form--num__input {
      .el-input__inner {
        padding: 0 3px;
      }
    }
  }
</style>
