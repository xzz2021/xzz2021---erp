<template>
<div>
    <div class="dataTitle" >包装报表</div>
    <Row class="activeRow">
            <DatePicker type="date"
            placeholder="请选择日期"
            style="width: 200px"
            @on-change="currentDay"></DatePicker>
            <Button type="primary" @click="getList">查询</Button>
            <Button type="success" @click="openForm">新增录入</Button>
            <Button type="error" @click="modal1 = true" >导出数据</Button>
        </Row>
    <Table stripe border
    width="1350"
    height="500" ref="modelTable"
    size="small" :columns="columns"
    :data="bzbb"> </Table>
    <!-- 新增录入的子组件 -->
      <addForm ref="openForm" />
    <!-- 导出数据确认框 -->
    <Modal
        v-model="modal1"
        title="欢迎使用"
        @on-ok="ok"
        @on-cancel="cancel"
          width="300">
      <br><p>需要导出当日数据吗？</p><br>
    </Modal>

</div>
</template>

<script>
import { getbzbb } from '../../../api/forms'
import addForm from './addform.vue'
export default {
  components: { addForm },
  data () {
    return {
      modal1: false,
      curDay: '',
      columns: [
        {
          title: '日期',
          key: 'date',
          width: '100'
        },
        {
          title: '包装员工',
          key: 'staff'
        },
        {
          title: '订单号',
          key: 'order'
        },
        {
          title: '产品名称',
          key: 'product'
        },
        {
          title: '花色',
          key: 'color'
        },
        {
          title: '克重',
          key: 'weight'
        },
        {
          title: '装箱个数',
          key: 'boxnum'
        },
        {
          title: '条形码',
          key: 'barcode'
        },
        {
          title: '垫纸',
          key: 'paper'
        },
        {
          title: 'PP袋',
          key: 'pp'
        },
        {
          title: '彩盒',
          key: 'colorbox'
        },
        {
          title: '计时',
          key: 'timing'
        },
        {
          title: '其他',
          key: 'other'
        },
        {
          title: '包装箱数',
          key: 'boxes'
        },
        {
          title: '单价',
          key: 'unitprice'
        },
        {
          title: '金额',
          key: 'totalprice'
        },
        {
          title: '包装个数',
          key: 'totalnum'
        },
        {
          title: '备注',
          key: 'remark'
        }

      ],
      bzbb: []
    }
  },
  methods: {
    currentDay (e) {
      // 当前选择的日期
      this.curDay = e
    },
    getList () {
      getbzbb(this.curDay).then(res => {
        const data = res.data
        if (data.status === 1) {
          this.$Message.error(data.message)
        } else {
          const result = res.data.results
          this.bzbb = result
        }
      }).catch(err => {
        console.log('报错的信息', err)
        this.$Message.error('网络错误，请重试！')
        reject(err)
      })
    },
    openForm () {
      this.$refs.openForm.open()
    },
    ok () {
      if (this.data.length === 0) {
        this.$Message.info('数据是空的，请检查确认！')
      } else {
        this.$refs.modelTable.exportCsv({ filename: '旭佰餐具包装报表', columns: this.columns, data: this.data })
        this.$Message.info('恭喜，导出成功！')
      }
    },
    cancel () {
      this.$Message.info('已取消')
    }
  },
  mounted () {
    // this.getToday()
  }
}
</script>

<style>
.dataTitle {
    font-size: 30px;
    text-align: center;
    margin-bottom: 10px;
}
.activeRow {
  margin: 10px 0;
}
.activeRow button {
  margin: 0 20px;
}

</style>
