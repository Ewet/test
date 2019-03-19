<template>
      <VueUeditorWrap
      :value="value"
      :config="config"
      @input="handleInput"
      @ready="ready"></VueUeditorWrap>
</template>
<script>
import VueUeditorWrap from 'vue-ueditor-wrap';

export default {
  name: 'ZRichText',
  props: {
    value: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default () {
        return this.$richTextConfig;
      }
    }
  },
  data () {
    return {
      intance: null
    };
  },
  components: {
    VueUeditorWrap
  },
  methods: {
    handleInput (payload) {
      this.$emit('input', payload);
    },
    ready (intance) {
      this.intance = intance;
      this.$emit('ready', intance);
    }
  }
};
</script>
