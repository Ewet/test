<template>
     <Button type="primary" @click="handleClick">确定</Button>
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
