<template>
    <div class="ssxd-body">
      <el-table
        class="ssxd-table"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          label="日期"
          align='center'
          width="150">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          align='center'
          label="推荐对象">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.yjdx }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="任务阶段">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.rwjd }}</span></template>
        </el-table-column>
        <el-table-column
          align='center'
          label="推荐返利额度">
          <template slot-scope="scope"><span class='text-overflow'>{{ scope.row.tjfled }}</span></template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  export default {
    name: 'fltq',
    data () {
      return {
        tableData: [
          {date: '2019-03-22 09:20', yjdx: 'WFH0...', rwjd: 'L1', tjfled: 3000}
        ]
      }
    },
    methods: {
    }
  }
</script>
