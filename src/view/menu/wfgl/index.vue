<template>
<div>
    <div class="dataTitle">密胺原料出库</div>
     <Row class="activeRow">
            <DatePicker type="month" placeholder="按月份查询" style="width: 200px" @on-change="currentMonth"></DatePicker>
            <Button type="primary" @click="getList">查询</Button>
            <Button type="error" @click="modal1= true" >导出数据</Button>
        </Row>
    <Table stripe border size="small" highlight-row height="600" ref="modelTable" :columns="columns" :data="wfgl"></Table>

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
import { getwfgl } from '../../../api/forms'
export default {
  data () {
    return {
      modal1: false,
      curMonth: '',
      columns: [
        {
          title: '出库时间',
          key: 'date'

        },
        {
          title: '品名及规格',
          key: 'material'
        },
        {
          title: '出库/入库',
          key: 'warehouse'
        },
        {
          title: '数量(KG)',
          key: 'totalweight'
        },
        {
          title: '出库人',
          key: 'outstore'
        },
        {
          title: '外发厂家',
          key: 'company'
        },
        {
          title: '备注',
          key: 'remark'
        }

      ],
      wfgl: []
    }
  },
  methods: {
    currentMonth (e) {
      // 当前选择的日期
      this.curMonth = e
    },
    getList () {
      getwfgl(this.curMonth).then(res => {
        console.log(this.curMonth)
        const data = res.data
        if (data.status === 1) {
          this.$Message.error(data.message)
        } else {
          this.wfgl = res.data.results
          this.$Message.info(data.message)
        }
      }).catch(err => {
        console.log('报错的信息', err)
        this.$Message.error('网络错误，请重试！')
        reject(err)
      })
    },
    ok () {
      if (this.wfgl.length === 0) {
        this.$Message.info('数据是空的，请检查确认！')
      } else {
        this.$refs.modelTable.exportCsv({ filename: '旭佰餐具包装报表', columns: this.columns, data: this.data })
        this.$Message.info('恭喜，导出成功！')
      }
    },
    cancel () {
      this.$Message.info('已取消')
    }
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
