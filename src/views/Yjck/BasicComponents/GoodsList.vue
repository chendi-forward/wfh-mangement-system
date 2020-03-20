<template>
  <div class="goods--list">
    <div class="goods--item" v-for="(goods, index) in goodsList" :key="index">
      <img class="goods--item__img" :src="goods.avatar" />
      <div class="goods--item__info">
        <div class="goods--item__id goods--item__inner">{{goods.user_id}}</div>
        <div class="goods--item__name goods--item__inner">{{goods.goods_title}}</div>
        <div class="goods--item__number goods--item__inner">{{goods.real_price | thousand_tranf}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goods-list',
  data () {
    return {
      goodsList: [
        {
          img: '',
          id: '123123',
          name: 'wfh三分法蛋白粉',
          number: 2000
        },
        {
          img: '',
          id: '12323',
          name: 'wfh三分法蛋白粉',
          number: 2000
        },
        {
          img: '',
          id: '1233',
          name: 'wfh三分法蛋白粉',
          number: 2000
        },
        {
          img: '',
          id: '1211233',
          name: 'wfh三分法蛋白粉',
          number: 2000
        }
      ]
    }
  },
  filters: {
    thousand_tranf: function (value) {
      value = String(value)
      if (value.length > 3) {
        let reg = /(?=(?!\b)(\d{3})+$)/g
        return value.replace(reg, ',')
      } else {
        return value
      }
    }
  },
  mounted () {
    this.getSaleData()
  },
  methods: {
    //  获取销售列表
    getSaleData() {
        this.$get('/home/order_list_show').then(res => {
            this.goodsList = res.data
        })
    },
  }
}
</script>

<style lang="less" scoped>
  .goods--list {
    height: 225px;
    overflow-y: auto;
    .goods--item {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      &:first-of-type {
        padding-top: unset;
      }
      &:last-of-type {
        padding-bottom: unset;
      } 
      .goods--item__img {
        display: inline-block;
        width: 55px;
        height: 47px;
        margin-right: 35px;
        background-color: #f7f8f9;
      }
      .goods--item__info {
        flex: 1;
        display: flex;
        background-color: #f7f8f9;
        padding: 0 20px;
        .goods--item__inner {
          overflow-wrap: break-word;
          padding: 5px;
        }
        .goods--item__id {
          width: 25%;
        }
        .goods--item__number {
          width: 45%;
        }
        .goods--item__number {
          flex: 1;
          text-align: end;
        }
      }
    }
  }
</style>
