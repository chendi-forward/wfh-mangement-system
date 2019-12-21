<template>
  <div class="yxmk-cjyhq">
    <div class="cjyhq-box">
      <div class="cjyhq-xxsz">
        <div class="cjyhq-title">活动信息设置</div>
        <el-form class="cjyhq-content" name="formXxsz" label-width="130px" label-position="left">
          <el-form-item class="content-content__item" label="活动编号：">
            <el-input v-model="formXxsz.number" placeholder="输入活动编号..."></el-input>
            <div class="content__item--rule">*10个字符以内</div>
          </el-form-item>
          <el-form-item class="content-content__item" label="活动名称：">
            <el-input v-model="formXxsz.yhqName" placeholder="输入活动名称..."></el-input>
            <div class="content__item--rule">*10个字符以内</div>
          </el-form-item>
          <el-form-item class="content-content__item" label="已参加显示名称：">
            <el-input v-model="formXxsz.ycjName" placeholder="输入已参加显示名称..."></el-input>
            <div class="content__item--rule">*10个字符以内</div>
          </el-form-item>
          <el-form-item class="content-content__item" label="下单页显示名称：">
            <el-input v-model="formXxsz.xdyName" placeholder="输入下单页显示名称..."></el-input>
            <div class="content__item--rule">*5个字符以内</div>
          </el-form-item>
          <el-form-item class="content-content__item" label="极限销售额：">
            <el-input v-model="formXxsz.jxsse" placeholder="输入极限销售额..."></el-input>
            <div class="content__item--unit">（单位：元）</div>
          </el-form-item>
          <el-form-item class="content-content__item" label="活动时间：">
            <div class="form--dateSelect">
              <el-date-picker
                class="data-input"
                v-model="effectiveDate_s"
                type="datetime"
                placeholder="选择时间..."
              ></el-date-picker>
              <div style="width: 20px; display: flex; align-items: center;">
                <div class="date-throught"></div>
              </div>
              <el-date-picker
                class="data-input"
                v-model="effectiveDate_e"
                type="datetime"
                placeholder="选择时间..."
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item class="content-content__item" label="订单条件：">
            <div class="form--radio__ff">
              <el-radio v-model="formXxsz.ddType" label="1">金额达到</el-radio>
              <el-input placeholder="输入数字..." type="number" v-model="formXxsz.ddMoney"></el-input>
              <span>元</span>
            </div>
            <div class="form--radio__ff">
              <el-radio v-model="formXxsz.ddType" label="2">数量达到</el-radio>
              <el-input placeholder="输入数字..." type="number" v-model="formXxsz.ddNumber"></el-input>
              <span>罐</span>
            </div>
          </el-form-item>
          <el-form-item class="content-content__item" label="折扣设置：">
              <div class="form--radio__ff">
                <el-radio v-model="formXxsz.zkType" label="1">金额减扣</el-radio>
                <el-input placeholder="输入数字..." type="number" v-model="formXxsz.zkMoney"></el-input>
                <span>元</span>
              </div>
              <div class="form--radio__ff">
                <el-radio v-model="formXxsz.zkType" label="2">比例减扣</el-radio>
                <el-input placeholder="输入数字..." type="number" v-model="formXxsz.zkNumber"></el-input>
                <span>%</span>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="cjyhq-spsz">
        <div class="cjyhq-title">活动商品设置</div>
        <el-form class="cjyhq-content form-spsz" name="formSpsz" label-width="130px" label-position="left">
          <el-form-item label="参与优惠商品：">
            <div class="item__sale" v-for="item in 7">
              <img class="item__sale--img" src />
              <div class="item__sale--text text-overflow-mult">dafasefasdfasefadasdsdasfsad</div>
            </div>
          </el-form-item>
        </el-form>
        <!-- <div class="content-content__item">
          <div class="content__item--tag">参与优惠商品：</div>
          <div class="content__item--input content__item--input--img">
            <div class="item__sale" v-for="item in 7">
              <img class="item__sale--img" src />
              <div class="item__sale--text text-overflow-mult">dafasefasdfasefadasdsdasfsad</div>
            </div>
          </div>
        </div> -->
        <div class="content-edit">
          <span class="content-edit--total">共 7 件</span>
          <el-button type="success" size="small" @click="showTag">更改</el-button>
        </div>
      </div>
    </div>
    <div class="cjyhq-box__setting">
      <div class="cjyhq-title">优惠用户设置</div>
      <el-form name="formYhsz" class="yhsz-content" label-width="90px" label-position="left">
        <el-form-item label="标签筛选：" class="content-content__item" :show-message='false'>
          <el-select v-model="formYhsz.bqsx" placeholder="请选择...">
            <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
          </el-select>
          <el-button size="small" type="warning">更改</el-button>
        </el-form-item>
      </el-form>
      <div class="yhsz-search">
        <el-form name="formYhsz" class="yhsz-content yhsz-content--search" label-width="90px" label-position="left">
          <el-form-item label="用户搜索：" class="content-content__item">
            <el-input type="text" placeholder="输入用户ID..."></el-input>
            <el-button size="small">搜索</el-button>
          </el-form-item>
        </el-form>
        <div class="content__search--options">
          <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="(item, i) in checkLists" :key="i" :label="item.label"></el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="content__group--btn">
          <el-button type="success" size="small">编辑</el-button>
          <el-button size="small">取消</el-button>
        </div>
      </div>
    </div>
    <div class="cjyhq-box__footer">
      <el-button type="success" size="small">保存</el-button>
      <el-button @click="hideSetting" size="small">取消</el-button>
    </div>

    <dialog-com v-model="isShowTag" title="参加活动商品" :is-show-footer='false' class="tag-dialog">
      <div class="dialog-search">
        <div class="search-title">商品搜索：</div>
        <div class="search-input">
          <el-input type="text" v-model="activeSearch" placeholder="输入商品编号/商品名称..."></el-input>
        </div>
        <div class="search-button">
          <el-button>搜索</el-button>
        </div>
      </div>
      <div class="dialog-list">
        <div class="search-title">商品添加：</div>
        <div class="search-list">
          <div class="search-list--item">
            <el-table
              class="ssxd-table"
              ref="multipleTable"
              :data="activeGoods"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                align='center'
                label="商品图片"
                width="100">
                <template slot-scope="scope">{{ scope.row.pic }}</template>
              </el-table-column>
              <el-table-column
                align='center'
                label="商品编号"
                width="130">
                <template slot-scope="scope">{{ scope.row.id }}</template>
              </el-table-column>
              <el-table-column
                align='center'
                label="商品名称">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="dialog-btns">
        <el-button type="success">确定</el-button>
        <el-button @click="hideTag">取消</el-button>
      </div>
    </dialog-com>
  </div>
