<template>
<div>
    <div class="dataTitle" >模压车间质检报表</div>
         <Row class="activeRow">
            <DatePicker type="date"
            placeholder="Select date"
            style="width: 200px"
            onkeyup="value=value.replace(/[^(\d{4})-(\d{2})-(\d{2})$]/g,'')"
            @on-change="currentDay"></DatePicker>
            <Button type="primary" @click="getList">查询</Button>
            <Button type="success" @click="openForm">新增录入</Button>
            <Button type="error" @click="modal1= true" >导出数据</Button>
        </Row>
    <Table stripe border  highlight-row width="3000" height="600" ref="modelTable" size="small" :columns="columns" :data="zjsj"></Table>
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
import { getzjsj } from '../../../api/forms'
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
          width: '90'
        },
        {
          title: '订单号',
          key: 'order'
        },
        {
          title: '班次',
          key: 'work'
        },
        {
          title: '班长姓名',
          key: 'monitorname'
        },
        {
          title: '机台号',
          key: 'num',
          width: '70'
        },
        {
          title: '员工姓名',
          key: 'staff'
        },
        {
          title: '原料',
          key: 'material'
        },
        {
          title: '工时',
          key: 'worktime',
          width: '60'
        },
        {
          title: '模出',
          key: 'model',
          width: '70'
        },
        {
          title: '料号',
          key: 'matnum'
        },
        {
          title: '上班余料',
          key: 'lastsurplus'
        },
        {
          title: '当班领料',
          key: 'curreceive'
        },
        {
          title: '当班余料',
          key: 'curremain'
        },
        {
          title: '实际用料',
          key: 'usage'
        },
        {
          title: '光粉上班余料',
          key: 'lastsurplusG'
        },
        {
          title: '当班领光粉',
          key: 'curreceiveG'
        },
        {
          title: '当班余光粉',
          key: 'curremainG'
        },
        {
          title: '当班用光粉',
          key: 'usageG'
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
          title: '一等品',
          key: 'one'
        },
        {
          title: '二等品',
          key: 'two'
        },
        {
          title: '生产总数',
          key: 'totalprod'
        },
        {
          title: '一等用料',
          key: 'oneusage'
        },
        {
          title: '耗料',
          key: 'loss'
        },
        {
          title: '利用率',
          key: 'usagerate'
        },
        {
          title: '模压工艺',
          key: 'craft'
        },
        {
          title: '定量',
          key: 'quantity'
        },
        {
          title: '单价',
          key: 'unitprice'
        },
        {
          title: '计件工资',
          key: 'totalprice'
        },
        {
          title: '奖金',
          key: 'bonus'
        },
        {
          title: '计时',
          key: 'timing'
        },
        {
          title: '换模',
          key: 'exemodel'
        },
        {
          title: '罚款',
          key: 'fine'
        },
        {
          title: '合计工资/元',
          key: 'lottery'
        },
        {
          title: '备注',
          key: 'remark'
        }

      ],
      zjsj: []
    }
  },
  methods: {
    currentDay (e) {
      // 当前选择的日期
      this.curDay = e
    },
    getList () {
      getzjsj(this.curDay).then(res => {
        const data = res.data
        if (data.status === 1) {
          this.$Message.error(data.message)
        } else {
          const result = res.data.results
          this.zjsj = result
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
    handleSave () {
      // console.log(this.editDate)
      const str = this.editDate
      const reg = /^(\d{4})-(\d{2})-(\d{2})$/
      console.log(reg.exec(str))
      if (!reg.test(str) || parseInt(RegExp.$1) > 2022 || parseInt(RegExp.$2) > 12 || parseInt(RegExp.$2) < 1 || parseInt(RegExp.$3) > 31 || parseInt(RegExp.$3) < 1) {
        // this.$Message.error('日期格式错误，请重新输入！')
        this.$Message.error({
          background: true,
          duration: 2,
          content: '日期格式错误，请重新输入！'
        })
      } else {
      }
    },
    ok () {
      if (this.data.length === 0) {
        this.$Message.info('数据是空的，请检查确认！')
      } else {
        this.$refs.modelTable.exportCsv({ filename: '旭佰餐具质检报表', columns: this.columns, data: this.data })
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
