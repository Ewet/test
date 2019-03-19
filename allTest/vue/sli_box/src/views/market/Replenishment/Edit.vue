<template>
    <div class='edit'>
      <div class='top'>
        <p><span>盒子编号：</span>{{formData.boxNum}}</p>
        <p><span>盒子地址：</span>{{formData.boxAddress}}</p>
        <p><span>补货时间：</span>{{formData.replenishmentTime}}</p>
        <p><span>补货员姓名：</span>{{formData.replenishmentName}}</p>
        <p><span>手机号码：</span>{{formData.replenishmentPhone}}</p>
      </div>
      <Table border height='450' :columns="columns" :data="formData.items" :loading = isLoading>
      </Table>
      <Button style='float:right;margin:40px 0 10px' @click="setViewModal(false)">关闭</Button>
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { getRemark } from './model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'replenishment',
  data () {
    return {
      columns: [
        {
          title: '货区编号',
          key: 'goodsAreaNum'
        },
        {
          title: '操作类型',
          key: 'operationType'
        },
        {
          title: '计划类型',
          key: 'plantType'
        },
        {
          title: '操作时间',
          key: 'operationTime'
        },
        {
          title: '商品变化（前/后）',
          key: 'goodsChange',
          render: (h, params) => {
            const action = [];
            const oldGoodsName = params.row.goodsChangeOld;
            const newGoodsName = params.row.goodsChangeNew;
            if (oldGoodsName !== '' && newGoodsName !== '') {
              action.push(
                h('p', {}, `${oldGoodsName}/`)
              );
              action.push(
                h('p', {}, `${newGoodsName}`)
              );
            } else if (oldGoodsName !== '') {
              action.push(
                h('p', {}, `${oldGoodsName}`)
              );
            } else if (newGoodsName !== '') {
              action.push(
                h('p', {}, `${newGoodsName}`)
              );
            }
            return h('div', action);
          }
        },
        {
          title: '库存变化（前/后）',
          key: 'stockChange',
          render: (h, params) => {
            const action = [];
            action.push(
              h('p', {}, `${params.row.stockChangeOld}支`)
            );
            action.push(
              h('p', {}, `${params.row.stockChangeNew}支`)
            );
            return h('div', action);
          }
        },
        {
          title: '价格（前/后）',
          key: 'priceChange',
          render: (h, params) => {
            const action = [];
            action.push(
              h('p', {}, `${params.row.priceChangeOld}元`)
            );
            action.push(
              h('p', {}, `${params.row.priceChangeNew}元`)
            );
            return h('div', action);
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 140,
          render: (h, params) => {
            if (params.row.numberOfExceptions > 0) {
              const action = [];
              action.push(
                h('ViewRemarkBtn', {
                  on: {
                    click: async () => {
                      const { success, data, msg } = await getRemark(params.row.detailId);
                      if (success) {
                        this.setremarkData(data);
                        this.setRemarkModal(true);
                      } else {
                        this.$error(msg);
                      }
                    }
                  }
                })
              );
              return h('div', action);
            }
          }
        }
      ]
    };
  },
  mounted () {

  }

};
</script>
<style scoped>
.edit{
  clear: both;
  overflow: hidden;
}
.top{
    overflow: hidden;
    padding: 0 0 10px;
    border-bottom: 1px solid #DDD;
    margin-bottom: 25px;
}
.top p {
  font-size: 14px;
  line-height: 26px;
  color: #707070;

}
.top p span{
  letter-spacing: 4.5px;
}
</style>
