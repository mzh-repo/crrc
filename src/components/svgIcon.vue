<template>
  <svg aria-hidden="true"
       :class="svgClass">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'svg-icon',
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return `svg-icon ${this.className}`;
      }
      return 'svg-icon';
    },
  },
};
</script>

<style lang="scss" scoped>
.svg-icon {
  overflow: hidden;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  display: inline-block;
  width: 1em;
  height: 1em;
}
</style>
