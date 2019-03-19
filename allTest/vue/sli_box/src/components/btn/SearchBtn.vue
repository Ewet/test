<template>
     <Button type="primary" @click="handleClick" icon="ios-search">搜索</Button>
</template>

<script>
export default {
  methods: {
    handleClick () {
      this.$emit('click');
    }
  }
};
</script>
