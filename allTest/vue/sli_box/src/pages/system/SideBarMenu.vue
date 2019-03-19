<template>
    <SideMenu :data="menu" :openNames="openNames" :activeName="activeName"></SideMenu>
</template>

<script>
import { getMenu } from 'model/authManagement';
import urlUtils from 'utils/url';

export default {
  data () {
    return {
      menu: [],
      activeName: '',
      openNames: [0]
    };
  },
  components: {
  },
  methods: {
    async loadMenu () {
      const { success, data, msg } = await getMenu();
      if (success) {
        const { menu, map } = data;
        const items = menu.filter(x => x.routerName === 'system.html');
        if (items.length) {
          this.$nextTick(() => {
            const { hash } = urlUtils.parseURL(location.href);
            let routerName = '';
            this.$router.options.routes.forEach((x) => {
              if (hash.includes(x.path)) {
                routerName = x.name;
              }
            });
            if (routerName) {
              this.activeName = routerName;
              this.openNames = Object.freeze([map[routerName].parentIndex]);
            } else {
              this.activeName = items[0].items[0].items[0].routerName;
              this.openNames = Object.freeze([items[0].items[0].items[0].parentIndex]);
              const url = map[this.activeName].url;
              if (url) {
                localStorage.setItem('iframeIndexSrc', url);
              }
              if (this.activeName.includes('_')) {
                const [routerName, type] = this.activeName.split('_');
                this.$router.push({
                  name: routerName,
                  query: { random: new Date().getTime(), type }
                });
                return false;
              }
              this.$router.push({
                name: this.activeName,
                query: { random: new Date().getTime() }
              });
            }
          });
          this.menu = Object.freeze(items[0].items);
        }
      } else {
        this.$error(msg);
      }
    }
  },
  mounted () {
    this.loadMenu();
  }
};
</script>

<style lang="less" scoped>

</style>
