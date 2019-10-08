<template>
  <div class="yhqgl-hdb">
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
				width="150">
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
				width="140">
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
				label="起始时间">
				<template slot-scope="scope">{{ scope.row.s_time }}</template>
			</el-table-column>
			<el-table-column
				align='center'
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
				width="160">
				<template slot-scope="scope">
					<el-button type="primary" class="definition-btn" icon="el-icon-edit" @click='editHandle(scope.row)'></el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="ssxd-footer">
      <div class="selectAll-wrap">
        <el-button size="mini" @click="offOnline">下线</el-button>
      </div>
      <div class="page-wrap">
        <my-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total="400">
        </my-pagination>
      </div>
    </div>
		<div class="hdb-xxzx">
			<div class="xxzx-title">消息中心</div>
			<div class="xxzx-content">
				<div class="content-item">
					<span>短信提醒设置</span>
					<el-button icon="el-icon-edit"></el-button>
				</div>
				<div class="content-item">
					<span>微信服务设置</span>
					<el-button icon="el-icon-edit"></el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Pagination from 'COMPONENTS/Pagination'

	export default {
		name: 'yhqgl-hdb',
		components: {
    	'my-pagination': Pagination
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
				]
			}
		},
		methods: {
			handleSelectionChange () {
				// ..
			},
			handleSizeChange () {},
			handleCurrentChange () {},
			offOnline () {},
			editHandle () {
				this.$router.push({
					path: '/yxmk-cjyhq',
					query: 'hdb'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.hdb-xxzx {
		width: 400px;
		margin-top: 15px;
		background-color: #fff;
		border-radius: 6px;
		.xxzx-title {
			height: 64px;
			line-height: 64px;
			padding: 0 20px;
			border-radius: 6px 6px 0 0;
			font-size: 20px;
			background-color: #f7f8f9;
		}
		.xxzx-content {
			.content-item {
				position: relative;
				height: 70px;
				line-height: 70px;
				padding: 0 20px;
				border-bottom: 1px solid #eaeced;
				button {
					position: absolute;
					right: 25px;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
	}
</style>
