//封装组件
<template>
  <div class="serpentine-steps-container">
    <svg :width="svgWidth" :height="svgHeight" ref="svg">
      <!-- 定义带有半圆弯曲的蛇形路径 -->
      <path
        :d="pathD"
        fill="none"
        stroke="#ccc"
        stroke-width="5"
        ref="path"
      ></path>

      <!-- 渲染步骤节点 -->
      <g v-for="(position, index) in stepPositions" :key="index">
        <circle
          :cx="position.x"
          :cy="position.y"
          r="15"
          :fill="getStepColor(index)"
        ></circle>
        <text
          :x="position.x"
          :y="position.y + 5"
          text-anchor="middle"
          fill="#fff"
        >
          {{ index + 1 }}
        </text>
        <text
          :x="position.x"
          :y="position.y + 35"
          text-anchor="middle"
          fill="#000"
        >
          {{ steps[index] }}
        </text>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "SerpentineSteps",
  props: {
    steps: {
      type: Array,
      required: true,
    },
    currentStep: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      svgWidth: "100%", // SVG 的宽度设置为 100%，自适应容器
      svgHeight: 100, // SVG 的高度，将根据步骤数量调整
      pathD: "", // 路径数据
      stepPositions: [], // 步骤节点的位置
      containerWidth: 0, // 容器的实际宽度
    };
  },
  mounted() {
    // 获取容器的实际宽度
    this.containerWidth = this.$el.clientWidth;
    this.drawPath();
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.containerWidth = this.$el.clientWidth;
      this.drawPath();
    },
    drawPath() {
      const stepCount = this.steps.length;
      const stepsPerLine = 3; // 每行的步骤数量，固定为2
      const horizontalMargin = Math.max(this.containerWidth * 0.1, 30); // 增加水平边距，至少为30
      const verticalSpacing = 0; // 垂直间距
      const radius = horizontalMargin; // 半圆的半径等于水平边距，确保弯曲部分不超出容器

      const startXLeft = horizontalMargin;
      const startXRight = this.containerWidth - horizontalMargin;
      const lineLength = startXRight - startXLeft;

      const lines = Math.ceil(stepCount / stepsPerLine);

      let pathD = "";
      this.stepPositions = [];

      for (let i = 0; i < lines; i++) {
        const isEvenLine = i % 2 === 0;
        const startX = isEvenLine ? startXLeft : startXRight;
        const endX = isEvenLine ? startXRight : startXLeft;
        const y = 50 + i * (verticalSpacing + radius * 2);

        // 绘制水平直线
        if (i === 0) {
          pathD += `M ${startX},${y}`;
        } else {
          // 添加半圆弯曲连接
          const arcSweep = isEvenLine ? 0 : 1;
          pathD += ` A ${radius},${radius} 0 0,${arcSweep} ${startX},${y}`;
        }
        pathD += ` L ${endX},${y}`;

        // 计算该行上的步骤节点
        const stepsOnThisLine = Math.min(
          stepsPerLine,
          stepCount - i * stepsPerLine
        );

        for (let j = 0; j < stepsOnThisLine; j++) {
          const t = j / (stepsOnThisLine - 1);
          const x = startX + (endX - startX) * t;
          this.stepPositions.push({ x, y });
        }
      }

      this.pathD = pathD;

      // 调整 SVG 高度
      this.svgHeight = 100 + (lines - 1) * (verticalSpacing + radius * 2);
    },
    getStepColor(index) {
      if (index < this.currentStep) {
        return "#4caf50"; // 已完成步骤的颜色
      } else if (index === this.currentStep) {
        return "#2196f3"; // 当前步骤的颜色
      } else {
        return "#ccc"; // 未完成步骤的颜色
      }
    },
  },
};
</script>

<style scoped>
.serpentine-steps-container {
  width: 100%;
  overflow-x: hidden; /* 隐藏横向溢出 */
}

svg {
  display: block;
  margin: 0 auto;
}

text {
  font-size: 14px;
}
</style>