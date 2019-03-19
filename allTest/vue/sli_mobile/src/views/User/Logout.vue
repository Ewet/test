<template>
    <StructPage>
        <Header
            title="登出"
            slot="header"
        ></Header>
        <div slot="content">
            登出成功！
        </div>
    </StructPage>
</template>

<script>
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import { TOKEN } from 'const/cacheKey';
import { removeItem } from 'utils/cache';
export default {
  data () {
    return {
    };
  },
  mounted () {
    removeItem(TOKEN);
  },
  components: {
    StructPage,
    Header
  }
};
</script>
<style lang="less" scoped>
@import '~@/assets/color.less';

.completeBtn{
  width: 60%;
  height: 0.9rem;
  border: none;
  font-size: 0.32rem;
  color: #fff;
  display: block;
  border-radius: 4px;
  margin: 0.3rem auto 0 auto;
  background-color: #a669c2;
}

</style>
