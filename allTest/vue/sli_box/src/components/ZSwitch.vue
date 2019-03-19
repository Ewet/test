<template>
     <span class="zswitch" @click="handleClick">
          <a-switch
          :defaultChecked="defaultChecked"
          :checked="checked"
          >
              <slot name="open" slot="checkedChildren"></slot>
              <slot name="close" slot="unCheckedChildren"></slot>
          </a-switch>
     </span>
</template>
<script>
import { Switch } from 'ant-design-vue';

export default {
  props: {
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    },
    size: {
      type: String,
      default: 'default'
    },
    fetch: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      loading: false,
      defaultChecked: false,
      checked: false
    };
  },
  mounted () {
    this.checked = this.value === this.trueValue;
  },
  methods: {
    async handleClick () {
      if (this.fetch !== null) {
        this.loading = true;
        const { success, msg } = await this.fetch();
        if (success) {
          this.$emit('input', this.checked ? this.falseValue : this.trueValue);
        } else {
          this.$error(msg);
        }
        this.loading = false;
      } else {
        this.$emit('input', this.checked ? this.falseValue : this.trueValue);
      }
    }
  },
  watch: {
    value (val) {
      this.checked = val === this.trueValue;
    }
  },
  components: {
    [Switch.name]: Switch
  }
};
</script>

<style lang="less" scoped>
.zswitch{
  display: inline-block;
}
</style>
