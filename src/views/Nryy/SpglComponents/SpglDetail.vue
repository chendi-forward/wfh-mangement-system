<template>
  <div class="spgl-detail">
    <div class="spgl-item">
      <div class="spgl-item--title">商品信息</div>
      <div class="spgl-item--content">
        <el-form name="spxx" ref="spxxForm" :model='formSpxx' class="spgl-form">
          <el-form-item prop="goodsTitle" :rules="rules.title">
            <label for="typeEffect" class="spgl-form--label required">
              <span>商品标题</span>
              <span>：</span>
            </label>
            <el-input class="spgl-form--input" v-model="formSpxx.goodsTitle" placeholder='输入标题...' name="goodsTitle">
            </el-input>
          </el-form-item>
          <el-form-item class="spgl-form-item" prop="typeEffects">
            <label for="typeEffect" class="spgl-form--label">
              <span>类型功效</span>
              <span>：</span>
            </label>
            <div class="spgl-form--input">
              <select-input v-model="formSpxx.typeEffects"></select-input>
            </div>
          </el-form-item>
          <el-form-item prop="price" :rules="rules.required">
            <label for="price" class="spgl-form--label required">
              <span>价格</span>
              <span>：</span>
            </label>
            <el-input class="spgl-form--input" v-model="formSpxx.price" placeholder='输入金额...' name="price">
            </el-input>
            <div class="spgl-form--unit">（单位：元）</div>
          </el-form-item>
          <el-form-item class="spgl-form-item">
            <label for="num" class="spgl-form--label">
              <span>返利比例</span>
              <span>：</span>
            </label>
            <div class="spgl-form--input">
              <div class="spgl-form--num">
                <span>V1</span>
                <el-form-item prop="v1" :rules="rules.vInput">
                  <el-input class="spgl-form--num__input" v-model.number="formSpxx.v1" name="num">
                  </el-input>
                </el-form-item>
              </div>
              <div class="spgl-form--num">
                <span>V2</span>
                <el-form-item prop="v2" :rules="rules.vInput">
                  <el-input class="spgl-form--num__input" v-model.number="formSpxx.v2" name="num">
                  </el-input>
                </el-form-item>
              </div>
              <div class="spgl-form--num">
                <span>V3</span>
                <el-form-item prop="v3" :rules="rules.vInput">
                  <el-input class="spgl-form--num__input" v-model.number="formSpxx.v3" name="num">
                  </el-input>
                </el-form-item>
              </div>
              <div class="spgl-form--num">
                <span>V4</span>
                <el-form-item prop="v4" :rules="rules.vInput">
                  <el-input class="spgl-form--num__input" v-model.number="formSpxx.v4" name="num">
                  </el-input>
                </el-form-item>
              </div>
              <div class="spgl-form--num">
                <span>V5</span>
                <el-form-item prop="v5" :rules="rules.vInput">
                  <el-input class="spgl-form--num__input" v-model.number="formSpxx.v5" name="num">
                  </el-input>
                </el-form-item>
              </div>
            </div>
            <div class="spgl-form--unit">（单位：%）</div>
          </el-form-item>
          <el-form-item prop="date" :rules="rules.required">
            <label for="date" class="spgl-form--label required">
              <span>生产日期</span>
              <span>：</span>
            </label>
            <el-date-picker class="spgl-form--input data-input" v-model="formSpxx.date" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="origin" :rules="rules.required">
            <label for="origin" class="spgl-form--label required">
              <span>产地</span>
              <span>：</span>
            </label>
            <el-input class="spgl-form--input" v-model="formSpxx.origin" placeholder='输入产地...' name="origin">
            </el-input>
          </el-form-item>
          <el-form-item class="spgl-form-item" prop="typeEffects">
            <label for="typeEffect" class="spgl-form--label">
              <span>说明</span>
              <span>：</span>
            </label>
            <div class="spgl-form--input">
              <select-input v-model="formSpxx.description"></select-input>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="spgl-item">
      <div class="spgl-item--title">显示设置</div>
      <div class="spgl-item--content">
        <el-form name="xssz" ref="xsszForm" :model="formXssz" class="spgl-form">
          <el-form-item prop="goodStauts" :rules="rules.required">
            <label for="goodStauts" class="spgl-form--label required">
              <span>商品状态</span>
              <span>：</span>
            </label>
            <el-radio-group class="spgl-form--content" v-model="formXssz.goodStauts">
              <el-radio :label="1">上架</el-radio>
              <el-radio :label="0">下架</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="activeLabel" :rules="rules.required" class="spgl-form-item spgl-form__state">
            <label for="activeLabel" class="spgl-form--label required">
              <span>活动标签</span>
              <span>：</span>
            </label>
            <el-select class="spgl-form--content" v-model="formXssz.activeLabel" filterable placeholder="请选择">
              <el-option v-for="(item, index) in currentTag" :key="index" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
            <el-button class="spgl-form--setLabel" size="small" @click="setLabel">设置标签</el-button>
          </el-form-item>
          <el-form-item prop="formatAdd" :rules="rules.required">
            <label class="spgl-form--label required">
              <span>规格设置</span>
              <span>：</span>
            </label>
            <div class="spgl-form--content spgl-form--format">
              <el-input class="spgl-form--format__input" type="text" placeholder="输入关键字..." v-model="formXssz.formatAdd">
              </el-input>
            </div>
            <div class="spgl-form--unit">（单位：g）</div>
          </el-form-item>
          <div class="spgl-form-item">
            <label class="spgl-form--label required">
              <span>口味设置</span>
              <span>：</span>
            </label>
            <div class="spgl-form--content">
              <div class="spgl-form__taste" v-for="(item, i) in formXssz.taste" :key="item.taste">
                <div class="taste-box">
                  <div class="taste-box__text text-overflow"><span class="taste-box__text--span">{{item.taste}}</span></div>
                  <span class="avater-delete" @click="deleteTaste(i)">×</span>
                </div>
                <label class="taste__label">库存（件）：</label>
                <el-form-item :prop="'taste.' + i + '.stock'" :rules="rules.required">
                  <el-input class="spgl-form--format__input taste__input" type="number" placeholder="输入数量..." v-model="item.stock">
                  </el-input>
                </el-form-item>
              </div>
              <input class="el-input__inner" style="font-size: 14px;" type='text' placeholder="输入口味并回车..." v-model="taste" @keyup.enter="addTaste" @blur="addTaste" />
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="spgl-item">
      <div class="spgl-item--title">上传图片</div>
      <div class="spgl-item--content">
        <p class="spgl-item--content__sub required">
          展示图片：
          <span>
            <span>*支持jpg/png格式，不超过10M</span>
            <el-button class="upload-img__tool--preview" size="small" @click="preview_exhibit">预览</el-button>
          </span>
        </p>
        <div class="upload-img__tool">
          <div class="img__list">
            <div class="img__list--wrap" v-for="(imgUrl, i) in imgListExhibit" :key="i">
              <img class="img__list--item" :src="base_url + imgUrl">
              <span class="avater-delete" @click.stop="deleteExhibitImg(i)">×</span>
            </div>
            <img-upload size='10' class="spgl-item--content__img" v-show="imgListExhibit.length < 6" :is-show-img='false' key-name="goods" @upload-success='exhibitUploadSuccess' @upload-error='exhibitUploadError'>
            </img-upload>
          </div>
        </div>
      </div>
      <div class="spgl-item--content">
        <p class="spgl-item--content__sub required">
          商品详情长图：
          <span>
            <span>*支持jpg/png格式，不超过10M</span>
            <el-button class="upload-img__tool--preview" size="small" @click="preview_detail">预览</el-button>
          </span>
        </p>
        <div class="upload-img__tool">
          <div class="img__list">
            <div class="img__list--wrap" v-for="(imgUrl, i) in imgListDetail" :key="i">
              <img class="img__list--item" :src="base_url + imgUrl">
              <span class="avater-delete" @click.stop="deleteDetailImg(i)">×</span>
            </div>
            <img-upload size='10' class="spgl-item--content__img" v-show="imgListDetail.length < 6" :is-show-img='false' key-name="goods" @upload-success='detailUploadSuccess' @upload-error='detailUploadError'>
            </img-upload>
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
            <el-date-picker :disabled="!isDefinitTime" class="spgl-form--input data-input" v-model="definitData" type="datetime" :picker-options="pickerOptions" placeholder="选择发布时间">
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
                <el-input class="spgl-form--recommend__input" type="number" :disabled="!item.isSelect" v-model="item.value">
                </el-input>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="spgl-item--space"></div>
      <div class="spgl-item--footer spgl-item__padding">
        <el-button size="small" type="success" @click="save">保存并发布</el-button>
        <el-button size="small" class="cancel-btn" @click="cancel">返回</el-button>
      </div>
    </div>

    <el-dialog title="展示图片预览" :visible.sync="isShowImgPreview" width="600px">
      <el-carousel trigger="click" :autoplay='false' :arrow='imgListExhibit.length > 1 ? "always" : "never"' height="400px">
        <el-carousel-item v-for="(item, i) in imgListExhibit" :key="i">
          <img :src="base_url + item" style="width: 560px;">
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
    <el-dialog title="详情图片预览" :visible.sync="isShowImgDetail" width="600px">
      <el-carousel trigger="click" :autoplay='false' :arrow='imgListDetail.length > 1 ? "always" : "never"' height="700px">
        <el-carousel-item v-for="(item, i) in imgListDetail" :key="i">
          <img :src="base_url + item" style="width: 560px;">
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
    <dialog-com v-model="isShowTag" title="设置标签" :is-show-footer='false' class="tag-dialog">
      <div class="current-tag">
        <div class="tag--title">当前标签</div>
        <div class="current-tag--content">
          <div class="current-tag__item" v-for="(item, i) in currentTag" :key="item.value">
            <span>{{item.name}}</span>
            <span class="avater-delete" @click="deleteTag(i)">×</span>
          </div>
        </div>
      </div>
      <div class="add-tag">
        <div class="tag--title">添加标签</div>
        <el-form :model='formTag' ref='formTag' class="add-tag--content">
          <el-form-item prop="newTag" :rules="rules.length10">
            <el-input type="text" size="small" placeholder="输入标签..." v-model="formTag.newTag"></el-input>
            <el-button size="small" type="success" @click="saveTag">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </dialog-com>
  </div>
