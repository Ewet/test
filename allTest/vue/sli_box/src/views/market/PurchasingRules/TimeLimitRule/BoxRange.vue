<template>
   <div class="page">
       {{boxRangeData}}
   </div>
</template>

<script>
export default {
  name: 'BoxRange',
  props: {
    boxRangeData: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped lang='less'>
</style>
