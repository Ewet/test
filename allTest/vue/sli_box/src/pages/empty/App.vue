<template>
 <div class="layout">
<layout>
    <StructPage activeName="/index.html">
    </StructPage>
</layout>
 </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.$error('当前用户没有权限');
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
