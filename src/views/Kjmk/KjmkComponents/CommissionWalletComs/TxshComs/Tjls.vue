<template>
    <div class="ssxd-body">
      <el-table
        class="ssxd-table"
        ref="multipleTable"
        :data="data"
        tooltip-effect="dark"
        stripe
        style="width: 100%">
        <el-table-column
          label="日期"
          align='center'
          width="150">
          <template slot-scope="scope">{{ scope.row.r_time }}</template>
        </el-table-column>
        <el-table-column
          align='center'
          label="推荐对象">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.child_id }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="任务阶段">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.task_rank }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="推荐返利额度">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.rebate_money }}</span></template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  export default {
    name: 'fltq',
    props: ['data'],
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>
