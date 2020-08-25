<template>
  <el-table class="kpls-table" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column label="申请时间" align='center' width="180" prop="add_time">
    </el-table-column>
    <el-table-column align='center' min-width="100" label="状态">
      <template slot-scope='scope'>
        <span :class='{"bold": scope.row.state === "未开票"}'>{{scope.row.state}}</span>
      </template>
    </el-table-column>
    <el-table-column align='center' min-width="120" label="用户ID" prop="user_id">
    </el-table-column>
    <el-table-column align='center' min-width="120" label="昵称" prop="nickname">
    </el-table-column>
    <el-table-column align='center' label="商品名称" width="120">
      <template slot-scope="scope">
        <el-popover placement="right" width="280" trigger="hover" @show="showGoodsName(scope.row.invoice_id)">
          <el-table :data="gridData">
            <el-table-column property="goods_title" label="商品名称"></el-table-column>
            <el-table-column width="90" property="count" label="数量"></el-table-column>
          </el-table>
          <el-button type="small" slot="reference">
            商品信息
          </el-button>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column align='center' label="发票抬头" min-width="100" prop="invoice_title">
    </el-table-column>
    <el-table-column align='center' label="公司税号" min-width="100" prop="tin_number">
    </el-table-column>
    <el-table-column align='center' label="收件人" min-width="100" prop="recipient">
    </el-table-column>
    <el-table-column align='center' label="邮箱" min-width="150" prop="address">
    </el-table-column>
    <el-table-column align='center' label="联系电话" min-width="120" prop="tel">
    </el-table-column>
    <el-table-column label="操作" align='center' width="160">
      <template slot-scope="scope">
        <el-button plain size='small' icon="el-icon-edit" @click='handleEdit(scope.row)'></el-button>
        <el-button plain size='small' icon="el-icon-delete" @click='handleDelete(scope.row)'></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  name: 'kpls-dzfp',
  props: {
    tableData: Array
  },
  data() {
    return {
      gridData: [{
        goods_title: '',
        count: 1,
      }]
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit('handle-selection-change', val)
    },
    handleEdit(row) {
      this.$emit('handle-edit', row.invoice_id)
    },
    handleDelete(row) {
      this.$emit('handle-delete', [row.invoice_id])
    },
    showGoodsName(invoice_id) {
      if (this.hoverOrderId === invoice_id) return
      this.hoverOrderId = invoice_id
      const params = {
        invoice_id: invoice_id
      }
      this.$get('/accountant/invoice_detail', params).then(res => {
        this.gridData = res.data.order_detail
      })
    }
  }
}
</script>

<style lang="less" scoped>
.bold {
  padding: 5px;
  background-color: #000;
  color: #fff;
  border-radius: 14px;
}
</style>
