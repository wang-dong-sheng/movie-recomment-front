<template>
  <div>
    <!-- 添加一个容器用于显示图表 -->
    <div id="userChart" style="width: 600px; height: 400px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import fetch from '@/api/fetch'

export default {
  name: 'Analysis',
  data() {
    return {
      analysisData: []
    }
  },
  mounted() {
    this.getAnalysisData()
  },
  methods: {
    getAnalysisData() {
      // 构造最近6个月的数据
      const analysisVoList = []
      const currentDate = new Date()
      
      for (let i = 0; i < 6; i++) {
        const date = new Date(currentDate)
        date.setMonth(date.getMonth() - i)
        analysisVoList.push({
          year: date.getFullYear(),
          month: date.getMonth() + 1
        })
      }

      fetch.getAnalysis(analysisVoList).then((res) => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            // 按时间正序排序
            this.analysisData = res.data.data.sort((a, b) => {
              if (a.year !== b.year) return a.year - b.year
              return a.month - b.month
            })
            this.initChart()
          }
        }
      })
    },
    initChart() {
      const chartDom = document.getElementById('userChart')
      const myChart = echarts.init(chartDom)
      
      // 处理数据
      const months = this.analysisData.map(item => `${item.year}-${item.month}`)
      const rates = this.analysisData.map(item => (item.rate * 100).toFixed(2))
      
      const option = {
        title: {
          text: '推荐转化率'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{b}: {c}%'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: months,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value}%'
            }
          }
        ],
        series: [
          {
            name: '比例',
            type: 'bar',
            barWidth: '60%',
            data: rates
          }
        ]
      }

      option && myChart.setOption(option)
    }
  }
}
</script>

<style scoped>
</style>