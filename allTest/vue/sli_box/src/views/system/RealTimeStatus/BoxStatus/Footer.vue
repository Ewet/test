<template>
   <div class="boxStatusFooter">
        <table border="0" width="100%" cellspacing="0">
            <tbody>
                <tr>
                    <th>图标解释</th>
                    <td>
                    <WordImg :word="'不存在的层'" :icon="4"/>&nbsp;
                    <WordImg :word="'未知状态'" :icon="3"/>&nbsp;
                    <WordImg :word="'有酒'" :icon="1"/>&nbsp;
                    <WordImg :word="'无酒'" :icon="2"/>&nbsp;
                    <p v-if="boxType === 1" style="display: inline;">
                        <WordImg :word="'有人'" :icon="5"/>&nbsp;
                        <WordImg :word="'无人'" :icon="6"/>&nbsp;
                    </p>
                    <WordImg :word="'门开着的'" :icon="7"/>&nbsp;
                    <WordImg :word="'门关着的'" :icon="8"/>&nbsp;
                    </td>
                </tr>
            </tbody>
        </table>
   </div>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import WordImg from './WordImg';
import { STORE_NAME } from '../store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    return {

    };
  },
  components: {
    WordImg
  }
};
</script>

<style scoped lang='less'>
.boxStatusFooter{
    table{
        border-collapse: collapse;
        td,th{
            border:1px solid #e8e8e8;
            word-break: break-all;
            padding: 6px 8px;
        }
    }
}
</style>
