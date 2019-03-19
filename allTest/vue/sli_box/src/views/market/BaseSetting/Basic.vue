<template>
   <Form ref="formInline">
        <FormItem label="分销层级">
            <RadioGroup v-model="level">
                <Radio :label="1">关闭分销</Radio>
                <Radio :label="2">一级</Radio>
                <Radio :label="3">二级</Radio>
            </RadioGroup>
        </FormItem>
         <FormItem label="分销内购" >
            <RadioGroup v-model="purchase">
                <Radio :label="1">关闭</Radio>
                <Radio :label="2">开启</Radio>
            </RadioGroup>
        </FormItem>
    <p>开启分销内购，分销商自己购买商品，享受一级佣金，上级享受耳机佣金，上上级享受三级佣金。</p>
    <FormItem>
        <Button type="primary">确定</Button>
    </FormItem>
   </Form>
  </div>
</template>
<script>
export default {
  name: 'BaseSettingBasic',
  data () {
    return {
      level: 1,
      purchase: 1
    };
  }
};
</script>
