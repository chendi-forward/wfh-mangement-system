import echarts from 'echarts'
import 'echarts/map/js/china'

export default {
  data() {
    return {
      chinaData: [{
        name: "北京",
        value: 0
      },
      {
        name: "天津",
        value: 0
      },
      {
        name: "上海",
        value: 0
      },
      {
        name: "重庆",
        value: 0
      },
      {
        name: "河北",
        value: 0
      },
      {
        name: "河南",
        value: 0
      },
      {
        name: "云南",
        value: 0
      },
      {
        name: "辽宁",
        value: 0
      },
      {
        name: "黑龙江",
        value: 0
      },
      {
        name: "湖南",
        value: 0
      },
      {
        name: "安徽",
        value: 0
      },
      {
        name: "山东",
        value: 0
      },
      {
        name: "新疆",
        value: 0
      },
      {
        name: "江苏",
        value: 0
      },
      {
        name: "浙江",
        value: 0
      },
      {
        name: "江西",
        value: 0
      },
      {
        name: "湖北",
        value: 0
      },
      {
        name: "广西",
        value: 0
      },
      {
        name: "甘肃",
        value: 0
      },
      {
        name: "山西",
        value: 0
      },
      {
        name: "内蒙古",
        value: 0
      },
      {
        name: "陕西",
        value: 0
      },
      {
        name: "吉林",
        value: 0
      },
      {
        name: "福建",
        value: 0
      },
      {
        name: "贵州",
        value: 0
      },
      {
        name: "广东",
        value: 0
      },
      {
        name: "青海",
        value: 0
      },
      {
        name: "西藏",
        value: 0
      },
      {
        name: "四川",
        value: 0
      },
      {
        name: "宁夏",
        value: 0
      },
      {
        name: "海南",
        value: 0
      },
      {
        name: "台湾",
        value: 0
      },
      {
        name: "香港",
        value: 0
      },
      {
        name: "澳门",
        value: 0
      },
      {
        name: '南海诸岛',
        value: 0
      }
      ],
      dataTotal: 0,
      sortChinaData: []
    }
  },
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
            return params.name + "：" + params.data["value"] + '<br />' + '排名：' + (35 - params.dataIndex)
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
            color: ['#FFE4E1', "#FA8072", "#FF0000", "#A52A2A", "#B22222", "#8B0000"]
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