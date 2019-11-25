<template>
  <div class="spgl-list">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="商品管理" name="spgl"></el-tab-pane>
    </el-tabs>
    <div class="spgl-list__search">
      <div>
        <span>商品搜索：</span>
        <el-input
          class="search__input"
          placeholder="请输入商品名称/商品标号..."
          prefix-icon="el-icon-search"
          v-model="searchVal">
        </el-input>
        <el-button size="mini" class="success-btn" @click="search">搜索</el-button>
      </div>
      <div>
        <el-button size="mini" class="success-btn" @click="newGoods">新建</el-button>
      </div>
    </div>
    <el-table
      ref="spglList"
      :data="tableData"
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="预览"
        width="80">
				<template slot-scope="scope"><img class="spgl-list--img" :src="base_url + scope.row.avatar" alt=""></template>
      </el-table-column>
      <el-table-column
        label="商品标编号"
        prop="id"
        align="center"
        width="110">
      </el-table-column>
      <el-table-column
        label="商品标题"
        prop="title"
        align="center"
        min-width="140">
      </el-table-column>
      <el-table-column
        label="排序"
        prop="order"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        label="热门推荐"
        prop="hotRecommend"
        align="center"
        width="90">
      </el-table-column>
      <el-table-column
        label="购物车推荐"
        prop="carRecommend"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        label="产地"
        prop="origin"
        align="center"
        min-width="200">
      </el-table-column>
      <el-table-column
        label="生产日期"
        prop="data"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        label="规格"
        prop="format"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        label="状态"
        prop="goodState"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="130">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" icon="el-icon-edit" size="small"></el-button>
          <el-button @click="deleteClick(scope.row)" icon="el-icon-delete" size="small"></el-button>
        </template>
      </el-table-column>
      <!-- 表格扩展 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table
            :data="props.row.taste_stock"
            style="width: 280px">
            <el-table-column
              label="口味"
              prop='taste'
              align="center"
              width="100">
            </el-table-column>
            <el-table-column
              label="库存"
              prop='stock'
              align="center"
              width="100">
            </el-table-column>
            <el-table-column
              label="销量"
              prop="sales"
              align="center"
              width="80">
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
    </el-table>
    <div class="ssxd-footer">
      <div class="selectAll-wrap">
        <el-button size="mini">删除</el-button>
      </div>
      <div class="page-wrap">
        <my-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total="total">
        </my-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from 'COMPONENTS/Pagination'
import * as commonsConfig from 'COMMONS/commonsConfig.js'
let base_url = commonsConfig.BASE_URL

let state_obj = {
  1: '上架',
  0: '下架'
}

export default {
  name: 'spgl-list',
  components: {
    'my-pagination': Pagination
  },
  data () {
    return {
      base_url: base_url,
      activeName: 'spgl',
      searchVal: '',
      tableData: [
        /* {
          avatar: '',
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          order: 1,
          hotRecommend: 1,
          carRecommend: 1,
          origin: '上海市普陀区真北路',
          data: '2019-08-18',
          format: '500g',
          goodStauts: '上架',
          taste_stock: [
            {taste: '榴莲味', stock: 1000, sales: 1000},
            {taste: '牛奶味', stock: 1000, sales: 1000},
            {taste: '巧克力味', stock: 1000, sales: 1000}
          ],
          typeEffect: ['减脂', '塑形']
        } */
      ],
      total: 1,
      multipleSelection: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    search () {
      // ..
    },
    newGoods () {
      this.$emit('toggle-component', 'newGoods')
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.spglList.toggleRowSelection(row)
        });
      } else {
        this.$refs.spglList.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleClick (row) {
      console.log('TCL: handleClick -> row', row)
    },
    deleteClick (row) {
      console.log(row)
    },
    handleSizeChange () {
      // ..
    },
    handleCurrentChange () {
      // ..
    },
    getData () {
      this.$get('/content/goods/get_goods')
      .then(res => {
        if (res.message === 'ok') {
          this.total = res.data.count
          let result = res.data.data
          this.tableData = result.map((item, i) => {
            return {
              id: item.goods_id,
              avatar: item.avatar || '',
              title: item.title,
              order: item.order,
              hotRecommend: item.main,
              carRecommend: item.cart,
              origin: item.origin || '',
              data: item.data || '',
              format: item.format || '',
              goodState: item.state ? state_obj[item.state] : '',
              taste_stock: item.goods_detail.map(s_item => {
                return {
                  taste: s_item.standard,
                  stock: s_item.inventory,
                  sales: s_item.sales
                }
              }),
              typeEffect: ['减脂', '塑形']
            }
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
  .spgl-list {
    .spgl-list__expand {
      width: 250px;
      .expand-body .expand-body__item,
      .expand-header {
        display: grid;
        grid-template-columns: 1fr 1fr;
        line-height: 40px;
      }
    }
    .spgl-list__search {
      display: flex;
      align-items: center;
      background: #fff;
      padding: 25px;
      margin-bottom: 10px;
      white-space: nowrap;
      justify-content: space-between;
      .search__input {
        margin-right: 20px;
      }
    }
    .spgl-list--img {
      display: inline-block;
      width: 50px;
      height: 50px;
    }
  }

</style>

<style lang="less">

</style>
