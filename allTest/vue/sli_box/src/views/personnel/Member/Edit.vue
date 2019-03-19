<template>
    <div class='edit'>
      <div class='img'>
        <img :src="formData.memberIcon">
      </div>
      <Form class='content' :label-width="86">
         <FormItem label='会员ID：'>
        {{formData.memberId ? formData.memberId : '无'}}
        </FormItem>
        <FormItem label='会员昵称：'>
         {{formData.memberName ? formData.memberName : '无'}}
        </FormItem>
        <FormItem label='手机号码：'>
         {{formData.phone ? formData.phone : '无'}}
        </FormItem>
      </Form>
      <Button style='float:right;margin:40px 0 10px' @click="setViewModal(false)">关闭</Button>
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'member',
  // mixins: [vuexMixins({moduleName: 'member'})],
  data () {
    return {
    };
  },
  methods: {

  }

};
</script>
<style scoped>
.edit{
  clear: both;
  overflow: hidden;
}
.edit .img{
  width: 70px;
  height: 70px;
  margin: 10px auto 25px;
}
.edit .img img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.content .ivu-form-item{
  margin-bottom: 10px;
  margin-left: 50px;
}

</style>
