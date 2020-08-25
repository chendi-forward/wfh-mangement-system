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
            prop="order_id"
            align='center'
            label="订单编号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="user_id"
            label="用户ID"
            align='center'
            width="100">
          </el-table-column>
          <el-table-column
            prop='nickname'
            label="昵称"
            align='center'
            min-width="80">
          </el-table-column>
          <el-table-column
            prop='wechat_id'
            align='center'
            label="微信交易号"
            width="100">
          </el-table-column>
          <el-table-column
            prop='order_state'
            align='center'
            label="状态">
          </el-table-column>
          <el-table-column
            prop='order_time'
            align='center'
            label="订单生成时间"
            width="150">
          </el-table-column>
          <el-table-column
            prop='pay_time'
            label="付款时间"
            align='center'
            width="100">
          </el-table-column>
          <el-table-column
            prop='deliver_time'
            label="发货时间"
            align='center'
            width="100">
          </el-table-column>
          <el-table-column
            prop='confirm_time'
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
            prop="goods_title"
            align='center'
            label="商品名称">
          </el-table-column>
          <el-table-column
            prop="taste"
            label="口味/规格"
            align='center'>
          </el-table-column>
          <el-table-column
            prop='count'
            label="数量"
            align='center'>
          </el-table-column>
          <el-table-column
            prop='original_price'
            align='center'
            label="实付总额">
          </el-table-column>
          <el-table-column
            prop='rebate'
            align='center'
            label="返利">
          </el-table-column>
          <el-table-column
            prop='coupon_rebate'
            align='center'
            label="优惠券返利">
          </el-table-column>
          <el-table-column
            prop='active_rebate'
            align='center'
            label="活动返利">
          </el-table-column>
          <el-table-column
            prop='rebate_money'
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
          <p><span class="name">收件人</span><span class="value">{{addressee_info.recipient}}</span></p>
          <p><span class="name">联系电话</span><span class="value">{{addressee_info.recipient_tel}}</span></p>
          <p><span class="name">收货地址</span><span class="value">{{addressee_info.address}}</span></p>
        </div>
      </div>
      <div class="spgl-item">
        <div class="spgl-item--title">开票详情</div>
        <div class="spgl-item--content">
          <p><span class="name">发票类型</span><span class="value">{{invoice_info.is_e_invoice?'电子发表':'公司发票'}}</span></p>
          <p><span class="name">发票抬头</span><span class="value">{{invoice_info.invoice_title}} <span v-if="invoice_info.tin_number">（{{invoice_info.tin_number}}）</span> </span></p>
          <p><span class="name">邮箱/邮寄地址</span><span class="value">{{invoice_info.recipient_address}}</span></p>
          <p><span class="name">联系电话</span><span class="value">{{invoice_info.recipient_tel}}</span></p>
        </div>
      </div>
      <!-- TODO 根据订单状态判断是否显示物流信息 -->
      <div class="spgl-item">
        <div class="spgl-item--title">物流信息</div>
        <div class="spgl-item--content">
          <p><span class="name">物流公司</span><span class="value">{{express_info.express_name}}</span></p>
          <p><span class="name">物流单号</span><span class="value">{{express_info.express_number}} &nbsp;&nbsp;&nbsp;
            <el-button type="danger" size="mini" plain @click="trace">追踪</el-button></span>
          </p>
          <p><span class="name">运费</span><span class="value">{{express_info.postage}}</span></p>
          <p><span class="name">备注</span><span class="value">{{express_info.remark}}</span></p>
        </div>
      </div>
    </div>
    <div class="commom-card flex-item-center handle">
      <el-button size="small" @click="goBack">返回列表</el-button>
      <div>
        <el-button type="danger" size="small" @click="editHandle" v-if="tableData1[0].order_state==='已付款'">发货</el-button>
        <el-button size="small" @click='cancleItem' v-if="tableData1[0].order_state==='未付款'">取消订单</el-button>
      </div>
    </div>
    <dialog-Com v-model='dialogFlag' :title='currentCom.name' @sure-save='sureSave' @cancle-save='cancleSave' :isShowFooter="currentCom.showBtn">
      <component :is="currentCom.com" :data="currentCom.data" :dialogFlag="dialogFlag"></component>
    </dialog-Com>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.less" lang="less" scoped>

</style>
