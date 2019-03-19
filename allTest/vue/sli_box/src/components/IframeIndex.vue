<template>
<div style="margin:10px;">
  <!-- <ModuleHeader :title="title">
  </ModuleHeader> -->
  <iframe v-if="iframeSrc" :src="iframeSrc" frameborder="0" class="frame"></iframe>
</div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  name: 'GoodsIndex',
  data () {
    return {
      iframeSrc: ''
    };
  },
  created () {
    const iframeIndexSrc = localStorage.getItem('iframeIndexSrc');
    if (iframeIndexSrc) {
      this.iframeSrc = iframeIndexSrc;
    }
  }
};
</script>
<style scoped>
.frame{
  width: 100%;
  height: 800px;
  overflow:auto;
}
</style>
