<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
      <div v-if="!prizeId">
          <FormItem label="奖品类型" prop="prizeType">
            <Select v-model="formValidate.prizeType" placeholder="奖品类型">
                <Option
                v-for="(item,index) in prizeOptions"
                :key="index"
                :label="item.name"
                :value="item.value"
                ></Option>
            </Select>
          </FormItem>
          <FormItem label="红包金额(/元)" prop="rewardAmount" v-show="formValidate.prizeType==='1'">
            <InputNumber
            :max="9999.99"
            :min="0"
            v-model="formValidate.rewardAmount"
            placeholder="请输入红包金额"
            @on-blur="amountCheck()"
            style="width:100%;"
            ></InputNumber>
          </FormItem>
          <FormItem label="优惠券选择" prop="couponType" v-show="formValidate.prizeType==='2'">
            <Select v-model="formValidate.couponType" placeholder="优惠券类型">
                <Option
                v-for="(item,index) in couponOptions"
                :key="index"
                :label="item.name"
                :value="item.value"
                ></Option>
            </Select>
          </FormItem>
          <FormItem label="实物名称" prop="physicalName" v-show="formValidate.prizeType==='3'">
            <Input :maxlength="30" v-model="formValidate.physicalName" placeholder="请输入实物名称"></Input>
          </FormItem>
    </div>
          <FormItem label="奖品数量" prop="prizeQuantity">
            <InputNumber
            :max="999999"
            :min="0"
            :precision="0"
            v-model="formValidate.prizeQuantity"
            placeholder="请输入奖品数量"
            style="width:100%;"
            @on-blur="quantityCheck()"
            ></InputNumber>
          </FormItem>
          <!-- <FormItem label="奖品排序" prop="prizeOrder">
            <InputNumber
            :max="999999"
            :min="0"
            :disabled="isdisable"
            v-model="formValidate.prizeOrder"
            placeholder="请输入奖品排序"
            style="width:100%;"
            ></InputNumber>
          </FormItem> -->
        <FormItem label="奖品图片" prop="imageId">
            <Upload
              ref="upload"
              v-if="!formValidate.imageId"
              :on-success="handleUpload"
              :format="['jpg','jpeg','png', 'gif', 'bmp']"
              :data="uploadData"
              :action= "UploadUrl"
              :with-credentials="true"
              :max-size="15*1024"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              name="pic"
            >
              <Button icon="ios-cloud-upload-outline">上传图片</Button>
            </Upload>
            <div class="demo-upload-list" v-else>
              <img :src="formValidate.prizeImgUrl" alt="">
              <div class="demo-upload-list-cover">
                <!-- <Icon type="ios-trash-outline" @click.native="handleRemove()" v-if="status!==10||(status===10&&!prizeId)"></Icon> -->
                <Icon type="ios-trash-outline" @click.native="handleRemove()"></Icon>
              </div>
            </div>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="add('formValidate')" v-show="!prizeId">新增</Button>
            <Button type="primary" @click="save('formValidate')" v-show="prizeId">保存</Button>
        </FormItem>
        <Modal title="View Image" v-model="visible">
          <img :src="formValidate.prizeImgUrl" v-if="visible" style="width: 100%">
        </Modal>
      </Form>
</template>
<script>

import {
  getItem, updateItem, addItem, getCouponList
} from './model';
import vuexMixins from 'mixins/module-map';
import { UPLOAD_URL } from '@/const/url';
import { debounce } from 'lodash';

