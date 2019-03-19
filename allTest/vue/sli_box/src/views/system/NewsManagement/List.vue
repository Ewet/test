<template>
    <div style="min-height:420px">
      <ZTable
          :height="'500'"
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :pageSize="20"
          :total="total"
          :pageChange="pageChange.bind(this)"
        />

        <!-- 删除中的content -->
        <!-- <div class="infoBox">
          <ul>
            <li>
              <p>公开日期</p>
              <div class="infoBoxMain">
                <p>${params.openDate}</p>
              </div>
            </li>
            <li>
              <p>标题</p>
              <div class="infoBoxMain">
                <p>${params.title}</p>
              </div>
            </li>
            <li>
              <p>导读</p>
              <div class="infoBoxMain">
                <p>${params.guideReading}</p>
              </div>
            </li>
            <li>
              <p>主图</p>
              <div class="infoBoxMain">
                <div class="imgBox">
                  <img src="${params.picture}" alt="">
                </div>
              </div>
            </li>
          </ul>
        </div> -->

    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';

import { delItem } from './model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'NewsList',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '创建时间',
          key: 'createTime',
          minWidth: 150
        },
        {
          title: '公开日期',
          key: 'openDate',
          minWidth: 180
        },
        {
          title: '标题',
          key: 'title',
          minWidth: 200
        },
        {
          title: '主图',
          key: 'picture',
          minWidth: 80,
          align: 'center',
          render: (h, params) => {
            const picture = params.row.picture;
            return h('div', [
              h('img', {
                style: {
                  display: 'block',
                  width: '50px',
                  margin: '10px auto',
                  maxHeight: '150px',
                  objectFit: 'cover',
                  cursor: 'pointer'
                },
                attrs: {
                  src: picture
                },
                props: {
                },
                on: {
                  click: () => {
                    this.showImg({
                      visible: true,
                      url: picture
                    });
                  }
                }
              })
            ]);
          }
        },
        {
          title: '导读',
          key: 'guideReading',
          minWidth: 400
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 120,
          align: 'center',
          render: (h, params) => h('div', [
            h('EditBtn', {
              style: {
                margin: '5px'
              },
              on: {
                click: () => {
                  this.editItem(params.row.id);
                }
              }
            }, '编辑'),
            h('DelBtn', {
              style: {
                margin: '5px'
              },
              on: {
                click: () => {
                  this.del(params.row);
                }
              }
            }, '删除')
          ])
        }
      ]
    };
  },
  mounted () {
    this.pageChange(1);
  },
  methods: {
    del (params) {
      console.log(params);
      this.$Modal.confirm({
        title: '确定删除当前记录吗？',
        width: '540px',
        content: `<div class="infoBox">
          <ul>
            <li>
              <p>公开日期</p>
              <div class="infoBoxMain">
                <p>${params.openDate}</p>
              </div>
            </li>
            <li>
              <p>标题</p>
              <div class="infoBoxMain">
                <p>${params.title}</p>
              </div>
            </li>
            <li>
              <p>导读</p>
              <div class="infoBoxMain">
                <p>${params.guideReading}</p>
              </div>
            </li>
            <li>
              <p>主图</p>
              <div class="infoBoxMain">
                <div class="imgBox">
                  <img src="${params.picture}" alt="">
                </div>
              </div>
            </li>
          </ul>
        </div>`,
        onOk: () => {
          delItem(params.id).then(({ success, msg }) => {
            if (success) {
              this.$success('删除成功!');
              this.reload();
            } else if (msg) {
              this.$error({
                content: `删除记录失败${msg}`
              });
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
  // .ivu-modal{
  //   width: auto !important;
  // }
  .infoBox{
    margin-left: -42px;
    width: 500px;
    padding: 20px 20px 10px 20px;
    border-radius: 20px;
    background-color: #fdf7f7;
    ul{
      li{
        display: flex;
        margin-bottom: 10px;
        p{
          width: 100px;
          text-align: right;
          padding-right: 20px;
          box-sizing: border-box;
          word-wrap: break-word;
        }
        .infoBoxMain{
          width: 360px;
          p{
            width: 100%;
            text-align: justify;
          }
          .imgBox{
            width: 120px;
            img{
              display: block;
              max-width: 120px;
              max-height: 120px;
            }
          }
        }
      }
    }
  }
</style>
