<template>
   <span class="wordImg" style="margin-right: 12px;" @click="handleClick">

         <!-- 1 有酒 2 没酒 3 未知 4 不存在 5 有人 6 没人 7 门开 8 门关 9 设置 -->
        <Icon v-if="icon === 1" class="icon have" type="md-radio-button-on" />
        <Icon v-else-if="icon === 2" class="icon no" type="md-radio-button-off" />
        <Icon v-else-if="icon === 3" class="icon unknow" type="md-help" />
        <Icon v-else-if="icon === 4" class="icon unhave" type="md-close" />
        <span v-else-if="icon === 5" class="img haveMember"></span>
        <span v-else-if="icon === 6" class="img noMember"></span>
        <span v-else-if="icon === 7" class="img outDoor"></span>
        <span v-else-if="icon === 8" class="img offDoor"></span>
        <Icon v-else-if="icon === 9" class="icon offDoor" type="ios-settings-outline" />
        <span>{{word}}</span>
         <!-- <Icon v-else-if="icon === 6" class="icon noMember" type="md-person" />
         <Icon v-else-if="icon === 7" class="icon outDoor" type="ios-bookmarks" />
         <Icon v-else-if="icon === 8" class="icon offDoor" type="ios-bookmarks" /> -->

   </span>
</template>

<script>
export default {
  props: {
    word: {
      type: String,
      default: ''
    },
    imgs: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // img: require('assets/member.png')
    };
  },
  methods: {
    handleClick () {
      this.$emit('click');
    }
  }
};
</script>
<style lang="less">
  .wordImg{
    span{
      vertical-align: middle;
    }
    .img{
      display: inline-block;
      width: 19px;
      height: 18px;
      vertical-align: middle;
      background-image: url('./images/member.png');
      // background-size: 200%;
    }
    .noMember{
      background-position: 19px 0;
    }
    .outDoor{
      background-position: 0 18px;
    }
    .offDoor{
      background-position: 19px 18px;
    }
    .icon{
      font-size: 18px;
      color: #666;
      vertical-align: middle;
    }
    .have{
      color: #b10aff;
    }
    .unknow{
      color: #FF0000;
      margin-right: -4px;
    }
    .unhave{
      margin-right: -4px;
    }
  }
</style>