import { STORE_NAME } from '../store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'weChatprizeSettingsEdit',
  data () {
    const validateRewardAmount = (rule, value, callback) => {
      if (this.formValidate.prizeType === '1' && (value === '' || value === null)) {
        return callback(new Error('红包金额不能为空'));
      }
      callback();
    };
    const validateCouponType = (rule, value, callback) => {
      if (this.formValidate.prizeType === '2' && !value) {
        return callback(new Error('优惠券分类不能为空'));
      }
      callback();
    };
    const validatePhysicalName = (rule, value, callback) => {
      if (this.formValidate.prizeType === '3' && (this.trim(value) === '' || value === null)) {
        return callback(new Error('实物名称不能为空'));
      }
      callback();
    };
    const validateImageId = (rule, value, callback) => {
      if (this.formValidate.imageId) {
        callback();
      } else {
        callback(new Error('请选择奖品图片'));
      }
    };
    return {
      visible: false,
      prizeOptions: [
        {
          value: '1',
          name: '奖金'
        },
        {
          value: '2',
          name: '优惠券'
        },
        {
          value: '3',
          name: '实物'
        }
      ],
      couponOptions: [],
      UploadUrl: UPLOAD_URL,
      uploadData: {
        source: 'uf_mb'
      },
      formValidate: {
        // activityId: '',
        prizeType: '',
        rewardAmount: null,
        couponType: '',
        physicalName: '',
        prizeQuantity: null,
        imageId: '',
        prizeImgUrl: ''
        // prizeOrder: null
      },
      ruleValidate: {
        prizeType: [
          {
            required: true,
            message: '奖品分类不能为空',
            trigger: 'change'
          }
        ],
        rewardAmount: [
          {
            required: true,
            validator: validateRewardAmount,
            type: 'number'
          }
        ],
        couponType: [
          {
            required: true,
            validator: validateCouponType,
            type: 'number',
            trigger: 'change'
          }
        ],
        physicalName: [
          {
            required: true,
            validator: validatePhysicalName,
            trigger: 'blur'
          }
        ],
        prizeQuantity: [
          {
            required: true,
            type: 'number',
            message: '数量不能为空'
          }
        ],
        imageId: [
          {
            required: true,
            validator: validateImageId
          }
        ]
        // prizeOrder: [
        //   {
        //     required: true,
        //     type: 'number',
        //     message: '奖品排序不能为空'
        //   }
        // ]

      }

    };
  },
  computed: {
    isdisable () {
      return (this.status === 10 && this.prizeId !== '');
    }
  },
  mounted () {

  },
  created () {
    this.add = debounce(this.add, 500);
    this.save = debounce(this.save, 500);
  },
  methods: {
    // 去空格
    trim (str) {
      if (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
      }
      return str;
    },
    amountCheck () {
      this.$refs.formValidate.validateField('rewardAmount');
    },
    quantityCheck () {
      this.$refs.formValidate.validateField('prizeQuantity');
    },
    // orderCheck () {
    //   this.$refs['formValidate'].validateField('prizeOrder');
    // },
    async loadData () {
      this.spinShow = true;
      const { success, data, msg } = await getCouponList();
      console.log(data);
      if (success) {
        this.couponOptions = data.map(x => ({
          value: x.couponId,
          name: x.name
        }));
      } else if (msg) {
        this.$error(msg);
      }
      this.handleReset();
      if (this.prizeId) {
        const { success, data, msg } = await getItem(this.prizeId);
        if (success) {
          this.formValidate = {
            prizeType: data.prizeType,
            rewardAmount: data.amountFormatted,
            couponType: data.couponType,
            physicalName: data.prizeName,
            prizeQuantity: data.prizeQuantity,
            imageId: data.imageId,
            prizeImgUrl: data.prizeImgUrl
            // prizeOrder: data.prizeOrder
          };
        } else if (msg) {
          this.$error(msg);
        }
        this.spinShow = false;
      } else {
        this.formValidate = {
          prizeType: '',
          rewardAmount: null,
          couponType: '',
          physicalName: '',
          prizeQuantity: null,
          imageId: '',
          prizeImgUrl: ''
          // prizeOrder: null
        };
      }
    },
    /*
      图片上传限制start
    */
    handleFormatError () {
      this.$error('图片格式不正确, 请选择jpg/jpeg/png/gif/bmp格式的图片.');
    },
    handleMaxSize () {
      // console.log(file);
      this.$error('超过图片大小限制,图片大小不要超过15M.');
    },
    // 上传文件
    handleUpload (ref, file) {
      this.formValidate.imageId = ref.data.file_id;
      this.formValidate.prizeImgUrl = ref.data.file_url;
      this.$refs.formValidate.validateField('imageId');
    },
    handleView (name, url) {
      this.visible = true;
      // this.$store.commit('showImage', {
      //   title: name,
      //   url: url
      // });
    },
    handleRemove () {
      this.formValidate.imageId = '';
      this.formValidate.prizeImgUrl = '';
    },
    /*
      图片上传限制end
    */
    getFormData () {
      const type = this.formValidate.prizeType;
      return {
        prize_type: type,
        prize_name: type === '3' ? this.formValidate.physicalName : '',
        coupon_id: type === '2' ? this.formValidate.couponType : '',
        amount: type === '1' ? this.formValidate.rewardAmount : '',
        quantity: this.formValidate.prizeQuantity,
        // prize_order: this.formValidate.prizeOrder,
        image_file_id: this.formValidate.imageId
      };
    },
    add (name) {
      this.$refs.formValidate.validate(async (valid) => {
        if (valid) {
          const { success, msg } = await addItem({
            ...this.getFormData(),
            activity_id: this.activityId
          });
          if (success) {
            this.$success('新增成功！');
            this.setPrizeEditModal(false);
          } else {
            this.$error(msg);
          }
        }
      });
    },
    save (name) {
      this.$refs.formValidate.validate(async (valid) => {
        if (valid) {
          const { success, msg } = await updateItem({
            ...this.getFormData(),
            prize_id: this.prizeId
          });
          if (success) {
            this.$success('保存成功!');
            this.setPrizeEditModal(false);
            this.setPrizeId('');
          } else {
            this.$error(msg);
          }
        }
      });
    },
    handleReset (name) {
      this.$refs.formValidate.resetFields();
    }
  },
  watch: {
    showPrizeEditModal (val) {
      if (val) {
        this.handleReset();
        this.loadData();
      }
    }
  },
  components: {
  }
};
</script>
<style lang="less" scoped>
.demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
