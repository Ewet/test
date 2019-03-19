<template>
     <Button
     :type="type"
     :size="size"
     :loading="loading"
     @click="handleClick"><slot></slot></Button>
</template>

<script>
export default {
  name: 'ZBtn',
  props: {
    size: {
      type: String,
      default: 'default'
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'primary'
    }
  },
  methods: {
    handleClick () {
      this.$emit('click');
    }
  }
};
</script>