</template>

<script>
import DialogCom from 'COMPONENTS/DialogCom'
import $ from 'jquery'

export default {
	name: "yxmk-cjyhq",
	components: {
		'dialog-com': DialogCom
	},
  data () {
    return {
      formXxsz: {
        number: "",
        yhqName: "",
        ycjName: "",
        jxsse: "",
        ffType: "1", // 发放类型
        ffNumber: "", // 发放数量
        ddType: "1", // 订单类型
        ddMoney: "", // 订单金额
				ddNumber: "" // 订单数量
			},
			isShowTag: false,
      effectiveDate_s: "",
      effectiveDate_e: "",
      options: ["九月大客户", "新用户"],
      formYhsz: {
        bqsx: "九月大客户"
      },
      checkList: [],
      checkLists: [
        {
          label: 'xxx萨达色粉'
        },
        {
          label: 'xxx萨达色粉'
        },
        {
          label: 'xxx萨达色粉'
        },
        {
          label: 'xxx萨达色粉'
        },
        {
          label: 'xxx萨达色粉'
        },
        {
          label: 'xxx萨达色粉'
        },
        {
          label: 'xxx萨达色粉'
        },
        {
          label: 'xxx萨达色粉'
        },
        {
          label: 'xxx萨达色粉'
        },
        {
          label: 'xxx萨达色粉'
        },
        {
          label: 'xxx萨达色粉'
        }
      ],
			activeSearch: '',
			activeGoods: [
				{
					pic: '',
					id: 123123123,
					name: '卢青蛋白粉500g'
				},
				{
					pic: '',
					id: 123123123,
					name: '卢青蛋白粉500g'
				},
				{
					pic: '',
					id: 123123123,
					name: '卢青蛋白粉500g'
				}
			]
    }
  },
  mounted () {
    let wrapH = $('.cjyhq-xxsz').height() + $('.cjyhq-spsz').height() - 63 - 70 - 70 - 62 - 3
    $('.content__search--options').height(wrapH)
  },
	methods: {
		showTag () {
			this.isShowTag = true
		},
		hideTag () {
			this.isShowTag = false
    },
    hideSetting () {
      this.$emit('hide-setting')
    },
		handleSelectionChange () {}
	}	
}
</script>

