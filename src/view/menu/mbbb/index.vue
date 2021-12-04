<template>
<div>
    <div class="dataTitle" >旭佰餐具磨边车间日报表</div>
          <Row class="activeRow">
            <DatePicker type="date"
            placeholder="Select date"
            style="width: 200px"
            onkeyup="value=value.replace(/[^(\d{4})-(\d{2})-(\d{2})$]/g,'')"
            @on-change="currentDay"></DatePicker>
            <Button type="primary" @click="getList">查询</Button>
            <Button type="success" @click="openForm">新增录入</Button>
            <Button type="error" @click="modal1 = true" >导出数据</Button>
        </Row>
    <Table stripe border size="small" highlight-row height="600" ref="modelTable" width="1500" :columns="columns" :data="mbbb"></Table>
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
import addForm from './addform.vue'
import { getmbbb } from '../../../api/forms'

export default {
  components: { addForm },
  data () {
    return {
      modal1: false,
      curDay: '',
      columns: [
        {
          title: '日期',
          key: 'date'
        },
        {
          title: '订单号',
          width: '80',
          key: 'order'
        },
        {
          title: '员工姓名',
          key: 'staff'
        },
        {
          title: '单上日期',
          key: 'singledate'
        },
        {
          title: '班次',
          key: 'work'
        },
        {
          title: '产品名称',
          key: 'product'
        },
        {
          title: '克重',
          key: 'weight'
        },
        {
          title: '材料',
          key: 'material'
        },
        {
          title: '花色',
          key: 'color'
        },
        {
          title: '工艺名称',
          key: 'craft'
        },
        {
          title: '抛边',
          key: 'paobian'
        },
        {
          title: '抛面',
          key: 'paobian'
        },
        {
          title: '磨边',
          key: 'mobian'
        },
        {
          title: '过叶轮',
          key: 'yelun'
        },
        {
          title: '转孔',
          key: 'zhuankong'
        },
        {
          title: '金额',
          key: 'totalprice'
        },
        {
          title: '每天工资合计',
          key: 'lottery'
        }

      ],
      mbbb: []
    }
  },
  methods: {
    currentDay (e) {
      // 当前选择的日期
      this.curDay = e
    },
    getList () {
      getmbbb(this.curDay).then(res => {
        const data = res.data
        if (data.status === 1) {
          this.$Message.error(data.message)
        } else {
          const result = res.data.results
          this.mbbb = result
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
