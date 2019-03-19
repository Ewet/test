<template>
    <div style="min-height:420px">
      <div class="clearfix">
          <RefreshBtn @click="loadData()" style="float:left;margin-left:10px;"/>
          <ZBtn  @click="editCargoArea(null)" style="float:right; margin:0 10px 10px;">添加货区</ZBtn>
      </div>
      <Table height="500" border :columns="columns" :data="cargoAreaItems" ></Table>
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { delItem, getList } from './model';
import { STORE_NAME } from '../store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'CargoAreaSetting',
  components: {
  },
  data () {
    return {
      containerHeight: 0,
      cargoAreaItems: [],
      columns: [
        {
          title: '货区编号',
          key: 'cargoAreaNo'
        },
        {
          title: '货位数量',
          key: 'cargoAreaQuantity'
        },
        {
          title: '操作',
          key: 'action',
          width: 300,
          align: 'center',
          render: (h, params) => h('div', [
            h('EditBtn', {
              style: {
                margin: '5px'
              },
              on: {
                click: () => {
                  this.editCargoArea(params.row.layerId);
                }
              }
            }, '编辑'),
            h('DelBtn', {
              style: {
                margin: '5px'
              },
              on: {
                click: () => {
                  this.del(params.row.layerId);
                }
              }
            }, '删除')
          ])
        }],
      isloading: false
    };
  },
  mounted () {
  },
  methods: {
    async loadData () {
      const { success, data, msg } = await getList(this.boxId);
      if (success) {
        // console.log(data);
        this.cargoAreaItems = data.items;
      } else if (msg) {
        this.$error(msg);
      }
    },
    del (layerId) {
      this.$Modal.confirm({
        title: '确定删除当前记录吗？',
        onOk: () => {
          delItem(layerId).then(({ success, msg }) => {
            if (success) {
              this.$success('删除成功!');
              this.loadData();
            } else if (msg) {
              this.$error({
                content: `删除记录失败${msg}`
              });
            }
          });
        }
      });
    },

    editCargoArea (id) {
      this.cargoAreaEdit(id);
    }
  },
  watch: {
    showModalStructureManagement (val) {
      if (val) {
        this.loadData();
      }
    },
    showCargoAreaEditModal (val) {
      if (!val) {
        this.loadData();
        // this.setLayerId('');
      }
    }
  }
};
</script>
