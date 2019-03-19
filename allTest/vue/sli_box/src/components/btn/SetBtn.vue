<template>
  <div>
    <div v-show="type==='lighting'" class="SetBtn">
      <div class="SetBtnItem" @click="floodlight">
        [
        <span>照明灯 -{{floodlightState}}</span>
        <i class="ivu-icon ivu-icon-ios-settings-outline"></i>
        ]
      </div>
      <div class="SetBtnItem" @click="advertising">
        [
        <span>广告灯 -{{advertisingState}}</span>
        <i class="ivu-icon ivu-icon-ios-settings-outline"></i>
        ]
      </div>
      <div class="SetBtnItem" @click="background">
        [
        <span>背景灯 -{{backgroundState}}</span>
        <i class="ivu-icon ivu-icon-ios-settings-outline"></i>
        ]
      </div>
    </div>
    <div  v-show="type==='airConditioner'" class="SetBtn">
      <div class="SetBtnItem" @click="airConditioner">
        <span>{{airConditionerState}}</span>
        <i class="ivu-icon ivu-icon-ios-settings-outline"></i>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'SetBtn',
  props: {
    floodlightState: {
      type: [String],
      default: ''
    },
    advertisingState: {
      type: [String],
      default: ''
    },
    backgroundState: {
      type: [String],
      default: ''
    },
    airConditionerState: {
      type: [String],
      default: ''
    },
    type: {
      type: [String],
      default: ''
    }
  },
  methods: {
    floodlight () {
      this.$emit('floodlightClick');
    },
    advertising () {
      this.$emit('advertisingClick');
    },
    background () {
      this.$emit('backgroundClick');
    },
    airConditioner () {
      this.$emit('airConditionerClick');
    }
  },
  components: {
  }
};
</script>
<style lang="less" scoped>
  .SetBtn{
    display: flex;
  }
  .SetBtnItem{
    font-size: 14px;
    cursor: pointer;
  }
  .SetBtnItem:hover{
    color: #2d8cf0;
  }
  .SetBtnItem i{
    font-size: 16px;
  }
</style>
