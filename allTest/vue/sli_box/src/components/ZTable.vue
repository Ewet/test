
<template>
    <div>
        <Table
            border
            :height="height"
            :columns="mergeColumns"
            :data="items"
            :loading ="loading"
            @on-selection-change="data => $emit('on-selection-change',data)"
            @on-select="(data,row) => $emit('on-select',data,row)"
            @on-select-cancel="(data,row)=> $emit('on-select-cancel', data,row)"
            @on-select-all="(data)=> $emit('on-select-all', data)"
            @on-select-all-cancel="(data)=> $emit('on-select-all-cancel', data)"
            :disabled-hover="disabledHover">
            <slot
                name="header"
                slot="header"/>
            <slot
                name="footer"
                slot="footer"/>
            </Table>
        <Page
            v-if="showPageBar && items.length"
            :current="page"
            :total="total"
            :show-total="true"
            @on-change="num => pageChange(num)"
            :pageSize="pageSize === 'all' ? 999999 : pageSize"
            style="text-align: right;margin-top:10px"
        />
    </div>
</template>
<script>
export default {
  name: 'ZTable',
  props: {
    //   列配置
    columns: {
      type: Array,
      default: () => []
    },
    // 数据配置
    items: {
      type: Array,
      default: () => []
    },
    height: {
      type: [Number, String],
      default: null
    },
    // 是否显示加载图标
    loading: {
      type: Boolean,
      default: false
    },
    // 当前第几页
    page: {
      type: Number,
      default: 0
    },
    // 记录总数
    total: {
      type: Number,
      default: 0
    },
    // 翻页函数
    pageChange: {
      type: Function,
      default: () => {}
    },
    // 是否显示分页bar
    showPageBar: {
      type: Boolean,
      default: true
    },
    // 分页数
    pageSize: {
      type: [Number, String],
      default: 10
    },
    // 多选
    mutiple: {
      type: Boolean,
      default: false
    },
    // 禁用鼠标悬停时的高亮
    disabledHover: {
      type: Boolean,
      default: false
    }
  },
  methods: {
  },
  computed: {
    mergeColumns () {
      return this.mutiple ? [{
        type: 'selection',
        width: 60,
        align: 'center'
      }, ...this.columns] : this.columns;
    }
  }
};
</script>
