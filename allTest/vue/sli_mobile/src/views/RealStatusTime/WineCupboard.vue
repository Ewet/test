<template>
    <ul class="sixBox">
        <li class="sixBoxList" v-for="(items,index) in res" :key="index+'l'">
            <h3>0{{items.layer_no}}</h3>
            <div class="listContent" v-if="items.floor && Array.isArray(items.floor)">
                <div class="layer" v-for="(floorItems,index) in items.floor" :key="index+'f'">
                    <div class="dls" v-for="(TdItem,index) in floorItems" :key="index+'t'">
                        <span v-if="TdItem.value === 1" class="icons"></span>
                        <span class="icons notShelves" v-else-if="TdItem.value === 0"></span>
                        <span class="icons unKnown" v-else>?</span>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
  name: '',
  props: {
    res: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      tableData2: [
        {
          floor: [
            [
              {
                name: '1',
                value: 0
              },
              {
                name: '1',
                value: 1
              },
              {
                name: '1',
                value: 2
              },
              {
                name: '1',
                value: 0
              },
              {
                name: '1',
                value: 1
              }
            ],
            [
              {
                name: '1',
                value: 0
              },
              {
                name: '1',
                value: 1
              },
              {
                name: '1',
                value: 2
              },
              {
                name: '1',
                value: 0
              },
              {
                name: '1',
                value: 1
              }
            ],
            [
              {
                name: '1',
                value: 0
              },
              {
                name: '1',
                value: 1
              },
              {
                name: '1',
                value: 2
              },
              {
                name: '1',
                value: 0
              },
              {
                name: '1',
                value: 1
              }
            ]
          ],
          goods_name: '测试新商品商品介绍视频',
          intro: false,
          layer_id: '339472989069285883',
          layer_no: '1',
          price: 1,
          quantity: 1,
          real_quantity: 1
        },
        {
          floor: [
            [
              {
                name: '1',
                value: 0
              },
              {
                name: '1',
                value: 1
              },
              {
                name: '1',
                value: 2
              },
              {
                name: '1',
                value: 0
              },
              {
                name: '1',
                value: 1
              }
            ]
          ],
          goods_name: '测试新商品商品介绍视频',
          intro: false,
          layer_id: '339472989069285883',
          layer_no: '2',
          price: 1,
          quantity: 1,
          real_quantity: 1
        },
        {
          floor: [
            [
              {
                name: '1',
                value: 0
              },
              {
                name: '1',
                value: 1
              },
              {
                name: '1',
                value: 2
              },
              {
                name: '1',
                value: 0
              },
              {
                name: '1',
                value: 1
              }
            ],
            [
              {
                name: '1',
                value: 0
              },
              {
                name: '1',
                value: 1
              },
              {
                name: '1',
                value: 2
              },
              {
                name: '1',
                value: 0
              },
              {
                name: '1',
                value: 1
              }
            ],
            [
              {
                name: '1',
                value: 0
              },
              {
                name: '1',
                value: 1
              },
              {
                name: '1',
                value: 2
              },
              {
                name: '1',
                value: 0
              },
              {
                name: '1',
                value: 1
              }
            ],
            [
              {
                name: '1',
                value: 0
              },
              {
                name: '1',
                value: 1
              },
              {
                name: '1',
                value: 0
              },
              {
                name: '1',
                value: 1
              }
            ]
          ],
          goods_name: '测试新商品商品介绍视频',
          intro: false,
          layer_id: '339472989069285883',
          layer_no: '2',
          price: 1,
          quantity: 1,
          real_quantity: 1
        },
        {
          floor: [
            [
              {
                name: '1',
                value: 0
              },
              {
                name: '1',
                value: 1
              },
              {
                name: '1',
                value: 2
              },
              {
                name: '1',
                value: 0
              },
              {
                name: '1',
                value: 1
              }
            ]
          ],
          goods_name: '测试新商品商品介绍视频',
          intro: false,
          layer_id: '339472989069285883',
          layer_no: '2',
          price: 1,
          quantity: 1,
          real_quantity: 1
        },
        {
          floor: [
            [
              {
                name: '1',
                value: 0
              },
              {
                name: '1',
                value: 1
              },
              {
                name: '1',
                value: 2
              },
              {
                name: '1',
                value: 0
              },
              {
                name: '1',
                value: 1
              }
            ]
          ],
          goods_name: '测试新商品商品介绍视频',
          intro: false,
          layer_id: '339472989069285883',
          layer_no: '2',
          price: 1,
          quantity: 1,
          real_quantity: 1
        },
        {
          floor: [
            [
              {
                name: '1',
                value: 0
              },
              {
                name: '1',
                value: 1
              },
              {
                name: '1',
                value: 2
              },
              {
                name: '1',
                value: 0
              },
              {
                name: '1',
                value: 1
              }
            ]
          ],
          goods_name: '测试新商品商品介绍视频',
          intro: false,
          layer_id: '339472989069285883',
          layer_no: '2',
          price: 1,
          quantity: 1,
          real_quantity: 1
        }
      ]
    };
  }
};
</script>

<style scoped lang='less'>
@import '~@/assets/color.less';
.sixBox{
    margin-top: .22rem;
    width: 100%;
    height: 8.8rem;
    border-radius: .06rem;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content:flex-start;
    .sixBoxList{
        width: 3.3rem;
        height: 2.5rem;
        margin-left: .3rem;
        margin-top: .2rem;
        // border: 1px solid #333;
        h3{
            margin: 0;
            text-align: center;
            background: @primaryColor;
            opacity: .5;
            height: .43rem;
            line-height: 0.43rem;
            font-weight: normal;
            color: #fff;
            font-size: .24rem;
        }
        .listContent{
            height: 83%;
            background: #fff;
            padding: .13rem;
            box-sizing: border-box;
        }
        .layer{
            display: flex;
            flex-wrap: wrap;
            .dls{
                width: .48rem;
                height: .48rem;
                margin: 0.1rem 0 0 0.1rem;
                line-height: 0;
                span.icons{
                    display: inline-block;
                    width: .48rem;
                    height: .48rem;
                    background: #A669C2;
                    text-align: center;
                    line-height: .48rem;
                    border-radius: .08rem;
                    font-size: .26rem;
                    color: #999;
                }
                span.notShelves{
                    background: #BBBBBB;
                }
                span.unKnown{
                    background: #E0E0E0;
                }
                span.sensor{
                    background: transparent;
                    vertical-align: top;
                    color: #A669C2;
                }
            }
        }
    }
    .sixBoxList:nth-of-type(3){
        width: 3.3rem;
        height: 3.1rem;
    }
    .sixBoxList:nth-of-type(6){
        width: 3.3rem;
        height: 3.1rem;
    }
}
</style>
