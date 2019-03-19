<template>
  <div class="record-item" @click="toDetail">
    <div class="item-title">
      日期：{{time}}
    </div>
    <h4>盒子编号：{{number}}</h4>
    <div class="item-address">
      <b>地址:</b>
      <span>{{address}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ItemRecord',
  props: {
    id: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
    },
    number: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    }
  },
  components: {

  },
  methods: {
    toDetail () {
      // this.$router.push({
      //   path: '/detail',
      //   name: 'Detail',
      //   params: {
      //     replenishmentId: this.id
      //   }
      // });
      this.$go({name: 'Detail', query: {replenishmentId: this.id}});
    }
  }
};

</script>
<style lang="less" scoped>
.record-item {
  padding: 0.3rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 0.2rem;
  background-color: #fff;
}

.item-title {
  width: 100%;
  font-size: 0.2rem;
  color: #7C7B7B;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #EEE;
}

.record-item>h4 {
  width: 100%;
  margin: 0.1rem 0 0.2rem 0;
  font-size: 0.28rem;
}

.item-address {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  color: #7B7B7B;
  font-size: 0.24rem;
}

.item-address>b {
  display: block;
  width: 0.8rem;
}

.item-address>span {
  display: inline-block;
  width: 6.7rem;
  text-align: justify;
}

</style>
