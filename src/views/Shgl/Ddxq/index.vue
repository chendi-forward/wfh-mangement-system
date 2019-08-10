<template>
  <div class="ddxq">
    <div class="spgl-item line-item">
      <div class="spgl-item--title">订单详情</div>
      <div class="spgl-item--content">
        <el-table
        ref="multipleTable"
        stripe
        align='center'
        :data="tableData1"
        tooltip-effect="dark"
        style="width: 100%">
          <el-table-column
            prop="user_id"
            align='center'
            label="订单编号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="用户ID"
            align='center'
            width="100">
          </el-table-column>
          <el-table-column
            prop='add_time'
            label="昵称"
            align='center'
            min-width="80">
          </el-table-column>
          <el-table-column
            prop='gender'
            align='center'
            label="微信交易号"
            width="100">
          </el-table-column>
          <el-table-column
            prop='province'
            align='center'
            label="状态">
          </el-table-column>
          <el-table-column
            prop='level'
            align='center'
            label="订单生成时间"
            width="150">
          </el-table-column>
          <el-table-column
            prop='balance'
            label="付款时间"
            align='center'
            width="100">
          </el-table-column>
          <el-table-column
            prop='invite_code'
            label="发货时间"
            align='center'
            width="100">
          </el-table-column>
          <el-table-column
            prop='order'
            label="确认收货时间"
            align='center'
            width="120">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="spgl-item">
      <div class="spgl-item--title">货品详情</div>
      <div class="spgl-item--content flex-item-center">
        <el-table
        ref="multipleTable"
        stripe
        align='center'
        :data="tableData2"
        tooltip-effect="dark"
        style="width: 100%">
          <el-table-column
            prop="user_id"
            align='center'
            label="商品名称">
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="口味/规格"
            align='center'>
          </el-table-column>
          <el-table-column
            prop='add_time'
            label="数量"
            align='center'>
          </el-table-column>
          <el-table-column
            prop='gender'
            align='center'
            label="实付总额">
          </el-table-column>
          <el-table-column
            prop='province'
            align='center'
            label="返利类目">
          </el-table-column>
          <el-table-column
            prop='level'
            align='center'
            label="返利总额">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="grid-row-2 other-item">
      <div class="spgl-item">
        <div class="spgl-item--title">收货详情</div>
        <div class="spgl-item--content">
          <p><span class="name">收件人</span><span class="value">李大辉</span></p>
          <p><span class="name">联系电话</span><span class="value">18855862290</span></p>
          <p><span class="name">收货地址</span><span class="value">浙江省杭州市西湖区***街道*****路九横278号龙华大厦A座901</span></p>
        </div>
      </div>
      <div class="spgl-item">
        <div class="spgl-item--title">开票详情</div>
        <div class="spgl-item--content">
          <p><span class="name">发票类型</span><span class="value">电子发票</span></p>
          <p><span class="name">发票抬头</span><span class="value">杭州动力科技有限公司 （9M********************）</span></p>
          <p><span class="name">邮箱/邮寄地址</span><span class="value">浙江省杭州市西湖区***街道*****路九横278号龙华大厦A座901</span></p>
          <p><span class="name">联系电话</span><span class="value">18855862290</span></p>
        </div>
      </div>
      <!-- TODO 根据订单状态判断是否显示物流信息 -->
      <div class="spgl-item">
        <div class="spgl-item--title">物流信息</div>
        <div class="spgl-item--content">
          <p><span class="name">物流公司</span><span class="value">圆通快递</span></p>
          <p><span class="name">物流单号</span><span class="value">18855862290 &nbsp;&nbsp;&nbsp;
            <el-button type="danger" size="mini" plain @click="trace">追踪</el-button></span>
          </p>
          <p><span class="name">运费</span><span class="value">12元</span></p>
          <p><span class="name">备注</span><span class="value">已修改收货地址：浙江省杭州市浙江大学紫金校区南门</span></p>
        </div>
      </div>
    </div>
    <div class="commom-card flex-item-center handle">
      <el-button size="small" @click="goBack">返回列表</el-button>
      <div>
        <el-button type="danger" size="small" @click="editHandle">编辑</el-button>
        <el-button size="small" @click='cancleItem'>取消订单</el-button>
      </div>
    </div>
    <dialog-Com :dialogFlag='dialogFlag' :title='currentCom.name' @sure-save='sureSave' @cancle-save='cancleSave'>
      <component :is="currentCom.com"></component>
    </dialog-Com>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.less" lang="less" scoped>

</style>
