<template>
  <div class="yjck">
    <div class="header space-divide">
      <div class="header-item divide-item" v-for="(item, i) in titleList" :key="i">
        <div class="header-item__number text-center">{{ item.number | thousand_tranf }}</div>
        <div class="header-item__name text-center">{{ item.name }}</div>
      </div>
    </div>
    <div class="body">
      <div class="body-left">
        <div class="body-leftTop">
          <div class="body-leftTop--select">
            <el-select v-model="selectDay" placeholder="请选择...">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <div class="form--dateSelect">
              <el-date-picker
                popper-class="data-input"
                v-model="effectiveDate_s"
                type="datetime"
                placeholder="选择时间..."
              ></el-date-picker>
              <div style="width: 20px; display: flex; align-items: center; justify-content: center">
                <div class="date-throught"></div>
              </div>
              <el-date-picker
                popper-class="data-input"
                v-model="effectiveDate_e"
                type="datetime"
                placeholder="选择时间..."
              ></el-date-picker>
              <div class="select-btn">
                <el-button type="success" size='small'>查找</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="body-leftBottom">
          <div class="body-leftBottom--title sub-title">销量趋势</div>
          <div class="body-leftBottom--content">
            <div id="xlqsChart"></div>
          </div>
        </div>
      </div>
      <div class="body-right">
        <div class="body-rightTop">
          <goods-list></goods-list>
        </div>
        <div class="body-rightBottom">
          <div class="body-rightBottom__left body-rightBottom--item">
            <number-statistics name='总订单数' :number= 'all_count'></number-statistics>
          </div>
          <div class="body-rightBottom__rigth body-rightBottom--item">
            <number-statistics name='总销售额' :number= 'all_money'></number-statistics>
          </div>
        </div>
      </div>
    </div>
    <div class="center space-divide">
      <div class="divide-item" v-for="(item, i) in pieChartList" :key="i">
        <pie-chart :item='item'></pie-chart>
      </div>
    </div>
    <div class="footer">
      <div class="footer-left">
        <div class="footer__head">
          <el-tabs class="footer__header--tabs" type="border-card" v-model="activeName1">
            <el-tab-pane label="用户地图" name="yhdt">
              <div id='yhdtMap' class="footer--map"></div>
              <map-legend class="footer__top"></map-legend>
            </el-tab-pane>
            <el-tab-pane label="销售地图" name="xsdt">
              <div id='xsdtMap' class="footer--map"></div>
              <map-legend class="footer__top"></map-legend>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="footer-right">
        <div class="footer__head">
          <el-tabs class="footer__header--tabs" type="border-card" v-model="activeName2">
            <el-tab-pane label="用户数" name="yhs">
              <div class="footer--list">
                <total-number class="footer--list__left footer--list__inner" :item-list='userInfo'></total-number>
                <total-number class="footer--list__left footer--list__inner" :item-list='vipClass'></total-number>
              </div>
            </el-tab-pane>
            <el-tab-pane label="新增人数" name="xzrs">
              <div class="footer--list">
                <total-number class="footer--list__left footer--list__inner" :item-list='userInfo'></total-number>
                <total-number class="footer--list__left footer--list__inner" :item-list='vipClass'></total-number>
              </div>
            </el-tab-pane>
            <el-tab-pane label="活跃人数" name="hyrs">
              <active-people class="footer--list__left footer--list__inner" :item-list='activePeople'></active-people>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script src='./script.js'>
</script>

<style lang="less" scoped>
  .header {
    .header-item__number {
      font-size: 30px;
      color: #363F51;
    }
    .header-item__name {
      font-size: 16px;
    }
  }
  .body {
    margin-top: 15px;
    display: grid;
    grid-column-gap: 15px;
    grid-template-columns: 7fr 5fr;
    .body-leftTop,
    .body-leftBottom,
    .body-rightTop {
      background-color: #fff;
      margin-bottom: 15px;
    }
    .body-leftTop {
      padding: 20px 30px;
      .el-select {
        width: 120px;
        & /deep/ .el-input__inner {
          text-align: start;
        }
      }
      .body-leftTop--select {
        display: flex;
        justify-content: space-between;
        .form--dateSelect {
          width: 400px;
          display: flex;
          justify-content: space-between;
        }
        .select-btn {
          margin: 0 20px;
          line-height: 40px;
        }
      }
      .date-throught {
        height: 2px;
        background-color: #363f51;
        width: 70%;
      }
    }
    .body-leftBottom {
      .body-leftBottom--content {
        height: 273px;
      }
      #xlqsChart {
        height: 100%;
      }
    }
    .body-rightTop {
      height: 285px;
      padding: 30px;
    }
    .body-rightBottom {
      display: grid;
      grid-column-gap: 15px;
      grid-template-columns: 1fr 1fr;
      height: 130px;
      margin-bottom: 15px;
      .body-rightBottom--item {
        background-color: #fff;
        padding: 30px 20px;
      }
    }
  }
  .center {
    height: 150px;
  }
  .space-divide {
    display: flex;
    background-color: #fff;
    padding: 40px;
    justify-content: space-around;
    .divide-item {
      width: 20%;
      border-right: 1px solid #96a1b6;
      &:last-of-type {
        border-right: unset;
      }
    }
  }
  .footer {
    margin-top: 15px;
    display: grid;
    grid-column-gap: 15px;
    grid-template-columns: 7fr 5fr;
    .footer__header--tabs {
      box-shadow: unset;
      & /deep/ .el-tabs__item {
        width: auto;
      }
    }
    .footer--map,
    .footer--list {
      height: 410px;
    }
    .footer--list {
      display: grid;
      grid-column-gap: 20px;
      grid-template-columns: 1fr 1fr;
      padding: 30px;
    }
    .el-tab-pane {
      position: relative;
    }
  }
</style>
<style lang="less">
  .data-input {
    .el-button--text {
      display: none;
    }
  }
</style>
