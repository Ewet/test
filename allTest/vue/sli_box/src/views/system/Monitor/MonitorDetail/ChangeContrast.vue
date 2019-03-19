<template>
 <div class="change-contrast">
    <Card :bordered="false">
        <span slot="title">货区变化</span>
        <!-- <Table border :columns="columns" :data="changeContrastItems" ></Table> -->
        <ZTable
          :columns="columns"
          :items="changeContrastItems"
          :loading="isLoading"
          :page="page"
          :total="total"
          :showPageBar="false"
          :pageChange="pageChange.bind(this)"
        />
    </Card>
</div>
</template>
<script>
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from '../store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'ChangeContrast',
  data () {
    return {
      changeContrastItems: [],
      columns: [
        {
          title: '货区',
          key: 'layerNo',
          sortable: true
        },
        {
          title: '层数',
          key: 'rowNo',
          sortable: true
        },
        {
          title: '货位',
          key: 'cellNo',
          sortable: true
        },
        {
          title: '变化',
          key: 'variety',
          sortable: true,
          render: (h, params) => {
            const child = [];
            if (params.row.before === null || params.row.after === null) {
              child.push('未知');
            } else {
              child.push(`${params.row.before} / ${params.row.after}`);
              if (params.row.before !== params.row.after) {
                child.push(h('Icon', {
                  props: {
                    type: 'ios-information-circle-outline'
                  },
                  style: {
                    fontSize: '20px',
                    color: 'red',
                    marginLeft: '5px'
                  }
                }));
              }
            }
            return h('div', {
              style: {
                display: 'flex',
                alignItems: 'center'
              }
            }, child);
          }
        }
      ]
    };
  },
  mounted () {
  },
  watch: {
    'formData.changeContrast': function (val) {
      this.changeContrastItems = val || [];
    }
  }
};

</script>
<style lang="less">
.change-contrast{
    // text-align:center;
    background-color: #fff;
    .img{
        background: #aaa;
        height:250px;
        img {width:100%;}
    }
    .ivu-card-head span {
      font-weight: bold;
    }
}
</style>
