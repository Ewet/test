<template>
     <Button
     type="primary"
     :size="size"
     @click="handleClick"
     style="background-color:green;border-color:green;"
     >开票成功</Button>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'small'
    }
  },
  methods: {
    handleClick () {
      this.$emit('click');
    }
  }
};
</script>
