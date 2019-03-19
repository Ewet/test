<template>
    <Spin fix v-if="$store.state.showLoadingModal">
      <Icon type="ios-loading" size=40 class="demo-spin-icon-load"></Icon>
      <div style="font-size:24px;">{{loadingText}}</div>
    </Spin>
</template>
<script>
export default {

  props: {
    loadingText: {
      type: String,
      default: '文件上传中...'
    }
  }
};
</script>
<style lang="less" scoped>
  .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    .ivu-spin-fix {
        z-index: 9999;
        position: fixed;
    }
</style>
