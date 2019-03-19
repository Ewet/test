<template>
    <div>

    </div>
</template>
<script>
import { purchasingCheck } from '@/model/purchaseApplication';
import { Toast } from 'vant';
export default {
  components: {
    Toast
  },
  created () {
    this.getStatus();
  },
  methods: {
    getStatus () {
      purchasingCheck().then(result => {
        if (result.success) {
          switch (result.data.status) {
            case 601:
            case 602:
            case 603:
            case 604:
              this.$replace({
                name: 'RequestResult',
                query: {
                  status: result.data.status.toString()
                }});
              break;
            default:
              this.$replace({
                name: 'Request'});
          }
        } else if (result.code !== 401) {
          Toast(result.msg);
        }
      });
    }
  }
};
</script>
