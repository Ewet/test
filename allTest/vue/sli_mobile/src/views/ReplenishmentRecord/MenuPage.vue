<template>
  <StructPage>
    <Header slot="header" title="选择操作" />
    <div slot="content" class="content">
      <div class="btnBox">
        <button @click="toTally"><i class="van-icon van-icon-qrcode"> </i>我要理货</button>
        <button @click="toReplenishment"><i class="van-icon van-icon-qrcode"> </i>我要补货</button>
      </div>
    </div>
  </StructPage>
</template>
<script>
import { List } from 'vant';
import { replenishment, collate } from 'model/replenishmentRecord';
import StructPage from 'components/StructPage';
import Header from 'components/Header';
export default {
  data () {
    return {
    };
  },
  mounted () {},
  methods: {
    // 我要理货
    async toTally () {
      let res = await collate();
      console.log('我要理货', res);
      if (res.success) {
        let boxId = res.data;
        this.$go({name: 'Tally', query: {boxId: boxId}});
      } else {
        if (res.code === 307) {
          this.$go({name: 'ExceptionHandling', query: {replenishmentId: res.msg}});
        } else {
          this.$error(res.msg);
        }
      }
    },
    // 我要补货
    async toReplenishment () {
      let res = await replenishment();
      console.log('我要补货', res);
      if (res.success) {
        let boxId = res.data;
        this.$go({name: 'Replenishment', query: {boxId: boxId}});
      } else {
        if (res.code === 307) {
          this.$go({name: 'ExceptionHandling', query: {replenishmentId: res.msg}});
        } else {
          this.$error(res.msg);
        }
      }
    }

  },
  components: {
    StructPage,
    Header,
    List
  }
};

</script>
<style lang="less" scoped>
  .content{
    width: 100%;
    position: absolute;
    height: 100%;
    margin-top: -45px;
    display: flex;
    align-items: center;
    background-color: #A669C2;
  }
  .btnBox{
    margin: 0.6rem auto 0 auto;
    text-align: center;
  }
  .btnBox button{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.8rem;
    margin-bottom: 0.6rem;
    height: 0.8rem;
    background-color: #fff;
    color: #A669C2;
    font-size: 0.28rem;
    border: 0;
    border-radius: 0.08rem;
    padding: 0;
    font-weight: 700;
  }
  .btnBox button i{
    margin:-0.12rem 0.1rem 0 0;
    font-size: 0.4rem;
  }
</style>