<style lang="less" scoped>
.yxmk-cjyhq {
  display: grid;
  grid-template-columns: 7fr 4fr;
  grid-column-gap: 20px;
  grid-template-areas: 
    "headerLeft headerRight"
    "footer footer";
  .cjyhq-box {
    grid-area: headerLeft;
  }
  .cjyhq-box__setting {
    grid-area: headerRight;
  }
  .cjyhq-box__footer {
    grid-area: footer;
  }
  .cjyhq-title {
    width: 100%;
    height: 63px;
    line-height: 63px;
    font-size: 20px;
    background-color: #f7f8f9;
    border-radius: 6px 6px 0 0;
    padding: 0 20px;
  }
  .cjyhq-content {
    background-color: #fff;
    padding: 15px;
  }
  .content-content__item {
    /deep/ .el-input {
      width: 70%;
    }
    .content__item--tag {
      padding-left: 30px;
      width: 170px;
      font-size: 15px;
    }
    .content__item--input--img {
      width: 650px;
      white-space: nowrap;
      overflow: auto;
    }
    .content__item--unit,
    .content__item--rule {
      display: inline;
      padding-left: 20px;
      color: #fe4a56;
      font-size: 15px;
    }
    .content__item--unit {
      color: #333;
    }
    .content__item--btn {
      margin: 0 30px;
    }
    .form--dateSelect {
      width: 70%;
      display: flex;
      justify-content: space-between;
    }
    .form--radio__ff {
      display: inline-block;
      margin-right: 30px;
      .el-radio {
        margin-right: unset;
      }
      .el-input {
        width: 110px;
      }
      span {
        margin-left: 5px;
      }
    }
    .date-throught {
      height: 2px;
      background-color: #363f51;
      width: 100%;
    }
  }
  .yhsz-content {
    padding: 15px;
    margin-bottom: 20px;
    background: #fff;
    border-radius: 0 0 6px 6px;
    .content__item--tag {
      width: 110px;
    }
    .content-content__item {
      margin-bottom: unset;
    }
    .el-select {
      width: 65%;
      /deep/ .el-input {
        width: 90%;
      }
    }
  }
  .yhsz-content--search {
    margin-bottom: unset;
  }
  .yhsz-search {
    background-color: #fff;
    .content__item--tag {
      width: 110px;
    }
    .content__group--btn {
      padding: 15px;
      text-align: end;
    }
  }
  .content__search--options {
    height: 627px;
    margin: 0 30px;
    border: 1px solid #d5d8db;
    overflow: auto;
    .el-checkbox {
      display: block;
      height: 75px;
      line-height: 75px;
      padding: 0 20px;
      margin-right: unset;
    }
  }
  .cjyhq-xxsz {
    .content__item--input {
      flex: 1;
    }
  }
  .cjyhq-spsz {
    margin-top: 20px;
    .form-spsz {
      /deep/ .el-form-item {
        margin-bottom: unset;
      }
      /deep/ .el-form-item__content {
        border: 1px solid #d5d8db;
        padding: 15px;
        width: 500px;
        overflow: auto;
        white-space: nowrap;
      }
    }
    .content-content__item {
      align-items: flex-start;
    }
    .content__item--input {
      border: 1px solid #d5d8db;
      // margin-right: 100px;
      padding: 10px 0;
    }
    .item__sale {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      width: 100px;
      height: 100px;
      margin: 0 25px;
      .item__sale--img {
        display: inline-block;
        width: 50px;
        height: 50px;
      }
      .item__sale--text {
        white-space: normal;
        word-break: break-word;
        height: 40px;
        line-height: 20px;
        margin-top: 10px;
      }
    }
  }
  .content-edit {
    background-color: #fff;
    padding: 15px;
    text-align: end;
    .content-edit--total {
      margin-right: 20px;
    }
	}
	.tag-dialog {
		.dialog-search {
			display: flex;
			align-items: center;
		}
		.dialog-list {
			display: flex;
			margin-top: 15px;
    }
    .dialog-btns {
      margin-top: 20px;
      text-align: center;
    }
		.search-list {
			flex: 1;
			border: 1px solid #d5d8db;
			border-radius: 4px;
			padding: 1px;
		}
		.search-title {
			width: 100px;
		}
		.search-input {
			flex: 1;
		}
		.search-button {
			padding-left: 20px;
		}
	}
}

.cjyhq-box__footer {
  background-color: #fff;
  height: 75px;
  line-height: 75px;
  text-align: end;
  margin-top: 20px;
  padding: 0 15px 0 15px;
}
</style>

<style lang='less'>
.el-tabs--border-card {
  box-shadow: none;
}
.el-input.data-input {
  width: 45%;
  .el-input__inner {
    padding-right: 15px;
    padding-left: 15px;
  }
  .el-input__prefix {
    right: 5px;
    left: unset;
  }
}
.content__search--options {
  .el-checkbox {
    .el-checkbox__label {
      margin-left: 40px;
    }
    &.is-checked {
      background-color: #ff4b57;
      .el-checkbox__label {
        color: #fff;
      }
    }
  }
}
</style>
