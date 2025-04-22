<template>
  <div id="echarts" ref="echartContainer"></div>
</template>
<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';

// 获取 echart 挂载的DOM节点
const echartContainer = ref()
const lineEchart = ref<any>(null)
// 通过 inject 接收 Echarts
const Echarts = inject('$echarts')
const base = +new Date(2021, 1, 1);
const oneDay = 24 * 3600 * 1000;
const date: Date[] = [];
const xData:any = [];
let now:any = new Date(base);
function addData(shift:boolean) {
  now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/');
  date.push(now);
  xData.push((Math.random() - 0.4) * 10 + (xData.length == 0 ? Math.random() * 150: xData[xData.length - 1]));
  
  now = new Date(+new Date(now) + oneDay);
}
for (let i = 1; i < 20; i++) {
  addData(false);
}

function Eq(r:any, t:any) {
    const n:any = document.createElement("canvas").getContext("2d");
    return n.font = `${t}px sans-serif`,
    n.measureText(r).width
}

let M = function(W:any, F:any) {
    const G = F.coord([F.value(0), F.value(1)])
      , q = []
      , fe = 12
      , ke = 10
      , ue = `$0.001282/$1.28M`
      , Z = Eq(ue, fe) + ke;
    return q.push({
        type: "rect",
        shape: {
            x: G[0] - Z + 5,
            y: G[1] - 35,
            width: Z,
            height: 20
        },
        style: {
            text: ue,
            textFill: "#fff",
            fill: "#2DBE87",
            fontSize: fe,
            textAlign: "center",
            textVerticalAlign: "middle"
        }
    }),
    {
        type: "group",
        children: q
    }
};

const initEcharts = () => {
  lineEchart.value = (Echarts as any).init(echartContainer.value,null,{ renderer: 'svg' })
  const options = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '1%',
      right: '1%',
      top: '3%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: date,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        textStyle: {
          color: '#999',
        }
      },
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: false,
      },
      splitLine: {
        show:false,
        lineStyle: {
          type: "dotted"
        }
      },
      axisLabel: {
        show: false,
      },
      axisLine:{
        show: false
      }
    },
    series: [
      {
        type: 'line',
        data: xData,
        smooth: true,
        symbolSize: 0,
        lineStyle: {
          width: 2,
          color: "#92FE9D",
          shadowBlur: 8
        },
        z: 1
      }, {
        type: "custom",
        renderItem: M,
        data: [[date.at(-1),xData.at(-1)]],
        silent: true,
        z: 4
      },{
        type: "effectScatter",
        data: [[date.at(-1),xData.at(-1)]],
        coordinateSystem: "cartesian2d",
        symbolSize: 10,
        silent: true,
        itemStyle: {
            color: "#92FE9D"
        },
        rippleEffect: {
            number: 1,
            scale: 2.5,
            period: 1.2
        },
        z: 4
      }
    ]
  };

  lineEchart.value.setOption(options)
}

const resizeChart = () => {
  if (lineEchart.value.value) {
    lineEchart.value.value.resize()
  }
}


onMounted(()=>{
  initEcharts()
    // 图表
  setInterval(function () {
    addData(true);
    lineEchart.value.setOption({
      xAxis: {
        data: date
      },
      series: [{
        data: xData,
      }, {
        type: "custom",
        renderItem: M,
        data: [[date.at(-1),xData.at(-1)]],
        silent: true,
        z: 4
      },{
        type: "effectScatter",
        data: [[date.at(-1),xData.at(-1)]],
        coordinateSystem: "cartesian2d",
        symbolSize: 10,
        silent: false,
        itemStyle: {
            color: "#92FE9D"
        },
        rippleEffect: {
            number: 1,
            scale: 2.5,
            period: 1.2
        },
        z: 2
      }]
    });
  }, 5000);
})

window.addEventListener('resize', resizeChart);
</script>
<style>
#echarts{
  width: 100%;
  height: 800px;
  background-color: #000;
}
</style>