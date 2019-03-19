<template>
    <header class="module-header">
        <h2>{{title}}</h2>
        <div class="right">
          <slot name="right" ></slot>
        </div>
    </header>
</template>
<script>
export default {
  name: 'CommonModuleNav',
  props: {
    title: {
      type: String,
      default: '订单列表'
    }
  },
  data () {
    return {};
  }
};
</script>
<style scoped lang="less">
.module-header {
  position: relative;
    padding-bottom:10px;
    border-bottom: 1px solid #dddee1;
    margin-bottom: 20px;
    h2 {
      line-height: 32px;
    }
    .right {
      position: absolute;
      right: 0;
      top:0;
    }
}
</style>
