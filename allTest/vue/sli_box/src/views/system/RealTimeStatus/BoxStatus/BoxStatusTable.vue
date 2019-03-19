<template>
    <Poptip trigger="click" :content="'实时库存：' + data.real_quantity">
        <table width="100%" cellspacing="0" :class="{active: data.real_quantity !== data.quantity}">
            <thead>
                <tr>
                    <th>层</th>
                    <th :colspan="Math.max(...data.floor.map(x => x.length))">{{data.layer_no}}号区 ({{data.goods_name}}, 余：{{data.quantity}})</th>
                </tr>
            </thead>
            <tbody v-if="data.floor && Array.isArray(data.floor)">
                <tr v-for="(floorItem, index) in data.floor" :key="index">
                    <td>
                        <span>0{{index+1}}</span>
                    </td>
                    <td v-for="(item,index) in floorItem" :key="index+'d'">
                        <Icon
                            v-show="item.value === 0"
                            style="font-size: 18px;color: #666;" type="md-radio-button-off"
                        />
                        <Icon
                            v-show="item.value === 1"
                            style="font-size: 18px;color: #b10aff;" type="md-radio-button-on"
                        />
                        <Icon
                            v-show="item.value === null"
                            style="font-size: 18px;color: #FF0000;" type="md-help"
                        />
                    </td>
                </tr>
                <tr v-for="(item,index) in maxCount-data.floor.length" :key="index+'r'">
                  <td :colspan="Math.max(...data.floor.map(x => x.length)) + 1"></td>
                </tr>
            </tbody>
        </table>
    </Poptip>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from '../store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'BoxStatusTable',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    maxCount: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
    };
  }
};
</script>

<style lang='less'>
.boxStatus{
    .ivu-poptip-title{
        display: none;
    }
    .ivu-poptip, .ivu-poptip-rel{
        width:100%;
    }
    .left{
        table{
            border-collapse: collapse;
            margin-bottom: 10px;
            font-size: 12px;
            tr{
                height: 34px;
                th{height: 50px;}
                td,th{
                    border:1px solid #e8e8e8;
                    padding: 6px 8px;
                    word-break: break-all;
                    min-width: 40px;
                    text-align: center;
                    img{
                        width: 18px;
                        height: 18px;
                    }
                }
            }
        }
        table.active{
            outline:2px solid red;
        }
    }
}
</style>
