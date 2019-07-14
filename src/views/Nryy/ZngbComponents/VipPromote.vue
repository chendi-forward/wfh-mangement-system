<template>
  <div class="ssxd">
    <div class="ssxd-header">
      <form class="ssxd-form">
        <div class="ssxd-form-item">
          <label class="ssxd-form--label">
            <span>触发状态</span>
            <span>：</span>
          </label>
          <el-radio-group class="ssxd-form--radio" v-model="formSsxd.touchStauts">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
          <label class="ssxd-form--label">
            <span>触发等级</span>
            <span>：</span>
          </label>
          <el-input
            class="ssxd-form--input"
            v-model="formSsxd.touchLevel"
            placeholder='输入内容...'>
          </el-input>
        </div>
        <div class="ssxd-form-item">
          <label class="ssxd-form--label">
            <span>脚本运行</span>
            <span>：</span>
          </label>
          <el-radio-group class="ssxd-form--radio" v-model="formSsxd.scriptStauts">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
          <label class="ssxd-form--label">
            <span>脚本1小时内随机播放产生次数</span>
            <span>：</span>
          </label>
          <el-input
            class="ssxd-form--input"
            v-model="formSsxd.touchLevel"
            placeholder='输入内容...'>
          </el-input>
          <div class="ssxd-form--btn">
            <el-button size="mini" class="success-btn" @click="edit">编辑</el-button>
            <el-button size="mini" class="cancel-btn" @click="cancel">取消</el-button>
          </div>
        </div>
      </form>
    </div>
    <div class="ssxd-body">
      <el-table
        class="ssxd-table"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="发布时间"
          align='center'
          width="150">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          align='center'
          label="昵称">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.nickname }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="晋级前等级">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.beforePromote }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="晋级后等级">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.afterPromote }}</span></template>
        </el-table-column>
      </el-table>
    </div>
    <div class="ssxd-footer">
      <div class="selectAll-wrap">
        <el-button size="mini" class="success-btn" @click="createFn">新建</el-button>
      </div>
      <div class="page-wrap">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="5"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
        <el-button size="mini" class="success-btn" @click="submit">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ssxd',
  data () {
    return {
      formSsxd: {
        touchStauts: 1,
        scriptStauts: 1,
        touchLevel: 'v2'
      },
      tableData: [
        {date: '2019-03-22 09:20', nickname: 'WFH0...', beforePromote: 'v1', afterPromote: 'v2'},
        {date: '2019-03-22 09:20', nickname: 'WFH0...', beforePromote: 'v1', afterPromote: 'v2'},
        {date: '2019-03-22 09:20', nickname: 'WFH0...', beforePromote: 'v1', afterPromote: 'v2'},
        {date: '2019-03-22 09:20', nickname: 'WFH0...', beforePromote: 'v1', afterPromote: 'v2'}
      ],
      isAllSelect: false
    }
  },
  methods: {
    edit () {},
    cancel () {},
    handleSelectionChange () {},
    editHandle () {},
    createFn () {},
    handleSizeChange () {},
    handleCurrentChange () {},
    currentPage () {},
    submit () {}
  }
}
</script>

<style lang="less" scoped>
  .ssxd {
    & > div {
      background-color: #fff;
    }
    .ssxd-header {
      height: 204px;
      box-sizing: border-box;
      padding: 47px 30px 47px 60px;
      margin-bottom: 13px;
    }
    .ssxd-body {
      margin-bottom: 13px;
    }
    .ssxd-form {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      .ssxd-form-item {
        line-height: 40px;
        .ssxd-form--label {
          font-size: 15px;
          margin-right: 20px;
        }
        .ssxd-form--radio {
          margin-right: 90px;
        }
        .ssxd-form--input {
          width: 190px;
        }
        .ssxd-form--btn {
          display: inline-block;
          float: right;
        }
      }
    }
    .ssxd-table {
      // ..
    }
    .page-wrap {
      display: flex;
    }
  }
</style>
