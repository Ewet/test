<template>
    <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90" >
        <div class="formBox">
            <div class="itemBox">
                <h4>活动信息</h4>
                <FormItem label="活动名称" prop="activityName" >
                    <Input
                    :readonly="readonly"
                    :maxlength="50"
                    v-model="formValidate.activityName"
                    placeholder="请输入活动名称(字数最大为50)"></Input>
                </FormItem>
                <FormItem label="活动时间" prop="activityTime" >
                    <DatePicker  @on-clear="validActivityTime"  @on-ok='validActivityTime' v-model="formValidate.activityTime" type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="活动时间范围" style="width: 100%"></DatePicker>
                </FormItem>
            </div>
            <div class="itemBox">
                <h4>奖励设置</h4>
                <FormItem label="红包金额" prop="money" >
                    <InputNumber style="width:100%;"
                      :min="1"
                      :max="9999"
                      @on-blur="money2"
                      v-model="formValidate.money"
                      clearable
                      placeholder="红包金额(1~9999￥)">
                    </InputNumber>
                </FormItem>
                <FormItem label="奖励限制" prop="restrictions" >
                    <InputNumber style="width:100%;"
                      :min="0"
                      :max="999999"
                      @on-blur="restrictionsCheck2"
                      v-model="formValidate.restrictions"
                      clearable
                      placeholder="单个用户分享后，如发放的奖励超过限制，将不发放奖励">
                    </InputNumber>
                </FormItem>
            </div>
        </div>
        <FormItem class="formBtn">
            <Button type="primary" @click="add()" v-show="Object.keys(formData).length<=0">新增</Button>
            <Button type="primary" @click="save()" v-show="Object.keys(formData).length > 0">保存</Button>
        </FormItem>

        </Form>
    </div>
</template>
<script>
import { updateItem, addItem } from './model';
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    const activityTimeCheck = (rule, value, callback) => {
      const len = value.length;
      if (len === 0 || (value[0] === '' && value[1] === '')) {
        callback(new Error('活动时间不能为空'));
      } else {
        callback();
      }
    };
    const restrictionsCheck = (rule, value, callback) => {
      if (value === null) {
        callback(new Error('奖励限制不能为空'));
      } else {
        if (this.isFloat(value)) {
          callback(new Error('请输入整数！'));
        }
        callback();
      }
    };
    return {
      formValidate: {
        activityName: '', // 活动名称
        activityTime: [], // 活动时间
        money: null, // 红包金额/ 奖励金额
        restrictions: null, // 奖励限制
        activityId: ''
      },
      ruleValidate: {
        activityName: [
          { required: true, message: '活动名称不能为空', trigger: 'blur' }
        ],
        activityTime: [
          { required: true, validator: activityTimeCheck, trigger: 'blur' }
        ],
        money: [
          {
            required: true, type: 'number', message: '红包金额不能为空', trigger: 'blur'
          }
        ],
        restrictions: [
          {
            required: true, type: 'number', validator: restrictionsCheck, trigger: 'blur'
          }
        ]

      }
    };
  },
  mounted () {

  },
  methods: {
    // 触红活动时间校验
    validActivityTime () {
      this.$nextTick(() => {
        this.$refs.formValidate.validateField('activityTime');
      });
    },
    // 触发红包金额校验
    money2 () {
      this.$refs.formValidate.validateField('money');
    },
    // 触发奖励限制校验
    restrictionsCheck2 () {
      this.$refs.formValidate.validateField('restrictions');
    },

    // 判断是否思浮点数
    isFloat (n) {
      return /^-?\d*\.\d+$/.test(n);
    },
    // 去掉字符串两边空格
    trim (str) {
      if (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
      }
      return str;
    },
    add () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          const startTime = this.formValidate.activityTime[0];
          const endTime = this.formValidate.activityTime[1];
          const start = startTime === '' ? startTime : this.formatTime(startTime);
          const end = endTime === '' ? endTime : this.formatTime(endTime);
          addItem({
            activity_name: this.formValidate.activityName,
            start_time: start,
            end_time: end,
            amount: this.formValidate.money,
            boundary: this.formValidate.restrictions
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('新增成功！');
              this.setModal(false);
              this.reload();
              this.$refs.formValidate.resetFields();
              this.formValidate = {};
            } else {
              this.$error(msg);
            }
          });
        } else {
        }
      });
    },
    // 保存编辑资料
    save () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          const startTime = this.formValidate.activityTime[0];
          const endTime = this.formValidate.activityTime[1];
          const start = startTime === '' ? startTime : this.formatTime(startTime);
          const end = endTime === '' ? endTime : this.formatTime(endTime);

          updateItem({
            activity_id: this.formValidate.activityId,
            activity_name: this.formValidate.activityName,
            start_time: start,
            end_time: end,
            amount: this.formValidate.money,
            boundary: this.formValidate.restrictions
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('保存成功!');
              this.setModal(false);
              this.reload();
              this.$refs.formValidate.resetFields();
              this.formValidate = {};
            } else {
              this.$error(msg);
            }
          });
        } else {
        }
      });
    },
    // 时间格式化
    formatTime (timeObj) {
      const date = new Date(timeObj);
      const Y = date.getFullYear();
      const M = this.transformation(date.getMonth() + 1);
      const D = this.transformation(date.getDate());
      const h = this.transformation(date.getHours());
      const m = this.transformation(date.getMinutes());
      const s = this.transformation(date.getSeconds());
      const str = `${Y}-${M}-${D} ${h}:${m}:${s}`;
      return str;
    },
    // 补零
    transformation (num) {
      return num < 10 ? `0${num}` : num;
    }

  },

  watch: {
    showModal (val) {
      if (!val) {
        this.setReadonly(false);
      }
    },
    formData (val) {
      this.$refs.formValidate.resetFields();
      if (Object.keys(val).length > 0) {
        this.formValidate.activityId = this.formData.activityId;//   创建名称
        this.formValidate.activityName = this.formData.activityName;//   创建名称
        this.formValidate.activityTime[0] = this.formData.startTime;//   活动开始时间
        this.formValidate.activityTime[1] = this.formData.endTime;//   活动结束时间
        this.formValidate.money = parseFloat(this.formData.amount);// 奖励金额
        this.formValidate.restrictions = parseInt(this.formData.limit);// 奖励限制次数
        // this.formValidate.coverUrl = this.formData.imageUrl;// 活动图片地址
      } else {
        this.formValidate = {
          activityName: '', // 活动名称
          activityTime: [], // 活动时间
          money: null, // 红包金额/ 奖励金额
          restrictions: null // 奖励限制
        };
      }
    }
  },
  components: {

  },
  computed: {

  }
};
</script>
<style lang="less">
.ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {
    background-color: #fff;
}
</style>
<style lang="less" scoped>
.formBox{
  clear: both;
  ::-webkit-input-placeholder{/*Webkit browsers*/
    color:#999;
  }
  :-moz-placeholder{/*Mozilla Firefox 4 to 8*/
    color:#999;
  }
  ::moz-placeholder{/*Mozilla Firefox 19+*/
    color:#999;
  }
  :-ms-input-placeholder{/*Internet Explorer 10+*/
    color:#999;
  }
}
.formBtn{
  text-align:right;
  margin-top: 20px;
}
.itemBox>h4{
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px solid #dcdee2;
    height: 30px;
    line-height: 30px;
    margin-bottom: 30px;
}
.cover{
    width: 100px;
    height: 100px;
    border: 1px solid #dcdee2;
    border-radius: 4px;

}
.cover img{
    display: block;
    height: 100%;
    overflow: hidden;
    cursor: pointer;
}

</style>
