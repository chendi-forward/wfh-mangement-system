<template>
  <div class="yxmk-hdbgl">
    <yxmk-head></yxmk-head>
    <div class="yhqgl-body">
      <div class="yhqgl-body__head">
        <div class="body__head--title">活动表</div>
        <div class="body__head--btn"><el-button size="small" type="success" @click="showCreateItem">创建</el-button></div>
      </div>
      <div class="yhqgl-body__content">
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
            label="活动编号"
            align='center'
            width="120">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column
            align='center'
            width="150"
            label="活动名称">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column
            align='center'
            label="数量"
            width="90">
            <template slot-scope="scope">{{ scope.row.number }}</template>
          </el-table-column>
          <el-table-column
            align='center'
            label="折扣比例（%）"
            width="120">
            <template slot-scope="scope">{{ scope.row.percent }}</template>
          </el-table-column>
          <el-table-column
            align='center'
            label="扣减金额（元）"
            width="140">
            <template slot-scope="scope">{{ scope.row.money }}</template>
          </el-table-column>
          <el-table-column
            align='center'
            min-width="170"
            label="起始时间">
            <template slot-scope="scope">{{ scope.row.s_time }}</template>
          </el-table-column>
          <el-table-column
            align='center'
            min-width="170"
            label="结束时间">
            <template slot-scope="scope">{{ scope.row.e_time }}</template>
          </el-table-column>
          <el-table-column
            align='center'
            label="状态"
            width="80">
            <template slot-scope="scope">{{ scope.row.state }}</template>
          </el-table-column>
          <el-table-column
            label="操作"
            align='center'
            width="120">
            <template slot-scope="scope">
              <el-button type="primary" class="definition-btn" icon="el-icon-edit" @click='editHandle(scope.row)'></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="ssxd-footer">
          <div class="selectAll-wrap">
            <el-button size="mini" @click="offOnline">删除</el-button>
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
    </div>
    <div class="yxmk-setting" v-if='isShowSetting'>
      <hdb-setting @hide-setting="hideSetting"></hdb-setting>
    </div>
	</div>
</template>

<script>
	import Pagination from 'COMPONENTS/Pagination'
  import YxmkHead from './CommonComponents/YxmkHead'
  import HdbSetting from './YxmkSetting/HdbSetting'

	export default {
		name: 'yxmk-hdb',
		components: {
      'yxmk-head': YxmkHead,
      'my-pagination': Pagination,
      'hdb-setting': HdbSetting
  	},
		data () {
			return {
				tableData: [
					{
						id: 123123123,
						name: '撒旦法see发涩费',
						number: 12123,
						percent: 10,
						money: 1000,
						s_time: '2019-09-20 12:21:00',
						e_time: '2019-09-20 12:12:00',
						state: '已停用'
					},
					{
						id: 123123123,
						name: '撒旦法see发涩费',
						number: 12123,
						percent: 10,
						money: 1000,
						s_time: '2019-09-20 12:21:00',
						e_time: '2019-09-20 12:12:00',
						state: '已停用'
					}
        ],
        isShowSetting: false
			}
		},
		methods: {
      showCreateItem () {
        this.isShowSetting = true
      },
			handleSelectionChange () {
				// ..
      },
      hideSetting () {
        this.isShowSetting = false
      },
			handleSizeChange () {},
			handleCurrentChange () {},
			offOnline () {},
			editHandle (row) {
        this.showCreateItem()
			}
		}
	}
</script>

<style lang="less" scoped>
.yxmk-hdbgl {
  position: relative;
  .yhqgl-body,
  .yhqgl-footer {
    .yhqgl-body__head {
      height: 65px;
      line-height: 65px;
      background-color: #f7f8f9;
      display: flex;
      padding: 0 30px 0 45px;
      border-radius: 6px 6px 0 0;
      .body__head--title {
        flex: 1;
      }
    }
  }
  .yhqgl-body {
    margin-bottom: 15px;
  }
  .yxmk-setting {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    background-color: #f1f3f5;
    // z-index: 3;
  }
}
</style>
