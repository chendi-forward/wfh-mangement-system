import echarts from 'echarts'
import 'echarts/map/js/china'

export default {
  methods: {
    chartMap(id) {
      let data = this.chinaData
      let yData = []
      data.sort((o1, o2) => {
        if (isNaN(o1.value) || o1.value == null) return -1
        if (isNaN(o2.value) || o2.value == null) return 1
        return o1.value - o2.value
      })
      for (var i = 0; i < data.length; i++) {
        yData.push(data[i].name)
      }
      let chartWrap = echarts.init(document.getElementById(id))
      this.option = {
        tooltip: {
          show: true,
          formatter: function (params) {
            return params.name + "：" + params.data["value"] + "%";
          }
        },
        visualMap: {
          type: "piecewise",
          text: ["高", "低"],
          showLabel: false,
          seriesIndex: [0],
          min: 0,
          max: 7,
          inverse: true,
          inRange: {
            color: ["#edfbfb", "#b7d6f3", "#40a9ed", "#3598c1", "#215096"]
          },
          textStyle: {
            color: "#000"
          },
          orient: 'horizontal',
          bottom: 30,
          left: 30
        },
        grid: {
          right: 10,
          top: 80,
          bottom: 30,
          width: "20%"
        },
        xAxis: {
          show: false
        },
        yAxis: {
          type: "category",
          data: yData,
          show: false
        },
        geo: {
          zoom: 0.75,
          map: "china",
          left: "left",
          right: "300",
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            borderColor: '#fff'
          }
        },
        series: [
          {
            name: "mapSer",
            type: "map",
            roam: false,
            geoIndex: 0,
            label: {
              show: false
            },
            data: data
          }
        ]
      }
      chartWrap.setOption(this.option)
    }
  }
}