<template>
 <div class="layout">
<layout>
    <StructPage activeName="/index.html">
    </StructPage>
</layout>
 </div>
</template>

<script>
import { getMenu } from 'model/authManagement';

export default {
  name: 'App',
  mounted () {
    getMenu().then(({ success, data, msg }) => {
      if (success) {
        const menu = data.menu.filter(x => x.items.length > 0);
        if (menu.length > 0) {
          location.href = menu[0].routerName;
        } else {
          this.$error('当前用户没有权限');
        }
      } else {
        this.$error(msg);
      }
    });
  },
  components: {
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
