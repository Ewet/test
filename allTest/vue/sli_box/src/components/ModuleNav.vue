<template>
 <Menu ref="menu" mode="horizontal" theme="dark" :active-name="activeName" @on-select="onSelect">
    <div class="layout-logo">
    </div>
    <div class="layout-nav">
        <MenuItem :name="item.url" v-for="item in menu" :key="item.url">
          <Icon type="ios-navigate"></Icon>
            {{item.name}}
        </MenuItem>
        <MenuItem name="" v-show="username">
            <Dropdown trigger="click" style="margin-left: 20px" @on-click="dropdownItemClick">
            <a href="javascript:void(0)">
                {{username}}
                <Icon type="md-arrow-dropdown" />
            </a>
            <DropdownMenu slot="list" >
                <DropdownItem name="pwd">修改密码</DropdownItem>
                <DropdownItem name="logout">退出</DropdownItem>
            </DropdownMenu>
            </Dropdown>
        </MenuItem>
    </div>
    <Modal v-model="pwdModel" width="360" :footer-hide="true" :mask-closable="false" @on-cancel="closeModel">
        <p slot="header">修改密码
        </p>
        <ResetPwd @closeModel="closeModel"/>
    </Modal>
</Menu>
</template>
<script>
import { logout, getCurrentLander } from 'model/user';
import { jumpLogin } from '@/utils/jump';
import logo from '@/assets/logo.png';
import { getMenu } from 'model/authManagement';
import ResetPwd from './ResetPwd';

export default {
  props: {
    activeName: {
      type: String,
      default: ''
    }
  },
  name: 'CommonTopMenu',
  components: {
    ResetPwd
  },
  data () {
    return {
      username: '',
      logoSrc: logo,
      menu: [],
      pwdModel: false
    };
  },
  mounted () {
    this.loadInfo();
    this.loadModule();
  },
  methods: {
    closeModel () {
      this.$g_emit('password_clear');
      this.pwdModel = false;
    },
    loadInfo () {
      getCurrentLander().then(({ success, msg, data }) => {
        if (success) {
          this.username = data.name;
        } else if (msg) {
          this.$error(msg);
        }
      });
    },
    onSelect (val) {
      if (val === 'platform') {
        location.href = '/platform/';
        return false;
      }
      if (val) {
        // alert(val);
        const path = process.env.NODE_ENV === 'development' ? '' : '/mbox';
        location.href = path + val;
      }
    },
    signOut () {
      logout().then((result) => {
        if (result.success) {
          this.$success({
            content: '退出成功',
            onClose: () => {
              jumpLogin();
            }
          });
        } else {
          this.$error(result.msg);
        }
      });
    },
    editPwd () {
      this.pwdModel = true;
    },
    dropdownItemClick (name) {
      if (name === 'pwd') {
        this.editPwd();
      } else if (name === 'logout') {
        this.signOut();
      }
    },
    async loadModule () {
      const { success, data, msg } = await getMenu();
      if (success) {
        console.log('当前权限菜单', data);
        this.menu = data.menu.map(x => ({
          name: x.name,
          url: `/${x.routerName}`
        }));
        this.$nextTick(() => {
          this.$refs.menu.updateActiveName(this.activeName);
        });
      } else {
        this.$error(msg);
      }
    }
  },
  watch: {
    activeName (val) {
      this.$nextTick(() => {
        this.$refs.menu.updateActiveName(val);
      });
    }
  }
};
</script>
<style scoped>
.layout-logo{
    width: 100px;
    height: 58px;
    background: url('../assets/logo.png') no-repeat;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 1px;
    left: 20px;
    background-size: contain;
}
.layout-nav {
    float: right;
}
.ivu-dropdown-rel a {
  color:#fff;
}
</style>
