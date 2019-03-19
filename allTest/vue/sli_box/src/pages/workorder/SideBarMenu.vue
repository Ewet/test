<template>
    <SideMenu :data="menu" :openNames="openNames" :activeName="activeName"></SideMenu>
</template>

<script>
import { getMenu } from 'model/authManagement';
import { getBadge } from 'views/workorder/MyWorkOrder/model';

import urlUtils from 'utils/url';

export default {
  data () {
    return {
      menu: [],
      activeName: '',
      openNames: [0],
      map: {}
    };
  },
  components: {
  },
  methods: {
    async loadMenu () {
      const { success, data, msg } = await getMenu();
      if (success) {
        const { menu, map } = data;
        this.map = map;
        const items = menu.filter(x => x.routerName === 'workorder.html');
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
              this.openNames = [map[routerName].parentIndex];
            } else {
              this.activeName = items[0].items[0].items[0].routerName;
              this.openNames = [items[0].items[0].items[0].parentIndex];
              const url = map[this.activeName].url;
              if (url) {
                localStorage.setItem('iframeIndexSrc', url);
              }
              if (this.activeName.includes('_')) {
                const [, type] = this.activeName.split('_');
                this.$router.push({
                  name: this.activeName,
                  query: { type }
                });
                return false;
              }
              this.$router.push({
                name: this.activeName,
                query: { random: new Date().getTime() }
              });
            }
          });
          this.menu = items[0].items;
        }
      } else {
        this.$error(msg);
      }
    }
  },
  mounted () {
    this.loadMenu();
    setInterval(() => {
      getBadge().then(({ success, data, msg }) => {
        if (success) {
          let x = 2;
          let item = this.map[`MyWorkOrder_${x}`];
          if (item) {
            this.$set(item, 'count', data.count);
          }
        } else {
          this.$error(msg);
        }
      });
    }, 3000);
  }
};
</script>

<style lang="less" scoped>

</style>