</template>

<script>
import $ from 'jquery'

import ImgUpload from '../BasicComponents/ImgUpload'
import SelectInput from '../BasicComponents/SelectInput'
import DialogCom from 'COMPONENTS/DialogCom'
import * as commonsConfig from 'COMMONS/commonsConfig.js'
import moment, { now } from 'moment'
let base_url = commonsConfig.BASE_URL

export default {
  name: 'spgl-detail',
  components: {
    'img-upload': ImgUpload,
    'select-input': SelectInput,
    'dialog-com': DialogCom
  },
  props: {
    current: Object
  },
  data() {
    let validateTitle = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入商品标题'))
      } else if (value.length > 30) {
        callback(new Error('30个字符以内！'))
      } else {
        callback()
      }
    }
    let validateMenoy = (rule, value, callback) => {
      let regx = /^0\.\d+$|^[1-9]+(\.\d+)?$/
      if (value === '') {
        callback(new Error('该项不能为空！'))
      } else if (regx.test(+value)) {
        callback(new Error('请输入正数！'))
      } else {
        callback()
      }
    }
    let validateV = (rule, value, callback) => {
      if (value > 100) {
        callback(new Error('范围1-100'))
      } else {
        callback()
      }
    }
    return {
      base_url: base_url,
      isShowImgPreview: false,
      isShowImgDetail: false,
      isShowTag: false,
      rules: {
        required: [{ required: true, message: '该项为必填项' }],
        title: [{ validator: validateTitle, trigger: 'blur' }],
        length10: [{ max: 10, message: '长度不超过10个字符', trigger: 'blur' }],
        vInput: [{ validator: validateV, trigger: 'blur' }]
      },
      formSpxx: {
        goodsTitle: '',
        typeEffects: [
          { name: '代餐', isSelect: false },
          { name: '塑形', isSelect: false },
          { name: '增肌', isSelect: false }
        ],
        price: '',
        v1: '',
        v2: '',
        v3: '',
        v4: '',
        v5: '',
        date: '', // 生产日期
        origin: '', // 产地
        description: [
          { name: '药监认证', isSelect: false },
          { name: '假一赔十', isSelect: false },
          { name: '极速退款', isSelect: false }
        ] // 说明
      },
      formXssz: {
        goodStauts: '',
        activeLabel: '',
        formatAdd: '',
        taste: []
      },
      taste: '', // 添加的口味
      imgListExhibit: [], // 展示图片
      imgListDetail: [], // 详情长图
      isDefinitTime: false, // 是否定时发布
      definitData: '',
      recommends: [
        { label: '首页推荐排序', isSelect: false, value: '' },
        { label: '购物车推荐排序', isSelect: false, value: '' }
      ],
      selectTag: '',
      currentTag: [],
      formTag: {
        newTag: ''
      },
      // date
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() <= Date.now()
        }
      }
    }
  },
  async mounted() {
    await this.getLabel()
    if (Object.keys(this.current).length) {
      await this.$get(`/content/goods/goods_detail?goods_id=${this.current.id}`).then(res => {
        let data = res.data
        this.formSpxx.typeEffects = data.efficacy.split(',').map(item => {
          return {
            name: item,
            isSelect: true
          }
        })
        this.formSpxx.goodsTitle = data.title
        this.formSpxx.price = data.price / 100
        this.formSpxx.v1 = data.rebate['1']
        this.formSpxx.v2 = data.rebate['2']
        this.formSpxx.v3 = data.rebate['3']
        this.formSpxx.v4 = data.rebate['4']
        this.formSpxx.v5 = data.rebate['5']
        this.formSpxx.date = data.date || new Date()
        this.formSpxx.origin = data.origin
        this.formSpxx.description = data.description.split(',').map(item => {
          return {
            name: item,
            isSelect: true
          }
        })
        this.formXssz.goodStauts = data.state
        this.formXssz.activeLabel = +data.label_id
        this.formXssz.formatAdd = parseInt(data.weight)
        this.formXssz.taste = data.specification
        this.imgListExhibit = data.show_pic // 展示图片
        this.imgListDetail = data.detail_pic // 展示图片
        this.isDefinitTime = moment(data.publish_time) > new Date()
        if (data.publish_time) {
          this.definitData = new Date(data.publish_time)
        }
        if (data.cart_order) {
          this.recommends[1].isSelect = true
          this.recommends[1].value = data.cart_order
        }
        if (data.mind_order) {
          this.recommends[0].isSelect = true
          this.recommends[0].value = data.mind_order
        }
      })
    }
  },
  methods: {
    addTaste() {
      this.formXssz.taste.push({
        taste: this.taste,
        stock: ''
      })
      this.$nextTick(() => {
        this.taste = ''
        $('.spgl-form__taste:last .taste__input .el-input__inner').focus()
      })
    },
    deleteTaste(i) {
      this.formXssz.taste.splice(i, 1)
    },
    getLabel() {
      return this.$get('/content/active/get_label').then(res => {
        if (res.message === 'ok') {
          this.currentTag = res.data.map(item => {
            return {
              name: item.label,
              value: item.value
            }
          })
        }
      })
    },
    setLabel() {
      this.isShowTag = true
      this.getLabel()
    },
    deleteTag(i) {
      let id = this.currentTag[i].value
      this.$get(`/content/active/setting_label?behavior=del&id=${id}`).then(res => {
        if (res.message === 'ok') {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getLabel()
        }
      })
    },
    saveTag() {
      this.$refs.formTag.validate(valid => {
        if (valid) {
          let currentTag = this.currentTag.map(item => item.name)
          if (currentTag.includes(this.formTag.newTag)) {
            this.$message({
              type: 'error',
              message: '标签已存在!'
            })
            return
          }
          this.$get(`/content/active/setting_label?behavior=add&label=${this.formTag.newTag}`).then(res => {
            if (res.message === 'ok') {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.getLabel()
              this.$nextTick(() => {
                this.formTag.newTag = ''
              })
            }
          })
        } else {
          return false
        }
      })
    },
    // 上传展示图
    exhibitUploadSuccess(res) {
      if (res.message === 'ok') {
        this.imgListExhibit.push(res.path)
      }
    },
    exhibitUploadError(res) {
      // console.log('TCL: exhibitUploadError -> res', res)
    },
    deleteExhibitImg(i) {
      this.imgListExhibit.splice(i, 1)
    },
    // 上传长图
    detailUploadSuccess(res) {
      if (res.message === 'ok') {
        this.imgListDetail.push(res.path)
      }
    },
    detailUploadError() {
      // console.log('TCL: exhibitUploadError -> res', res)
    },
    deleteDetailImg(i) {
      this.imgListDetail.splice(i, 1)
    },

    preview_exhibit() {
      this.isShowImgPreview = true
    },
    preview_detail() {
      this.isShowImgDetail = true
    },

    save() {
      try {
        let vList = [+this.formSpxx.v1, +this.formSpxx.v2, +this.formSpxx.v3, +this.formSpxx.v4, +this.formSpxx.v5]
        let jsonVList = JSON.stringify(vList)
        let vListSort = vList.sort((a, b) => {
          return a - b
        })
        let jsonSortVList = JSON.stringify(vListSort)
        if (jsonVList !== jsonSortVList) {
          return this.$message.error('返利比例请按照 v5>v4>v3>v2>v1 填写')
        }
        let valides = []
        this.$refs.spxxForm.validate(valid => {
          if (valid) {
            valides.push(true)
          } else {
            valides.push(false)
          }
        })
        this.$refs.xsszForm.validate(valid => {
          if (valid) {
            valides.push(true)
          } else {
            valides.push(false)
          }
        })
        if (!valides.every(item => item)) return this.$message.error('请按照规则填写！')

        let params = {
          title: this.formSpxx.goodsTitle,
          price: +this.formSpxx.price,
          date: moment(this.formSpxx.date).format('YYYY-MM-DD'),
          origin: this.formSpxx.origin,
          content: '11111',
          description: this.formSpxx.description.length
            ? this.formSpxx.description
                .filter(item => item.isSelect)
                .map(item => item.name)
                .join(',')
            : '', // 说明
          rebate: {
            // 返利设置(key:会员等级，value:返利金额)
            '1': this.formSpxx.v1,
            '2': this.formSpxx.v2,
            '3': this.formSpxx.v3,
            '4': this.formSpxx.v4,
            '5': this.formSpxx.v5
          },
          show_pic: this.imgListExhibit.length ? this.imgListExhibit.join(',') : '',
          detail_pic: this.imgListDetail.length ? this.imgListDetail.join(',') : '',
          weight: this.formXssz.formatAdd + 'g', // --> 规格（重量）
          specification: this.formXssz.taste,
          mind_order: this.recommends[0].isSelect ? +this.recommends[0].value : '', // --> 主页推荐顺序(不传默认不推荐)
          cart_order: this.recommends[1].isSelect ? +this.recommends[1].value : '', // --> 购物车推荐顺序(不传默认不推荐)
          efficacy: this.formSpxx.typeEffects.length
            ? this.formSpxx.typeEffects
                .filter(item => item.isSelect)
                .map(item => item.name)
                .join(',')
            : '', // --> 功效(可以不传)
          state: this.formXssz.goodStauts, // --> 上架下架状态（1：上架，0：下架）(默认是1)
          label_id: this.formXssz.activeLabel, // --> 标签id
          publish_time: this.isDefinitTime && this.definitData ? moment(this.definitData).format('YYYY-MM-DD HH:mm:ss') : '' // --> 定时上架时间(不传，默认立即上架)
        }
        let url, message
        if (Object.keys(this.current).length) {
          url = '/content/goods/update_goods'
          params.goods_id = this.current.id
          message = '修改成功！'
        } else {
          url = '/content/goods/add_goods'
          message = '添加成功！'
        }
        this.$post(url, params)
          .then(res => {
            if (!!res.data) {
              this.$message({
                type: 'success',
                message: message
              })
              this.$emit('toggle-component', { action: 'cancel' })
            } else {
              this.$message.error(res.message )
            }
          })
          .catch(e => {
            this.$message.error(e)
          })
      } catch (error) {
        console.log(error)
      }
    },
    cancel() {
      this.$emit('toggle-component', { action: 'cancel' })
    }
  }
}
</script>

