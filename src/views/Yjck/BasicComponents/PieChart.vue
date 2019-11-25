<template>
  <div class="pie-chart">
    <div class="pie-chart--item">
      <canvas :id="'pieChart_' + item.id" width="100" height="100"></canvas>
    </div>
    <div class="text-center">{{ item.name }}</div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "pie-chart",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  mounted () {
    let pieChart = document.getElementById(`pieChart_${this.item.id}`)
    let ctx = pieChart.getContext('2d')

    ctx.beginPath()
    ctx.strokeStyle = '#96a1b6'
    ctx.arc(50, 50, 35, 0, 2 * Math.PI, false)
    ctx.stroke()

    ctx.beginPath()
    ctx.strokeStyle = '#363f51'
    ctx.lineWidth = 6
    ctx.arc(50, 50, 38, -0.5 * Math.PI, 0.3 * Math.PI, false)
    ctx.stroke()

    ctx.font = '20px sans-serif'
    ctx.fillText('25%', 35, 57)
  }
}
</script>

<style lang="less" scoped>
.pie-chart {
  transform: translateY(-27px);
}
.pie-chart--item {
  width: 100px;
  height: 100px;
  margin: 0 auto;
}
</style>