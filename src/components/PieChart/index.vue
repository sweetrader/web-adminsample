<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

let vue = null

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    chartName: {
      type: String,
      default: ''
    },
    chartData: {
      type: Array,
      default: function() {
        return []
      }
    },
    initFunction: {
      type: Function,
      default: function() {
        return this.initChart
      }
    },
    clickFunction: {
      type: Function,
      default: function(val, id) { }
    }
  },
  data() {
    return {
      vue,
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      const cdData = []

      for (let i = 0; i < this.chartData.length; i++) {
        if (this.chartData[i].mchtCd) {
          cdData.push(this.chartData[i].mchtCd)
        }
      }

      const legendData = []

      for (let i = 0; i < this.chartData.length; i++) {
        if (this.chartData[i].cntName) {
          legendData.push(this.chartData[i].cntName)
        } else {
          legendData.push(this.chartData[i].mchtNm)
        }
      }

      const valueData = []

      for (let i = 0; i < this.chartData.length; i++) {
        if (this.chartData[i].pitCnt) {
          valueData.push({
            value: this.chartData[i].pitCnt,
            name: this.chartData[i].mchtNm
          })
        } else if (this.chartData[i].pitSum) {
          valueData.push({
            value: this.chartData[i].pitSum,
            name: this.chartData[i].mchtNm
          })
        } else if (this.chartData[i].custCnt) {
          valueData.push({
            value: this.chartData[i].custCnt,
            name: this.chartData[i].mchtNm
          })
        } else if (this.chartData[i].cntName) {
          valueData.push({
            value: this.chartData[i].cntValue,
            name: this.chartData[i].cntName
          })
        }
      }

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: legendData
        },
        series: [
          {
            id: cdData,
            name: this.chartName,
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: valueData,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })

      vue = this
      this.chart.on('click', function(event) {
        const data = event.seriesId.split(',')
        vue.clickFunction(event, data[event.dataIndex])
      })
    }
  }
}
</script>
