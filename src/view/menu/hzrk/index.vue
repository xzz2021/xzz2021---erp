<template>
<div>
    <div class="dataTitle">花纸入库表</div>
     <Row class="activeRow">
            <DatePicker type="date"
            placeholder="请选择日期"
            style="width: 200px"
            @on-change="currentDay"></DatePicker>
            <Button type="primary" @click="getList">查询</Button>
            <Button type="success" @click="openForm">新增录入</Button>
            <Button type="error" @click="modal1= true" >导出数据</Button>
        </Row>
    <Table stripe border size="small" highlight-row height="600" ref="modelTable" :columns="columns" :data="hzrk"></Table>
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
import { gethzrk } from '../../../api/forms'
import addForm from './addform.vue'
export default {
  components: { addForm },
  data () {
    return {
      modal1: false,
      curDay: '',
      columns: [
        {
          title: '供货商',
          key: 'company'

        },
        {
          title: '订单号',
          key: 'order'
        },
        {
          title: '送货日期',
          key: 'date'
        },
        {
          title: '版号',
          key: 'model'
        },
        {
          title: '花色',
          key: 'color'
        },
        {
          title: '花纸名称',
          key: 'modelname'
        },
        {
          title: '实收数',
          key: 'num'
        },
        {
          title: '规格',
          key: 'spec'
        },
        {
          title: '色数',
          key: 'conum'
        },
        {
          title: '备注',
          key: 'remark'
        }

      ],
      hzrk: []
    }
  },
  methods: {
    currentDay (e) {
      // 当前选择的日期
      this.curDay = e
    },
    getList () {
      gethzrk(this.curDay).then(res => {
        const data = res.data
        if (data.status === 1) {
          this.$Message.error(data.message)
        } else {
          const result = res.data.results
          this.hzrk = result
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
        this.$refs.modelTable.exportCsv({ filename: '花纸入库报表', columns: this.columns, data: this.data })
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
