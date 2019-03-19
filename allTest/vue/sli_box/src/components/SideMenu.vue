<template>
 <Menu :accordion="true" ref="menu" :active-name="activeName" theme="light" width="auto" style="height:100%" :open-names="openNames" @on-select="go">
    <Submenu :name="index"  v-for="(group,index) in data" :key="index">
        <template slot="title">
            <Icon type="ios-navigate"></Icon>
            {{group.name}}
        </template>
        <MenuItem
          v-for="(item) in group.items.filter(x => !x.ignore)"
          :name="item.routerName"
          :key="item.key">
          <Badge v-if="item.count && item.count > 0"
            :count="item.count"
            :offset="[0,-10]">
            {{item.name}}
          </Badge>
          <span v-else>{{item.name}}</span>
        </MenuItem>
    </Submenu>
</Menu>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    activeName: {
      type: String,
      default: ''
    },
    openNames: {
      type: Array,
      default: () => []
    }
  },
  name: 'CommonSideMenu',
  data () {
    return {
      withdrawCount: {},
      orderCount: {}
    };
  },
  methods: {
    parseURL (url) {
      const a = document.createElement('a');
      a.href = url;
      return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function () {
          const ret = {};
          const seg = a.search.replace(/^\?/, '').split('&');
          const len = seg.length;
          let i = 0;
          let s = [];
          for (;i < len; i++) {
            if (!seg[i]) { continue; }
            s = seg[i].split('=');
            ret[s[0]] = s[1];
          }
          return ret;
        }()),
        // file: (a.pathname.match(/\/([^\/?#]+)$/i) || [''])[1],
        hash: a.hash.replace('#', ''),
        // path: a.pathname.replace(/^([^\/])/, '/$1'),
        // relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
      };
    },
    go (routerName) {
      this.data.forEach((x, index) => {
        x.items.forEach((d, i) => {
          if (d.routerName === routerName) {
            if (d.url) {
              localStorage.setItem('iframeIndexSrc', d.url);
            }
            if (d.routerName.indexOf('_') !== -1) {
              const [, type] = d.routerName.split('_');
              this.$router.push({
                name: d.routerName,
                query: { ...d.query, random: new Date().getTime(), type } || {}
              });
            } else {
              this.$router.push({
                name: d.routerName,
                query: { ...d.query, random: new Date().getTime() } || {}
              });
            }
          }
        });
      });
    }
  },
  watch: {
    activeName (val) {
      // console.log('activeName change', val);
      this.$nextTick(() => {
        this.$refs.menu.updateActiveName(val);
      });
    },
    openNames (val) {
      if (val && val.length > 0) {
        this.$nextTick(() => {
          this.$refs.menu.updateOpened(val);
        });
      }
    }
  }
};
</script>
