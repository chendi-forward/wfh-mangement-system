<template>
  <div class="find">
    <el-tabs type="border-card">
      <el-tab-pane label="活动公告"></el-tab-pane>
      <el-tab-pane label="品牌简介"></el-tab-pane>
      <el-tab-pane label="新手入门">
        <div class="newMan-content">
          <div class="con-num">
            共22条
          </div>
          <div class="con-search">
            <el-input
              placeholder="请输入历史内容关键字..."
              v-model="newSearch">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button type="danger">搜索</el-button>
          </div>
          <div class="con-new">
            <el-button type="danger">新建</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="草稿箱"></el-tab-pane>
    </el-tabs>
    <div class="table-content">
      <el-table
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
          label="内容"
          min-width='340'>
          <template slot-scope="scope">
            <div class="con-box">
              <div class="con-img">
                <img :src="scope.row.img" alt="">
              </div>
              <div class="con-text">
                {{ scope.row.text }}
              </div>
            </div>
        </template>
        </el-table-column>
        <el-table-column
          prop="label"
          label="标签类别">
        </el-table-column>
        <el-table-column
          prop="time"
          label="发布时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop='status'
          label="状态"
          width="50">
        </el-table-column>
        <el-table-column
          width="150"
          label="排序">
          <div class="order-con">
            <el-button
              size="mini"
              type="danger"
              @click="handleEdit(scope.$index, scope.row)">上移</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">下移</el-button>
          </div>
        </el-table-column>
        <el-table-column label="操作" width="86">
          <div class="con-icon">
            <i class="el-icon-edit"></i>
            <i class="el-icon-delete"></i>
          </div>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-footer">
      <el-checkbox label="全选"></el-checkbox>
      <el-button>批量删除</el-button>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import befautify from './timg.jpg'
  import befautify1 from 'ASSETS/image/timg (1).jpg'
  import befautify2 from 'ASSETS/image/timg (2).jpg'
  import befautify3 from 'ASSETS/image/timg (3).jpg'
  export default {
    name: 'fxy',
    data () {
      return {
        currentPage4: 1,
        newSearch: null, // 新手入门的搜索关键字
        tableData: [{
          img: befautify,
          text: '新品来袭，震撼上市',
          label: '新品推广',
          time: '2019-05-03 17:33:33',
          status: '显示',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          img: befautify1,
          text: '新品来袭，震撼上市',
          label: '新品推广',
          time: '2019-05-03 17:33:33',
          status: '显示',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          img: befautify2,
          text: '新品来袭，震撼上市',
          label: '新品推广',
          time: '2019-05-03 17:33:33',
          status: '显示',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          img: befautify3,
          text: '新品来袭，震撼上市',
          label: '优惠活动',
          time: '2019-05-03 17:33:33',
          status: '显示',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      handleDelete () {},
      handleEdit () {},
      handleSelectionChange () {},
      handleSizeChange () {},
      handleCurrentChange () {}
    }
  }
</script>

<style lang="less">

.el-tabs--border-card {
  box-shadow: none;
}

.find {
  width: 100%;
  height: 100%;
  .el-tabs {
    height: 180px;
    .el-tabs__header  {
      height: 60px;
      line-height: 60px;
      .el-tabs__nav {
        .is-active {
          border: none;
          background: #FF4B57;
          border-radius: 6px 6px 0 0;
          color: #fff;
        }
      }
    }
    .el-tabs__item {
      height: 60px;
      line-height: 60px;
      width: 170px;
      color: #363F51;
      text-align: center;
    }
    .el-tabs__content {
      height: 90px;
      .el-tab-pane {
        height: 100%;
        .newMan-content {
          height: 100%;
          display: flex;
          // justify-content: center;
          align-items: center;
          .con-num {
            width: 50px;
          }
          .con-search {
            flex: 1;
            margin-left: 50px;
            display: flex;
            // justify-content: center;
            align-items: center;
            .el-input {
              width: 400px;
              height: 40px;
              margin-right: 30px;
            }
            .el-button {
              width: 70px;
              height: 30px;
              padding: 0;
            }
          }
          .con-new {
            .el-button {
              padding: 0;
            }
            button {
              background: #fe3a56;
              width: 70px;
              height: 30px;
              font-size: 15px;
            }
          }
        }
      }
    }
  }
  .table-content {
    width: 100%;
    // height: calc(~'100% - 180px');
    margin-top: 20px;
    border-radius: 6px;
    // padding: 10px;
    background: #fff;
    .el-table {
      border-radius: 6px;
    }
    .con-icon {
      font-size: 20px;
      i {
        margin-left: 3px;
      }
      .el-icon-edit {
        color: #FF4B57;
      }
    }
    .order-con {
      padding: 0;
      display: flex;
      .el-button {
        width: 65px;
        height: 30px;
        padding: 0;
        border: 1px solid rgba(255, 75, 87, 1);
        color: #FF4B57;
        background: rgba(255, 224, 226, 1);
      }
    }
    .el-table {
      td {
        border: none;
      }
    }
    .con-box {
      width: 100%;
      display: flex;
      align-items: center;
    }
    .con-img {
      width: 170px;
      height: 80px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .con-text {
      margin-left: 10px;
      width: 180px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .table-footer {
    width: calc(~'100% - 20px');
    height: 120px;
    border-radius: 0 0 6px 6px;
    background: #fff;
    margin-top: 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    position: relative;
    .el-button {
      width: 80px;
      height: 30px;
      padding: 0;
    }
    .el-pagination {
      position: absolute;
      right: 10px;
    }
  }
}

</style>
