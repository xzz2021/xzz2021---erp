<template>
<div>
    <div class="dataTitle">密胺原料出入库</div>
     <Row class="activeRow">
            <DatePicker type="date"
            placeholder="Select date"
            style="width: 200px"
            @on-change="currentDay"></DatePicker>
            <Button type="primary" @click="getList">查询</Button>
            <Button type="success" @click="openForm">新增录入</Button>
            <Button type="error" @click="modal1= true" >导出数据</Button>
        </Row>
    <Table stripe border size="small" highlight-row height="600" ref="modelTable" :columns="columns" :data="mayl"></Table>
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
import { getmayl } from '../../../api/forms'
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
          key: 'date'

        },
        {
          title: '单据号',
          key: 'order'
        },
        {
          title: '品名及规格',
          key: 'material'
        },
        {
          title: '数量(包)',
          key: 'num'
        },
        {
          title: '重量/包',
          key: 'weight'
        },
        {
          title: '总重量(KG)',
          key: 'totalweight'
        },
        {
          title: '出库/入库',
          key: 'warehouse',
          sortable: true
        },
        {
          title: '收货方签名',
          key: 'person'
        },
        {
          title: '卸料',
          key: 'outstore'
        },
        {
          title: '供应商',
          key: 'company'
        },
        {
          title: '备注',
          key: 'remark'
        }

      ],
      mayl: []
    }
  },
  methods: {
    currentDay (e) {
      // 当前选择的日期
      this.curDay = e
    },
    getList () {
      getmayl(this.curDay).then(res => {
        const data = res.data
        if (data.status === 1) {
          this.$Message.error(data.message)
        } else {
          const result = res.data.results
          this.mayl = result
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
    // handleSave () {
    //   // console.log(this.editDate)
    //   const str = this.editDate
    //   const reg = /^(\d{4})-(\d{2})-(\d{2})$/
    //   console.log(reg.exec(str))
    //   if (!reg.test(str) || parseInt(RegExp.$1) > 2022 || parseInt(RegExp.$2) > 12 || parseInt(RegExp.$2) < 1 || parseInt(RegExp.$3) > 31 || parseInt(RegExp.$3) < 1) {
    //     // this.$Message.error('日期格式错误，请重新输入！')
    //     this.$Message.error({
    //       background: true,
    //       duration: 2,
    //       content: '日期格式错误，请重新输入！'
    //     })
    //   } else {
    //   }
    // },
    ok () {
      if (this.mayl.length === 0) {
        this.$Message.info('数据是空的，请检查确认！')
      } else {
        this.$refs.modelTable.exportCsv({ filename: '密胺原料报表', columns: this.columns, data: this.data })
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
