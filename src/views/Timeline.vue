<template>
 
    <snake-timeline :steps="steps" :currentStep="currentStep"></snake-timeline>
    <div id="timeLineEchart" ref="timeLineEchartContainer"></div>
</template>
 
<script setup lang="ts">
import SnakeTimeline from '@/components/SnakeTimeline.vue';

const steps = [
        "步骤一",
        "步骤二",
        "步骤三",
        "步骤四",
        "步骤五",
        "步骤六",
        "步骤七",
        "步骤八",
        
      ]
      const currentStep = 3


</script>
<style>

</style>