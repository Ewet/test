<template>
<div class="captureInterface" ref="captureInterface">
    <Card :bordered="false" v-for="(item, i) in captureInterfaceItems" :key="i" class="item-row">
            <span slot="title">{{item.name}}</span>
            <div class="item-row-image">
              <div class="ir-img-item" v-for="(listItem) in item.list" :key="listItem.id">
                <img
                  :src="listItem.imgUrl"
                  @click="show(listItem.id, item.list)"/>
                <p>{{listItem.desc}}</p>
              </div>
            </div>
      </Card>
      <div
      v-show="captureInterfaceItems.length === 0"
      style="height:100%;width:100%;"
      >暂无摄像头相关数据</div>
    <viewer
        :images="images"
        class="viewer"
        ref="viewer"
        @inited="inited"
        style="display:none;"
    >
      <template slot-scope="scope">
        <img v-for="(item,i) in scope.images" :src="item.src" :key="i" :alt='item.alt'>
        {{scope.options}}
      </template>
    </viewer>
</div>

</template>
<script>
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from '../store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'captureInterface',
  data () {
    return {
      images: [],
      captureInterfaceItems: []
    };
  },
  mounted () {
    this.setMaxHeight();
    window.addEventListener('resize', this.setMaxHeight);
  },
  methods: {
    setMaxHeight () {
      this.$refs.captureInterface.style['max-height'] = `${document.body.clientHeight - 120}px`;
    },
    inited (viewer) {
      this.$viewer = viewer;
    },
    show (id, list) {
      let index = 0;
      this.images.forEach((x, i) => {
        if (x.id === id) {
          index = i;
        }
      });
      this.$viewer.view(index);
    }
  },
  components: {
  },
  watch: {
    'formData.captureInterface': function (val) {
      if (val && val.items) {
        this.captureInterfaceItems = val.items;
        this.images = val.items.reduce((x, y) => {
          y.list.forEach((h) => {
            x.push({
              src: h.imgUrl,
              alt: h.desc,
              id: h.id
            });
          });
          return x;
        }, []);
      }
    }
  }
};

</script>
<style lang="less">
.captureInterface{
    overflow: auto;
    .ivu-card-head span {
      font-weight: bold;
    }
    .item-row {
      .item-row-image {
        .ir-img-item {
          width:140px;
          display: inline-block;
          position: relative;
          margin:0 10px;
          p {
            text-align: center;
            line-height: 1.8;
            font-size:14px;
          }
          img {
            width: 100%;
            height: 80px;
          }
        }
      }
      & + .item-row {
        margin-top: 10px;
      }
    }
}
</style>
