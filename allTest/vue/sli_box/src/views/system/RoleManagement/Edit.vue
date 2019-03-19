<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem label="角色名称" prop="roleName" >
            <Input :maxlength="50"
            v-model="formValidate.roleName"
            :disabled="id!==''"
            placeholder="请输入角色名称"></Input>
        </FormItem>
        <FormItem label="角色描述" prop="roleDesc">
            <Input :maxlength="50" v-model="formValidate.roleDesc" placeholder="请输入角色描述"></Input>
        </FormItem>
        <FormItem label="权限配置">
            <Row>
              <Col span="12">
                <div style="max-height:300px;overflow:auto;">
                  <a-tree
                    checkable
                    @expand="onExpand"
                    :expandedKeys="expandedKeys"
                    :autoExpandParent="autoExpandParent"
                    v-model="formValidate.checkedKeys"
                    :treeNodes="treeData"
                  />
                </div>
              </Col>
              <Col span="12">
                <div class="selected-wrapper">
                    <h3>已选权限</h3><ul>
                      <li v-for="item in selectedMenu" :key="item.key">
                        <h4>{{item.title}}</h4>
                        <p>{{item.desc}}</p>
                      </li>
                    </ul>
                </div>
              </Col>
            </Row>
        </FormItem>
        <FormItem>
            <AddBtn @click="add('formValidate')" v-show="!id"/>
            <SaveBtn @click="save('formValidate')" v-show="id"/>
        </FormItem>
        </Form>
</template>
<script>
import { updateItem, addItem } from './model';
import vuexMixins from 'mixins/module-map';
import { Tree } from 'ant-design-vue';
import { getConfig } from 'model/authManagement';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'RoleManagementEdit',
  data () {
    return {
      formValidate: {
        roleName: '',
        roleDesc: '',
        checkedKeys: []
      },
      ruleValidate: {
        roleName: [
          {
            required: true, message: '角色名称不能为空', trigger: 'blur', transform: value => value.toString().trim()
          }
        ],
        roleDesc: [
          {
            required: true, message: '角色描述不能为空', trigger: 'blur', transform: value => value.toString().trim()
          }
        ]
      },
      id: '',
      expandedKeys: [],
      autoExpandParent: true,
      treeData: [],
      leafCollection: []
    };
  },
  mounted () {
    this.loadTree();
  },
  methods: {
    add (name) {
      if (this.selectedMenu.length === 0) {
        this.$error('权限配置为空!');
        return false;
      }
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          addItem({
            roleName: this.formValidate.roleName,
            notes: this.formValidate.roleDesc,
            auth_resources_ids: this.selectedMenu.map(x => x.key).join(',')
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('新增成功！');
              this.setModal(false);
              this.reload();
            } else {
              this.$error(msg);
            }
          });
        } else {
          // this.$error('表单验证不正确');
        }
      });
    },
    save (name) {
      if (this.selectedMenu.length === 0) {
        this.$error('权限配置为空!');
        return false;
      }
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          updateItem({
            id: this.id,
            roleName: this.formValidate.roleName,
            notes: this.formValidate.roleDesc,
            auth_resources_ids: this.selectedMenu.map(x => x.key).join(',')
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('保存成功!');
              this.setModal(false);
              this.reload();
            } else {
              this.$error(msg);
            }
          });
        } else {
          this.$error('表单验证不正确');
        }
      });
    },
    handleReset (name) {
      this.$refs.formValidate.resetFields();
    },
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    async loadTree () {
      const { success, data, msg } = await getConfig();
      if (success) {
        this.treeData = data.treeData;
        this.leafCollection = data.leafCollection;
      } else {
        this.$error(msg);
      }
    }
  },
  watch: {
    formData (val) {
      this.$refs.formValidate.resetFields();
      if (Object.keys(val).length > 0) {
        this.formValidate.roleName = val.roleName;
        this.formValidate.roleDesc = val.roleDesc;
        this.formValidate.checkedKeys = val.checkedKeys;
        this.id = val.id || '';
      } else {
        this.formValidate = {
          roleName: '',
          roleDesc: '',
          checkedKeys: []
        };
        this.id = '';
      }
    }
  },
  components: {
    [Tree.name]: Tree
  },
  computed: {
    selectedMenu () {
      return this.leafCollection.filter(x => this.formValidate.checkedKeys.includes(x.key));
    }
  }
};
</script>
<style lang="less">
.ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {
    background-color: #fff;
}
</style>
<style lang="less" scoped>
.selected-wrapper {
  border:1px solid #f8f8f8;
  h3 {
    font-size:16px;
    color:#000;
    background-color:#F0F1F7;
    padding:5px;
  }
  ul {
    max-height:280px;
    overflow:auto;
    padding:5px 10px;
    li + li {
      border-top:1px solid #E1E3E6;
    }
    h4 {
      color:#000;
      margin:0;
      height:1.5em;
      font-size:16px;
    }
    p{margin:0;color: #B6B6B5;}
  }
}

</style>
