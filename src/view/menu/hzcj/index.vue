<template>
<div>
    <div class="dataTitle">旭佰餐具花纸车间报表</div>
     <Row class="activeRow">
            <DatePicker type="date"
            placeholder="请选择日期"
            style="width: 200px"
            @on-change="currentDay"></DatePicker>
            <Button type="primary" @click="getList">查询</Button>
            <Button type="success" @click="openForm">新增录入</Button>
            <Button type="error" @click="modal1= true" >导出数据</Button>
        </Row>
    <Table stripe border size="small" highlight-row height="600" ref="modelTable" :columns="columns" :data="hzcj"></Table>
    <!-- 新增录入的子组件 -->
      <addForm ref="openForm" />
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
import { gethzcj } from '../../../api/forms'
import addForm from './addform.vue'
export default {
  components: { addForm },
  data () {
    return {
      modal1: false,
      curDay: '',
      columns: [
        {
          title: '订单号',
          key: 'order'
        },
        {
          title: '品名',
          key: 'product'
        },
        {
          title: '花色',
          key: 'color'
        },
        {
          title: '版出',
          key: 'model'
        },
        {
          title: '刷花/张',
          key: 'shua'
        },
        {
          title: '剪花/张',
          key: 'jian'
        },
        {
          title: '备注',
          key: 'remark'
        }
      ],
      hzcj: []
    }
  },
  methods: {
    currentDay (e) {
      // 当前选择的日期
      this.curDay = e
    },
    getList () {
      gethzcj(this.curDay).then(res => {
        const data = res.data
        // console.log(data.message)
        if (data.status === 1) {
          this.$Message.error(data.message)
        } else {
          const result = res.data.results
          this.hzcj = result
        }
      }).catch(err => {
        this.$Message.error('网络错误，请重试！')
        reject(err)
      })
    },
    openForm () {
      this.$refs.openForm.open()
    },
    ok () {
      if (this.hzcj.length === 0) {
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
.dataTitle{
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
