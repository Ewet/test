<template>
<div class="address-list">
<nav-bar
  title="管理收货地址"
  left-arrow
  @click-left="back"
  :fixed="true"
  :zIndex="9"
/>
<pull-refresh v-model="isLoading" @refresh="onRefresh">
 <list
            v-model="loading"
            :finished="finished"
            @load="onLoad"
            >
<panel title="" v-for="(item, index) in list" :key="index">
    <p>
        <span>{{item.username}}</span>
        <span>{{item.phone}}</span>
    </p>
    <p>{{item.address}}</p>
  <div slot="footer">
    <checkbox v-model="item.checked">设为默认</checkbox>
    <div class="edit-tool">
        <Button size="small" @click="edit(item)"><icon name="edit" />编辑</Button>
        <Button size="small" @click="del(item)"><icon name="del" />删除</Button>
    </div>
    </div>
</panel>
 </list>
 </pull-refresh>
<Button bottom-action @click="add">新增收货地址</Button>
</div>
</template>
<script>
import { NavBar, Cell, CellGroup, Popup, Toast, List, PullRefresh, Button } from 'vant';
import { getList } from '@/model/addressModel';
export default {
  data () {
    return {
      isLoading: false,
      list: [],
      loading: false,
      finished: false,
      page: 1
    };
  },
  mounted () {
    this.$vlf.getItem('ADDRESS_EDIT_SUCCESS').then(val => {
      if (val) {
        Toast({
          position: 'bottom',
          message: '编辑成功',
          duration: 1000
        });
        this.$vlf.removeItem('ADDRESS_EDIT_SUCCESS');
      }
    });
    this.$vlf.getItem('ADDRESS_ADD_SUCCESS').then(val => {
      if (val) {
        Toast({
          position: 'bottom',
          message: '新增成功',
          duration: 1000
        });
        this.$vlf.removeItem('ADDRESS_ADD_SUCCESS');
      }
    });
  },
  methods: {
    loadData () {
      getList({
        page: this.page
      }).then(result => {
        if (result.success) {
          this.list = this.list.concat(result.items);
          this.page++;
        } else {
          Toast(result.msg);
        }
        this.loading = false;
        this.finished = true;
      });
    },
    onRefresh () {
      this.page = 1;
      this.list = [];
      this.loadData();
    },
    onLoad () {
      this.loadData();
    },
    back () {
      this.$replace({
        name: 'MemberCenter'
      });
    },
    edit (item) {
      this.$go({
        name: 'AddressEdit',
        query: {
          id: 123
        }
      });
    },
    del (item) {

    },
    add () {
      this.$go({
        name: 'AddressEdit'
      });
    }
  },
  components: {NavBar, Cell, CellGroup, Popup, List, PullRefresh, Button}
};
</script>
<style  lang="less">
@import '~@/assets/color.less';
.address-list {
    font-size: .26rem;
    padding-top: 46px;
    .van-nav-bar {
        color:#FFFFFF;
        background-color: @primaryColor;
        .van-icon {
            color:#FFFFFF!important;
        }
    }
    .van-list {
      padding-bottom: 1.5rem;
    }
    .van-button--bottom-action {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 0.1rem 0;
        line-height: 0.9rem;
        background-color: #f0eff5;
        height: 0.9rem;
        box-sizing: content-box;
        .van-button__text {
          display: block;
          background: linear-gradient(left, #B074CD,#8B3CAF);
          border-radius: 0.45rem;
          width: 4.8rem;
          height: .9rem;
          margin: auto;
        }
    }
    .van-panel {
        margin: 0.2rem 0;
    }
    .van-panel__header {
        display: none;
    }
    .van-panel__content {
        padding: 0.2rem 0.4rem;
        p {
            margin: 0;
        }
        p:nth-child(1){
            display: flex;
            justify-content: space-between;
        }
    }
    .van-panel__footer{
        position: relative;
        .edit-tool {
            position: absolute;
            right: 0.4rem;
            top: 50%;
            transform: translateY(-50%);
            .van-button {
                border:none;
            }
        }
        .van-checkbox--checked {
          border-color: @primaryColor;
          background-color: @primaryColor;
        }
    }
}

</style>
