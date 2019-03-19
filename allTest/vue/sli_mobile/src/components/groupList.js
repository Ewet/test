import { Toast } from 'vant';
import fecha from 'fecha';
export default {
  'methods': {
    scroll () {
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      if (scrollTop === 0 || this.list.length === 0) {
        this.showFixed = false;
        this.list.forEach(x => (x.fixed = false));
      }
      let aGroupHead = document.getElementsByClassName('js-header');
      let list = this.list;
      if (list.length === aGroupHead.length) {
        for (let index = 0; index < aGroupHead.length; index++) {
          const element = aGroupHead[index];
          const offsetTop = element.offsetTop;
          try {
            if (scrollTop >= offsetTop && scrollTop > 0) {
              this.showFixed = true;
              list[index].fixed = true;
            } else {
              list[index].fixed = false;
            }
          } catch (ex) {
            console.log(list, index, ex.message);
          }
        }
      }
    },
    selectDate (val) {
      this.filterTime = fecha.format(val, 'YYYY-MM-DD hh:mm:ss');
      this.showCalendar = false;
      this.finished = true;
      this.current = 1;
      this.loadData(({
        hasMore
      } = {
        hasMore: true
      }) => {
        setTimeout(() => {
          this.finished = !hasMore;
          if (!hasMore) {
            this.showNoMoreData = true;
          }
        }, 500);
      });
    },
    onRefresh () {
      this.loadAjaxData(() => {
        this.filterTime = '';
        this.current = 1;
        this.finished = true;
      }, ({
        hasMore
      }) => {
        setTimeout(() => {
          this.topLoading = false;
        }, 500);
        this.finished = !hasMore;
        if (this.finished) {
          this.$nextTick(() => {
            this.showNoMoreData = true;
          });
        }
      });
    },
    onLoad () {
      this.$nextTick(() => {
        this.loadAjaxData(undefined, ({
          hasMore
        }) => {
          this.bottomLoading = false;
          this.finished = !hasMore;
          if (this.finished) {
            this.$nextTick(() => {
              this.showNoMoreData = true;
            });
          }
        });
      });
    },
    // 加载异步数据
    loadAjaxData (beforeCallback = () => {}, afterCallback = () => {}) {
      beforeCallback.call(this);
      this.getList({
        'pagination[page]': this.current,
        'create_time': this.filterTime
      }).then(({
        success,
        data,
        msg
      }) => {
        afterCallback.call(this, data);
        if (success) {
          if (this.current === 1) {
            this.list = [];
            this.list = data.items;
          } else {
            let list = this.list;
            data.items.forEach(g => {
              let index = list.findIndex(e => e.key === g.key);
              if (index !== -1) {
                this.list[index].items = this.list[index].items.concat(g.items);
              } else {
                this.list.push(g);
              }
            });
          }
          this.current++;
          this.loaded = true;
        } else if (msg) {
          Toast(msg);
        }
      });
    },
    loadData (callback = (data) => {}) {
      this.loadAjaxData();
    },
    getList () {
    }
  }
};
