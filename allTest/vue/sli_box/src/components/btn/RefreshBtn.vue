<template>
     <Button
     style="margin: 0 10px 20px 0;display:none;"
     type="primary"
     @click="handleClick"
     icon="md-refresh"
     >刷新</Button>
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
