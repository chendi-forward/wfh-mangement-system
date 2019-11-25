<template>
  <div>
    <div class="yxmk-cjyhq">
      <div class="cjyhq-box">
        <div class="cjyhq-xxsz">
          <div class="cjyhq-title">活动信息设置</div>
          <form class="cjyhq-content" name="formXxsz">
            <div class="content-content__item">
              <div class="content__item--tag">活动编号：</div>
              <div class="content__item--input">
                <el-input v-model="formXxsz.number" placeholder="输入编号..."></el-input>
              </div>
              <div class="content__item--rule">*10个字符以内</div>
            </div>
            <div class="content-content__item">
              <div class="content__item--tag">活动名称：</div>
              <div class="content__item--input">
                <el-input v-model="formXxsz.yhqName" placeholder="输入标题..."></el-input>
              </div>
              <div class="content__item--rule">*10个字符以内</div>
            </div>
            <div class="content-content__item">
              <div class="content__item--tag">已参加显示名称：</div>
              <div class="content__item--input">
                <el-input v-model="formXxsz.ycjName" placeholder="输入标题..."></el-input>
              </div>
              <div class="content__item--rule">*10个字符以内</div>
            </div>
            <div class="content-content__item">
              <div class="content__item--tag">下单页显示名称：</div>
              <div class="content__item--input">
                <el-input v-model="formXxsz.xdyName" placeholder="输入标题..."></el-input>
              </div>
              <div class="content__item--rule">*5个字符以内</div>
            </div>
            <div class="content-content__item">
              <div class="content__item--tag">极限销售额：</div>
              <div class="content__item--input">
                <el-input v-model="formXxsz.jxsse" placeholder="输入数字..."></el-input>
              </div>
              <div class="content__item--unit">（单位：元）</div>
            </div>
            <div class="content-content__item">
              <div class="content__item--tag">活动时间：</div>
              <div class="content__item--input">
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
              </div>
              <div class="content__item--rule">*必填项</div>
            </div>
            <div class="content-content__item">
              <div class="content__item--tag">订单条件：</div>
              <div class="content__item--input">
                <div class="form--radio">
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
                </div>
              </div>
            </div>
            <div class="content-content__item">
              <div class="content__item--tag">折扣设置：</div>
              <div class="content__item--input">
                <div class="form--radio">
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
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="cjyhq-spsz">
          <div class="cjyhq-title">活动信息设置</div>
          <div class="content-content__item">
            <div class="content__item--tag">参与优惠商品：</div>
            <div class="content__item--input content__item--input--img">
              <div class="item__sale" v-for="item in 7">
                <img class="item__sale--img" src />
                <div class="item__sale--text text-overflow-mult">dafasefasdfasefadasdsdasfsad</div>
              </div>
            </div>
          </div>
          <div class="content-edit">
            <div class="content-edit--total">共 7 件</div>
            <el-button type="success" @click="showTag">更改</el-button>
          </div>
        </div>
      </div>
      <div class="cjyhq-box__setting">
        <div class="cjyhq-title">优惠用户设置</div>
        <form name="formYhsz" class="yhsz-content">
          <div class="content-content__item">
            <div class="content__item--tag">标签筛选：</div>
            <div class="content__item--input">
              <el-select v-model="formYhsz.bqsx" placeholder="请选择...">
                <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
            <div class="content__item--btn">
              <el-button>删除</el-button>
            </div>
          </div>
        </form>
        <div class="yhsz-search">
          <div class="content-content__item">
            <div class="content__item--tag">用户搜索：</div>
            <div class="content__item--input">
              <el-input type="text" placeholder="输入用户ID..."></el-input>
            </div>
            <div class="content__item--btn">
              <el-button>搜索</el-button>
            </div>
          </div>
          <div class="content__search--options">
            <el-checkbox-group v-model="checkList">
              <el-checkbox v-for="(item, i) in checkLists" :key="i" :label="item.label"></el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="content__group--btn">
            <el-button type="success">编辑</el-button>
            <el-button >取消</el-button>
          </div>
        </div>
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
      <div class="cjyhq-box__footer">
        <el-button type="success">保存</el-button>
        <el-button @click="hideSetting">取消</el-button>
      </div>
  </div>
</template>

<script>
import DialogCom from 'COMPONENTS/DialogCom'

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
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 20px;
  .cjyhq-title {
    width: 100%;
    height: 63px;
    line-height: 63px;
    font-size: 20px;
    background-color: #f7f8f9;
    border-radius: 6px 6px 0 0;
    padding: 0 20px;
  }
  .content-content__item {
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 20px 0;
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
      width: 300px;
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
      display: flex;
      justify-content: space-between;
    }
    .form--radio {
      display: flex;
      align-items: center;
      .el-radio {
        margin-right: 5px;
      }
      .el-input {
        width: 150px;
      }
      .form--radio__ff {
        margin-right: 50px;
        span {
          margin-left: 5px;
        }
      }
    }
    .date-throught {
      height: 2px;
      background-color: #363f51;
      width: 100%;
    }
  }
  .yhsz-content {
    padding: 20px 0;
    margin-bottom: 20px;
    background: #fff;
    border-radius: 0 0 6px 6px;
    .content__item--tag {
      width: 110px;
    }
  }
  .yhsz-search {
    height: calc(~"100% - 204px");
    background-color: #fff;
    padding-top: 20px;
    .content__item--tag {
      width: 110px;
    }
    .content__group--btn {
      padding: 30px 30px;
      display: flex;
      justify-content: flex-end;
    }
  }
  .content__search--options {
    height: 664px;
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
        margin-top: 10px;
      }
    }
  }
  .content-edit {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: #fff;
    padding: 30px 30px;
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
  padding: 0 30px 0 30px;
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
