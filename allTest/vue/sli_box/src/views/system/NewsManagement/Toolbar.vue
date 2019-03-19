<template>
    <Form inline class="toolBarBox">
          <FormItem>
            <!-- <p>总共{{total}}条数据</p> -->
            <p>   </p>
          </FormItem>
          <FormItem>
            <div style="display: flex;">
              <Select v-model="filterObj.sort">
                  <Option
                  v-for="(item,index) in statusOptions"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                  ></Option>
              </Select>
              <DetermineBtn style="margin-left:10px;" @click="handleSubmit"/>
            </div>
          </FormItem>
    </Form>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'MessageToolbar',
  data () {
    return {
      filterObj: {
        sort: 0
      },
      statusOptions: [
        {
          name: '按日期倒序',
          value: 0
        },
        {
          name: '正序',
          value: 1
        }
      ]
    };
  },
  methods: {
    handleSubmit () {
      this.filterData({
        sort: this.filterObj.sort,
        pageSize: 20
      });

      // let startTime = '';
      // let endTime = '';
      // let creatTime = this.filterObj.creatTime;
      // if (creatTime.length && creatTime.every(x => !!x) > 0) {
      //   startTime = fecha.format(creatTime[0], 'YYYY-MM-DD HH:mm:ss');
      //   endTime = fecha.format(creatTime[1], 'YYYY-MM-DD HH:mm:ss');
      // }
      // this.filterData({
      //   'name': this.trim(this.filterObj.name),
      //   'start_time': startTime,
      //   'end_time': endTime
      // });
    }

  }
};
</script>

<style lang="">
  .toolBarBox{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .toolBarBox p{
    font-size: 12px;
    font-weight: bold;
  }
</style>
