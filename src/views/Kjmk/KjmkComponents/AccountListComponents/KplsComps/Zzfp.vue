<template>
  <el-table class="kpls-table" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column label="申请时间" align='center' width="180" prop="add_time">
    </el-table-column>
    <el-table-column align='center' min-width="100" label="状态" prop="state">
    </el-table-column>
    <el-table-column align='center' min-width="120" label="用户ID" prop="user_id">
    </el-table-column>
    <el-table-column align='center' min-width="120" label="昵称" prop="nickname">
    </el-table-column>
    <el-table-column align='center' min-width="150" label="商品名称" prop="goods_title">
    </el-table-column>
    <el-table-column align='center' label="数量" min-width="60" prop="goods_count">
    </el-table-column>
    <el-table-column align='center' label="发票抬头" min-width="100" prop="invoice_title">
    </el-table-column>
    <el-table-column align='center' label="公司税号" min-width="100" prop="tin_number">
    </el-table-column>
    <el-table-column align='center' label="收件人" min-width="100" prop="recipient">
    </el-table-column>
    <el-table-column align='center' label="邮寄地址" min-width="150" prop="address">
    </el-table-column>
    <el-table-column align='center' label="联系电话" min-width="120" prop="tel">
    </el-table-column>
    <el-table-column label="操作" align='center' width="160">
      <template slot-scope="scope">
        <!-- <el-button plain size='small' icon="el-icon-edit" @click='handleEdit(scope.row)'></el-button> -->
        <el-button plain size='small' icon="el-icon-delete" @click='handleDelete(scope.row)'></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'kpls-zzfp',
  props: {
    tableData: Array
  },
  data() {
    return {
    }
  },

  methods: {
    handleSelectionChange(val) {
      this.$emit('handle-selection-change', val)
    },
    handleEdit(row) {
      console.log(row)
    },
    handleDelete(row) {
      this.$emit('handle-delete', [row.invoice_id])
    }
  }
}
</script>
