<template>
    <Card :bordered="false">
        <p slot="title">导出条件</p>
        <div>
            <Tag
                v-for="(item) in items"
                :key="item.key"
                closable
                color="primary"
                :name="item.key"
                @on-close="handleRemove"
                >{{item.text}}</Tag>
            <Form label-position="top" style="margin-top:20px;">
              <FormItem label='盒子编号'>
                  <Input
                  v-model="boxSn"
                  type="textarea"
                  placeholder="请输入内容"/>
              </FormItem>
              <p>多个盒子请用英文逗号“,”隔开</p>
              <FormItem>
                <Button type="primary" @click="handleExport">导出</Button>
              </FormItem>
            </Form>
        </div>
    </Card>
</template>

<script>
import { debounce } from 'lodash';

export default {
  props: {
    filterItems: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      items: [],
      boxSn: ''
    };
  },
  created () {
    this.$g_on('export_report_clear', this.handleClear);
    this.handleExport = debounce(this.handleExport, 500);
  },
  beforeDestroy () {
    this.$g_off('export_report_clear', this.handleClear);
  },
  mounted () {
    this.items = [...this.filterItems];
  },
  methods: {
    newGuid () {
      let guid = '';
      for (let i = 1; i <= 32; i++) {
        const n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i === 8) || (i === 12) || (i === 16) || (i === 20)) { guid += '-'; }
      }
      return guid;
    },
    handleExport () {
      this.$emit('export', {
        items: this.items,
        boxSn: this.boxSn
      });
    },
    handleRemove (event, name) {
      this.items = this.items.filter(x => x.key !== name);
    },
    handleClear () {
      this.boxSn = '';
      this.items = [];
    }
  },
  watch: {
    filterItems (val) {
      if (val) {
        this.items = val.map(x => ({ ...x, key: this.newGuid() }));
      }
    }
  }
};
</script>

<style lang="less" scoped>

</style>
