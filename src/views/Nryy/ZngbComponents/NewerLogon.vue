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
          <!-- <label class="ssxd-form--label">
            <span>触发等级</span>
            <span>：</span>
          </label>
          <el-select class="ssxd-form--input" v-model="formSsxd.touchLevel" placeholder="输入内容...">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select> -->
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
            v-model="formSsxd.count"
            placeholder='输入内容...'>
          </el-input>
          <div class="ssxd-form--btn">
            <el-button size="small" class="success-btn" @click="edit">编辑</el-button>
            <el-button size="small" @click="cancel">取消</el-button>
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
          label="注册时间"
          align='center'
          prop="date"
         >
        </el-table-column>
        <el-table-column
          align='center'
          prop="nickname"
          label="昵称">
        </el-table-column>

      </el-table>
    </div>
    <div class="ssxd-footer">
      <div class="selectAll-wrap">
      </div>
      <div class="page-wrap">
        <my-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total="400">
        </my-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from 'COMPONENTS/Pagination'

export default {
  name: 'ssxd',
  components: {
    'my-pagination': Pagination
  },
  data () {
    return {
      formSsxd: {
        touchStauts: 1,
        scriptStauts: 1,
        count: 10
      },
      tableData: [
        {date: '2019-03-22 09:20', nickname: 'WFH0...', name: 'XX系列奶茶蛋白粉XX系列奶茶蛋白粉XX系列奶茶蛋白粉', number: '20', status: 1},
        {date: '2019-03-22 09:20', nickname: 'WFH0...', name: 'XX系列奶茶蛋白粉XX系列奶茶蛋白粉XX系列奶茶蛋白粉', number: '20', status: 1},
        {date: '2019-03-22 09:20', nickname: 'WFH0...', name: 'XX系列奶茶蛋白粉XX系列奶茶蛋白粉XX系列奶茶蛋白粉', number: '20', status: 1},
        {date: '2019-03-22 09:20', nickname: 'WFH0...', name: 'XX系列奶茶蛋白粉XX系列奶茶蛋白粉XX系列奶茶蛋白粉', number: '20', status: 1}
      ],
      isAllSelect: false
    }
  },
  methods: {
    edit () {},
    cancel () {},
    handleSelectionChange () {},
    editHandle () {},
    deleteHandle () {},
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
    .page-wrap {
      display: flex;
    }
  }
</style>
