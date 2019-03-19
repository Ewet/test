<template>
     <Button type="primary" @click="handleClick">重置</Button>
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
