<template>
  <Button class="btn" :class="size" @click="buttonclick"
  :disabled="disabled">
      <slot></slot>
  </Button>
</template>
<script>
import { Button } from 'vant';
export default {
  props: {
    size: {
      validator: function (value) {
        return ['normal', 'large', 'small', 'height'].indexOf(value) !== -1;
        //   type: String,
        //   default: 'normal'
      },
      default: 'normal'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    };
  },
  computed: {
    //   setwidth(){
    //       switch(this.size){
    //           case 'normal': return 'normal'
    //       }
    //   }
  },
  methods: {
    buttonclick () {
      this.$emit('click');
      this.$emit('increment');
    }
  },
  components: {Button}
};
</script>
<style lang="less" scoped>
@import '~@/assets/color.less';
.btn {
    height: auto;
    // width: 3.3rem;
    line-height: 0.7rem;
    font-size:  0.32rem;
    background: @primaryColor;
    color: #fff;
    // text-align: center;
}
.normal{
    width: 3.3rem;
}
.large{
    width: 4.8rem;
}
.small{
    width: 2.2rem;
}
.height{
  width: 4.8rem;
  height: 0.9rem;
  line-height: 0.9rem;
  border-radius: 0.45rem;
}
</style>
