<template>
<div class="cr-list">
<nav-bar
  title="消费记录"
  left-arrow
  @click-left="back"
  :fixed="true"
  :zIndex="9"
/>
  <div v-show="showFixed" class="group">
        <header
        v-show="item.fixed"
        v-for="(item,i) in list" :key="i"
        class="group-header"
        style="position:fixed;top:46px;left:0;right:0;z-index:2;">
            <h3>{{item.name}}</h3>
            <span>消费支出￥1652.57</span>
            <icon  name="calendar" class="cell__right-icon" @click="showCalendar = true"/>
        </header>
    </div>
<pull-refresh v-model="isLoading" @refresh="onRefresh">

 <list
            v-model="loading"
            :finished="finished"
            @load="onLoad"
            >
    <div class="group" v-for="(item,i) in list" :key="i">
        <header class="group-header js-header">
            <h3>{{item.name}}</h3>
            <span>消费支出￥1652.57</span>
            <icon  name="calendar" class="cell__right-icon" @click="showCalendar = true"/>
        </header>
        <ul class="group-body">
            <li v-for="index in item.items" :key="index">
                <div>
                    <icon  name="money"/><p>法国龙船小庄园750ml<br/>2012年</p>
                    <span>03-16  15:03:25</span>
                </div>
                <div>-1343.25<br/>等待发货
                </div>
            </li>
        </ul>
    </div>
 </list>
 </pull-refresh>
 <popup v-model="showCalendar" position="bottom">
 <datetime-picker
  v-model="currentDate"
  type="year-month"
  @confirm="selectDate"
  @cancel="showCalendar=false"
/>
</popup>
</div>
</template>
<script>
import { NavBar, Popup, Toast, List, PullRefresh } from 'vant';
export default {
  data () {
    return {
      showCalendar: false,
      currentDate: new Date(),
      isLoading: false,
      list: [{
        name: '本月',
        fixed: false,
        items: [1, 2, 3, 4, 5, 6, 7]
      }, {
        name: '二月',
        fixed: false,
        items: [1, 2, 3, 4, 5, 6, 7]
      }, {
        name: '一月',
        fixed: false,
        items: [1, 2, 3, 4, 5, 6, 7]
      }
      ],
      loading: false,
      finished: false,
      showFixed: true
    };
  },
  mounted () {
    window.addEventListener('scroll', this.scroll);
  },
  methods: {
    scroll () {
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      if (scrollTop === 0) {
        this.showFixed = false;
        this.list.forEach(x => (x.fixed = false));
      }
      let aGroupHead = document.getElementsByClassName('js-header');
      for (let index = 0; index < aGroupHead.length; index++) {
        const element = aGroupHead[index];
        const offsetTop = element.offsetTop;
        if (scrollTop >= offsetTop && scrollTop > 0) {
          this.showFixed = true;
          this.list[index].fixed = true;
        } else {
          this.list[index].fixed = false;
        }
      }
    },
    selectDate (val) {
      Toast(val.toString());
      this.showCalendar = false;
    },
    onRefresh () {
      this.list.forEach(x => (x.fixed = false));
      setTimeout(() => {
        this.list = [];
        for (let i = 0; i < 10; i++) {
          this.list.push({
            name: 10 - i + '月',
            fixed: false,
            items: [1, 2, 3, 4, 5, 6, 7]
          });
        }
        this.loading = false;

        if (this.list.length >= 40) {
          this.finished = true;
        }
        this.isLoading = false;
      }, 500);
    },
    onLoad () {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push({
            name: 10 - i + '月',
            fixed: false,
            items: [1, 2, 3, 4, 5, 6, 7]
          });
        }
        this.loading = false;

        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    back () {
      this.$replace({
        name: 'MemberCenter'
      });
    },
    edit (item) {
      this.$go({
        name: 'AddressEdit',
        query: {
          id: 123
        }
      });
    },
    del (item) {

    },
    add () {
      this.$go({
        name: 'AddressEdit'
      });
    },
    css (element, name, value) {
      if (!value) {
        return window.getComputedStyle(element, null).getPropertyValue(name);
      }
    }
  },
  components: {NavBar, Popup, List, PullRefresh}
};
</script>

<style  lang="less" scoped>
@import '~@/assets/color.less';

.cr-list {
    font-size: .26rem;
    padding-top: 46px;
    p{
        margin: 0;
    }
    .group {
        .group-header {
            // position: relative;
            transform: translateZ(0);
            z-index: 2;
            padding: 0.13rem 0.4rem;
            width: 100%;
            box-sizing: border-box;
            background-color: #efeff4;
            // transition: all .5s;
            h3 {
                margin: 0;
                font-size: .3rem;
            }
            span {
                font-size: 0.22rem;
                color: #aaa;
            }
            .van-icon {
                position: absolute;
                right: 0.4rem;
                top: 0.4rem;
            }
        }
        .group-body{
            font-size: 0.26rem;
            li {
                display: flex;
                justify-content: space-between;
                padding: 0.23rem 0.25rem;
                margin-bottom: 0.02rem;
                height: 1.6rem;
                box-sizing: border-box;
                background: #fff;
                div:nth-child(1) {
                    flex:1;
                    p {
                        font-size: .3rem;
                    }
                    span {
                        color:#aaa;
                    }
                    .van-icon-money {
                        float: left;
                        width: 1rem;
                        height: 1rem;
                        margin-right: 0.25rem;
                        color: @primaryColor;
                        font-size: 1rem;
                    }
                }
                div:nth-child(2) {
                    line-height: .5rem;
                }
            }
        }
    }
}

</style>
