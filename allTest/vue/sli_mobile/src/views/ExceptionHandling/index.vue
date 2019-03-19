<template>
    <StructPage>
        <Header
            title="异常处理"
            slot="header"
        ></Header>
        <div slot="content">
          <ExceptionItem
            v-for="item in dataList"
            :key="item.itemId"
            :itemId="item.itemId"
            :layerNo="item.layerNo"
            @setMediaId="setMediaId"
          >
            <p slot="exceptionSelect"  @click="showModel(item.itemId)">
              <span  style="color:#969799;"  v-show="!item.exception">请选择</span>
              <span v-show="item.exception">{{item.exception}}</span>
              <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
            </p>
            <textarea  slot="textarea" class="remark" v-model="item.remark" placeholder="描述一下异常的情况"></textarea>
          </ExceptionItem>
          <popup  v-model="show" position="bottom" :overlay="true">
               <picker :columns="columns" @confirm="confirm" @cancel="cancel" :show-toolbar="true"/>
          </popup >
          <button class="submitBtn" @click="submitBtn">提交</button>
        </div>
    </StructPage>
</template>

<script>
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import ExceptionItem from './exceptionItem';
import { NavBar, Popup, Picker, Toast } from 'vant';
import {getList, submitExceptions} from 'model/exceptionHandling';
// import {submitExceptions} from 'model/exceptionHandling';
export default {
  data () {
    return {
      exceptionsArr: [],
      itemId: '',
      dataList: [],
      show: false,
      columns: ['空瓶子', '破损', '异物', '其它'],
      result: []
    };
  },
  mounted () {
    this.getExceptionsData();
  },
  methods: {
    // 判断是否为空
    isEmpty (arr) {
      let offNo = true;
      arr.forEach(item => {
        if (!item) {
          offNo = false;
        }
      });
      return offNo;
    },
    // 过滤数据
    filterData (array) {
      let arr = array.map(item => {
        let msgArr = [];
        let checkData = function (data, type) {
          if (!data) {
            if (type === 'exception') {
              msgArr.push('异常选择');
              // Toast(`异常选择不能为空`);
            } else if (type === 'remark') {
              msgArr.push('备注');
              // Toast(`备注不能为空！`);
            } else if (type === 'mediaId') {
              msgArr.push('图片');
              // Toast(`图片不能为空！`);
            }
            return false;
          }
          return data;
        };
        let detailId = checkData(item.detailId);
        let exception = checkData(item.exception, 'exception');
        let remark = checkData(item.remark, 'remark');
        let mediaId = checkData(item.mediaId, 'mediaId');
        // let mediaId = '5555';
        if (msgArr.length > 0) {
          let msgStr = msgArr.toString();
          Toast(`${msgStr}不能为空`);
        }
        if (detailId && mediaId && exception && remark) {
          return {
            'detail_id': detailId, // 详情ID
            'media_id': mediaId, // 图片文件ID
            'exception': exception, // 异常类型
            'remark': remark // 备注
          };
        } else {
          return '';
        }
      });
      return arr;
    },

    // 提交
    async submitBtn () {
      let dataList = this.filterData(this.dataList);
      let offNo = this.isEmpty(dataList);
      if (offNo) {
        let res = await submitExceptions(dataList);
        console.log('异常提交', res);
        if (res.success) {
          this.$go({name: 'MenuPage'});
        } else {
          Toast(res.msg);
          return res.msg;
        }
      }
    },

    // async getExceptionsData () {
    //   let data = [
    //     {
    //       'detailId': '41434124312542513',
    //       'layerNo': '1',
    //       'numberOfExceptions': 2
    //     },
    //     {
    //       'detailId': '41434124312542512',
    //       'layerNo': '2',
    //       'numberOfExceptions': 1
    //     }
    //   ];
    //   let dataList = [];
    //   data.forEach((item, index) => {
    //     let exceptionsNub = item.numberOfExceptions;
    //     let detailId = item.detailId;
    //     let layerNo = item.layerNo;
    //     for (let i = 0; i < exceptionsNub; i++) {
    //       let itemId = detailId + i;
    //       let itemJson = {
    //         itemId: itemId,
    //         detailId: detailId,
    //         layerNo: layerNo,
    //         mediaId: '',
    //         exception: '',
    //         remark: ''
    //       };
    //       dataList.push(itemJson);
    //     }
    //     this.dataList = dataList;
    //   });
    // },

    async getExceptionsData () {
      let replenishmentId = this.$route.query.replenishmentId;
      let {success, msg, data} = await getList({
        replenishment_id: replenishmentId
      });
      console.log('异常数据列表', data);
      if (success) {
        let dataList = [];
        data.forEach((item, index) => {
          let exceptionsNub = item.numberOfExceptions;
          let detailId = item.detailId;
          let layerNo = item.layerNo;
          for (let i = 0; i < exceptionsNub; i++) {
            let itemId = detailId + i;
            let itemJson = {
              itemId: itemId,
              detailId: detailId,
              layerNo: layerNo,
              mediaId: '',
              exception: '',
              remark: ''
            };
            dataList.push(itemJson);
          }
          this.dataList = dataList;
        });
      } else {
        return msg;
      }
    },

    // 设置图片文件ID
    setMediaId (res) {
      let itemId = res.itemId;
      let mediaId = res.mediaId;
      this.dataList.forEach(item => {
        if (item.itemId === itemId) {
          item.mediaId = mediaId;
        }
      });
    },
    showModel (id) {
      this.itemId = id;
      this.show = true;
    },
    // 确定
    confirm (value, index) {
      this.dataList.forEach((item, i) => {
        if (item.itemId === this.itemId) {
          item.exception = value;
        }
      });
      this.dataList = [...this.dataList];
      this.show = false;
    },
    // 取消
    cancel () {
      this.show = false;
    }
  },
  components: {
    StructPage,
    NavBar,
    Header,
    ExceptionItem,
    Popup,
    Picker,
    Toast
  }
};
</script>
<style lang="less">
@import '~@/assets/color.less';

.submitBtn{
  width: 100%;
  height: 0.9rem;
  border: none;
  font-size: 0.32rem;
  color: #fff;
  display: block;
  margin: 0.3rem auto 0 auto;
  background-color: #a669c2;
}

</style>
