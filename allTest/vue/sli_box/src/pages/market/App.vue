<template>
 <div class="layout">
<layout>
    <StructPage activeName="/market.html">
      <SideBarMenu slot="menu"></SideBarMenu>
    </StructPage>
</layout>
<ImageModal></ImageModal>
<GlobalSpin></GlobalSpin>
 </div>
</template>

<script>
import SideBarMenu from './SideBarMenu';

export default {
  name: 'App',
  components: {
    SideBarMenu
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
