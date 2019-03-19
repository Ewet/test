<template>
    <StructPage>
        <Header
            slot="header"
            title="货位状态"
        />
        <div slot="content">
            <h2>货位状态内容</h2>
        </div>
    </StructPage>
</template>

<script>
import StructPage from 'components/StructPage';
import Header from 'components/Header';
export default {
  data () {
    return {
    };
  },
  mounted () {
  },
  methods: {},
  components: {
    StructPage,
    Header
  }
};
</script>
<style lang="less">
</style>
