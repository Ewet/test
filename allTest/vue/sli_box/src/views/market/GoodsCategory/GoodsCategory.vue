<template>
<div class="goodsIndex">
  <ModuleHeader title="商品分类">
    </ModuleHeader>
  <div style="width:600px; ">
    <Tree :data="treeSource" :render="renderContent" @on-toggle-expand="showExpand"></Tree>
  </div>
  <Modal
        :value= showModal
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="close"
        >
        <div style="text-align:center; font-weight: 700; font-size:14px;" slot="header" >编辑<span v-show="parentName">父分类<span style="color:red;">[{{parentName}}]</span>下的</span><span style="color:red;">[{{cateName}}]</span>分类</div>
        <Edit
        :gcateId= gcateId
        :name= cateName
        @close="close"
        @refresh="onRefresh"
        @upDateSuccess="upDateSuccess"
        ></Edit>
      </Modal>
  <Modal
        :value= showAdd
        :footerHide= "true"
        :mask-closable= "false"
        @on-cancel="close"
        >
        <div style="text-align:center; font-weight: 700; font-size:14px;" slot="header">添加到父分类<span style="color:red;">[{{cateName}}]</span>下</div>
        <Add
        :parentId= gcateId
        @addSuccess="addSuccess"
        @close="close"
        @refresh="onRefresh"

        ></Add>

      </Modal>
</div>
</template>
<script>
import { getList, delItem } from './model';
import Edit from './Edit';
import Add from './Add';

export default {
  components: {
    Edit,
    Add
  },
  name: 'GoodsIndex',
  data () {
    return {
      showAdd: false,
      showModal: false,
      parentName: '', //
      cateName: '', //
      gcateId: '', //
      parentId: '', //
      treeSource: [
        {
          cateName: '全部分类',
          expand: true,
          render: (h, { root, node, data }) => h('span', {
            style: {
              display: 'inline-block',
              width: '100%'
            }
          }, [
            h('span', [
              h('Icon', {
                props: {
                  type: 'ios-folder-outline'
                },
                style: {
                  marginRight: '8px'
                }
              }),
              h('span', data.cateName)
            ]),
            h('span', {
              style: {
                display: 'inline-block',
                float: 'right',
                marginRight: '32px'
              }
            }, [
              h('Button', {
                props: Object.assign({}, this.buttonProps, {
                  icon: 'ios-add',
                  type: 'primary'
                }),
                style: {
                  width: '64px'
                },
                on: {
                  click: () => { this.add(data); }
                }
              })
            ])
          ]),
          children: []
        }
      ],
      leafCollection: [],
      buttonProps: {
        type: 'default',
        size: 'small'
      },
      clickNodeData: null,
      expandArr: [],
      currentNodeData: null
    };
  },
  mounted () {
    this.loadData();
  },
  methods: {
    // 处理新增、删除后保存树的展开情况
    showExpand (node) {
      if (node.expand === true) {
        this.expandArr.push(node.gcateId);
      } else if (node.expand === false) {
        this.expandArr = this.expandArr.filter(x => x !== node.gcateId);
      }
    },
    loadData () {
      const params = {
        expand: this.expandArr.join(',')
      };
      getList(params).then((result) => {
        if (result.success) {
          const data = result.data;
          this.treeSource[0].children = data.treeData;
          this.leafCollection = data.leafCollection;
        } else {
        }
      });
    },
    close () {
      this.showModal = false;
      this.showAdd = false;
      this.gcateId = '';
      this.cateName = '';
    },
    renderContent (h, { root, node, data }) {
      return h('span', {
        style: {
          display: 'inline-block',
          width: '100%'
        }
      }, [
        h('span', [
          h('Icon', {
            props: {
              type: 'ios-folder-outline'
            },
            style: {
              marginRight: '8px'
            }
          }),
          h('span', data.cateName)
        ]),
        h('span', {
          style: {
            display: 'inline-block',
            float: 'right',
            marginRight: '32px'
          }
        }, [
          h('Button', {
            props: Object.assign({}, this.buttonProps, {
              icon: 'ios-add'
            }),
            style: {
              marginRight: '8px'
            },
            on: {
              click: () => { this.add(data); }
            }
          }),
          h('Button', {
            props: Object.assign({}, this.buttonProps, {
              icon: 'ios-remove'
            }),
            style: {
              marginRight: '8px'
            },
            on: {
              click: () => { this.remove(root, node, data); }
            }
          }),
          h('Button', {
            props: Object.assign({}, this.buttonProps, {
              icon: 'md-create'
            }),
            style: {
              color: '#c5c8ce'
            },
            on: {
              click: () => {
                // this.clickNodeData = data;
                this.edit(data);
              }
            }
          })
        ])
      ]);
    },
    add (data) {
      const { gcateId, cateName } = data;
      this.cateName = cateName;
      this.gcateId = gcateId;
      this.showAdd = true;
      this.currentNodeData = data;
    },
    addSuccess (node) {
      const data = this.currentNodeData;
      const children = data.children || [];
      children.push(node);
      this.$set(data, 'expand', true);
      this.$set(data, 'children', children);
      this.currentNodeData = null;
      // if (!this.expandArr.includes(this.gcateId)) {
      //   this.expandArr.push(this.gcateId);
      // }
    },
    upDateSuccess (node) {
      this.currentNodeData.cateName = node.cateName;
      this.currentNodeData = null;
    },
    edit (data) {
      const { gcateId, cateName, parentId } = data;
      let parent = this.leafCollection.filter(x => x.gcateId === parentId);
      if (parent.length > 0) {
        parent = parent[0];
      }
      this.cateName = cateName;
      this.parentName = parent.cateName;
      this.gcateId = gcateId;
      // console.log(gcateId, cateName, parent);
      this.showModal = true;
      this.currentNodeData = data;
    },
    remove (root, node, data) {
      console.log(data.children);
      // if (data.children.length > 0) {
      if (data.children === undefined || !data.children.length) {
        this.$Modal.confirm({
          title: '确定删除当前数据吗？',
          onOk: () => {
            delItem(data.gcateId).then(({ success, msg }) => {
              if (success) {
                this.$success('删除成功!');
                // this.expandArr = this.expandArr.filter(x => {
                //   return x !== data.gcateId;
                // });
                // this.onRefresh();
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                parent.children.splice(index, 1);
              } else if (msg) {
                this.$error({
                  content: `删除记录失败${msg}`
                });
              }
            });
          }
        });
      } else {
        this.$error({
          content: '该分类存在子分类，不能删除'
        });
      }
    },
    onRefresh () {
      setTimeout(() => {
        this.loadData();
      }, 1000);
    }
  }
};
</script>
<style lang="less">
/* .frame{
  width: 100%;
  height: 800px;
  overflow:auto;
} */
.ivu-tree ul {
    font-size: 16px;
}
.tree-row-item {
  &:hover {
    background-color: rgba(45,140,240,0.2);
  }
}
</style>