<style lang='less' scoped>
.spgl-detail {
  display: grid;
  grid-template-columns: 9fr 7fr;
  grid-gap: 18px;
  .spgl-item {
    .spgl-item__padding {
      padding-right: 5%;
      padding-left: 5%;
    }
  }
  .spgl-item--content {
    padding: 0 15px;
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
      height: 40px;
      line-height: 40px;
      min-width: 75px;
      margin-right: 10px;
      span {
        display: inline-block;
        &:first-of-type {
          width: 65px;
          font-size: 15px;
          text-align-last: justify;
        }
      }
    }
    .spgl-form--input {
      display: flex;
      justify-content: space-between;
      width: 60%;
    }
    .spgl-form--checkbox {
      display: inline-block;
    }
    .spgl-form--dateSelect {
      & > div {
        width: 100%;
        &:first-of-type {
          margin-bottom: 20px;
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
      display: flex;
      span {
        margin-right: 4px;
      }
      /deep/ .el-form-item__error {
        margin-left: unset;
        width: 59px;
      }
      .spgl-form--num__input {
        width: 35px;
        /deep/ .el-input__inner {
          padding: 0 5px;
        }
      }
    }
    .spgl-form--setLabel {
      margin-left: 12px;
    }
    .spgl-form--content {
      display: inline-block;
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
      margin-top: -22px;
      .taste-box {
        width: 70px;
        line-height: 30px;
        height: 30px;
        margin-right: 15px;
        text-align: center;
        position: relative;
        border: 1px solid #363f51;
        border-radius: 3px;
        .taste-box__text {
          width: 70px;
          padding: 0 10px;
          .taste-box__text--span {
            white-space: nowrap;
            font-size: 14px;
          }
        }
      }
      .taste__label {
        white-space: nowrap;
      }
      .taste__input {
        width: 100px;
        margin-top: 22px;
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
.spgl-detail {
  .spgl-form--checkbox {
    .el-checkbox {
      margin-right: 10px;
      line-height: 40px;
    }
  }
  .el-form-item__content {
    width: 100%;
    display: flex;
    align-content: flex-start;
    .el-form-item__error {
      margin-left: 94px;
    }
  }
  .spgl-form__taste {
    .el-form-item__content .el-form-item__error {
      margin-left: unset;
    }
  }
  .spgl-form__state {
    .spgl-form--setLabel {
      color: #ff4b57;
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
  .add-tag {
    .add-tag--content {
      .el-form-item {
        width: 100%;
      }
      .el-form-item__content {
        display: block;
      }
      .el-input {
        width: calc(100% - 60px);
      }
    }
  }
}
</style>
