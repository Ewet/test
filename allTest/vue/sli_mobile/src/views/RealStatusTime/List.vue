<template>
   <div class="realStatusTimeList">
       <div v-if="datas.floor && Array.isArray(datas.floor)">
            <div class="layer" v-for="(floorItems,index) in datas.floor" :key="index+'f'">
                <div class="dls" v-for="(TdItem,index) in floorItems" :key="index+'t'">
                    <span v-if="TdItem.value === 1" class="icons"></span>
                    <span class="icons notShelves" v-else-if="TdItem.value === 0"></span>
                    <span class="icons unKnown" v-else>?</span>
                </div>
            </div>
       </div>
   </div>
</template>

<script>
export default {
  name: 'RealStatusTimeList',
  props: {
    datas: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style scoped lang='less'>
.realStatusTimeList{
    .layer{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .dls{
            width: .28rem;
            height: .28rem;
            margin: .03rem 0;
            line-height: 0;
            span.icons{
                display: inline-block;
                width: 0.28rem;
                height: 0.28rem;
                background: #A669C2;
                text-align: center;
                line-height: .28rem;
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
</style>
