<template>
    <StructPage bgImg="lottery-bg">
        <Header
            title="我的红包"
            slot="header"
            :transparentBar="true"
        ></Header>
        <div slot="content" v-html="content">
            我的红包
        </div>
    </StructPage>
</template>

<script>
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import { NavBar } from 'vant';
export default {
  data () {
    return {
    };
  },
  mounted () {
  },
  methods: {
  },
  components: {
    StructPage,
    NavBar,
    Header
  }
};
</script>
<style lang="less">
</style>
