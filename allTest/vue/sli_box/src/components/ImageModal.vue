<template>
    <Modal
        :title="imgTitle"
        :value="imgModal"
        @on-cancel="setImageModal(false)"
        :footer-hide="true"
        :width="800">
        <img :src='imgUrl' v-if="imgModal" style="width: 100%"/>
    </Modal>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations(['setImageModal'])
  },
  computed: {
    ...mapState(['imgTitle', 'imgModal', 'imgUrl'])
  }
};
</script>
