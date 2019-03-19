<template>
   <div class="orderFooter">
       <span class='left'>
         <slot name="left"></slot>
       </span>
       <span class='right'>
         <Button :disabled="disabled" @click="confirmHandle">{{btnText}}</Button>
       </span>
   </div>
</template>

<script>
export default {
  props: {
    btnText: '',
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    confirmHandle () {
      this.$emit('confirm');
    }
  }
};
</script>

<style scoped lang='less'>
@import '~@/assets/color.less';
.orderFooter{
  font-size: 0;
  height: .9rem;
  background-color: #fff;
  .left,.right{
    vertical-align: top;
    height: 100%;
    display: inline-block;
  }
  .left{
    width: 70%;
    line-height: 0.9rem;
  }
  .right{
    width: 30%;
    Button{
      width: 100%;
      height: 100%;
      color: #fff;
      background-color: @primaryColor;
      border: none;
      font-size:.34rem;
    }
  }
}
</style>
