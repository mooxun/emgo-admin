<template>
  <div class="chart-trend">
    <slot name="term" ></slot>
    <span :class="['trend-icon', flag]"><a-icon :type="'caret-' + flag"/></span>
  </div>
</template>

<script>
export default {
  name: 'Trend',
  props: {
    flag: {
      type: String,
      default: 'up',
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-trend {
  display: inline-block;
  font-size: 14px;
  line-height: 22px;

  .trend-icon {
    font-size: 12px;

    &.up, &.down {
      margin-left: 4px;
      position: relative;
      top: 1px;

      i {
        font-size: 12px;
        transform: scale(.83);
      }
    }

    &.up {
      color: #f5222d;
    }

    &.down {
      color: #52c41a;
      top: -1px;
    }
  }
}
</style>
