<template>
    <div class="wineCabinetTableContent">
        <Poptip style="width: 100%;" trigger="click" :content="'实时库存：' + res.real_quantity">
            <table width="100%" cellspacing="0" :class="{active: res.real_quantity !== res.quantity}">
                <thead>
                    <tr>
                        <th>层</th>
                        <th :colspan="Math.max(...res.floor.map(x => x.length))">{{res.layer_no}}号区 ({{res.goods_name}}, 余：{{res.quantity}})</th>
                    </tr>
                </thead>
                <tbody v-if="res.floor && Array.isArray(res.floor)">
                    <tr v-for="(floorItem, index) in res.floor" :key="index">
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
                </tbody>
            </table>
        </Poptip>
    </div>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from '../store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'WineCabinetTable',
  props: {
    res: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style lang='less'>
.wineCabinetTableContent{
    .ivu-poptip-rel{
        width: 100%;
    }
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
</style>
