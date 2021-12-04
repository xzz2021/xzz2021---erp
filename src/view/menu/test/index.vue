<template>
<div>
      <Row class="activeRow">
            <DatePicker type="date"
            :value="today"
            placeholder="请选择日期"
            style="width: 200px"
            onkeyup="value=value.replace(/[^(\d{4})-(\d{2})-(\d{2})$]/g,'')"
            @on-change="currentDay"></DatePicker>
            <Button type="primary" @click="getList">查询</Button>
            <Button type="success" @click="openFullModal">新增录入</Button>
            <Button type="error" @click="modal1 = true" >导出数据</Button>
        </Row>
  <Table height="600"
  ref="modelTable"
  :columns="columns"
  :data="data">

    <template slot-scope="{ row, index }" slot="date">
      <Input type="text" v-model="editDate" v-if="editIndex === index" clearable/>
      <span v-else>{{ row.date }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="staff">
       <Select type="text" v-model="editStaff" v-if="editIndex === index" clearable filterable>
                <Option value="小二">小二</Option>
                <Option value="张三">张三</Option>
                <Option value="大盘子">大盘子</Option>
            </Select>
      <span v-else>{{ row.staff }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="order">
      <Input type="text" v-model="editOrder" v-if="editIndex === index" />
      <span v-else>{{ row.order }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="product">
       <Select type="text" v-model="editProduct" v-if="editIndex === index" clearable filterable>
                <Option value="17.5寸带耳托盘">17.5寸带耳托盘</Option>
                <Option value="5寸圆盘">5寸圆盘</Option>
                <Option value="大盘子">大盘子</Option>
            </Select>
      <span v-else>{{ row.product }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="action">
      <div v-if="editIndex === index">
        <Button type='success' @click="handleSave(index)">保存</Button>
        <Button type='error' @click="editIndex = -1">取消</Button>
      </div>
      <div v-else>
        <Button type='success' @click="handleEdit(row, index)">操作</Button>
      </div>
    </template>
  </Table>
      <Modal
        v-model="modal1"
        title="欢迎使用"
        @on-ok="ok"
        @on-cancel="cancel"
          width="300">
      <br><p>需要导出当日数据吗？</p><br>
    </Modal>
      <Modal v-model="modalFull"
        @on-ok="submit"
        @on-cancel="cancelSub"
        fullscreen title="录入数据">
    </Modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      modal1: false,
      modalFull: false,
      curDay: '',
      today: '',
      exportData: [],
      columns: [
        {
          title: '日期',
          slot: 'date'
        },
        {
          title: '员工姓名',
          slot: 'staff'
        },
        {
          title: '订单号',
          slot: 'order'
        },
        {
          title: '产品名称',
          slot: 'product'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ],
      data: [
        {
          date: '2022-01-25',
          staff: '刘德华',
          order: '2314',
          product: '17.5寸带耳托盘'
        },
        {
          date: '2022-01-23',
          staff: '刘德华',
          order: '2314',
          product: '17.5寸带耳托盘'
        }
      ],
      editIndex: -1, // 当前聚焦的输入框的行数
      editDate: '', // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      editStaff: '', // 第二列输入框
      editOrder: '', // 第三列输入框
      editProduct: '' // 第四列输入框
    }
  },
  methods: {
    currentDay (e) {
      // 当前选择的日期
      this.curDay = e
    },
    getToday () {
      const td = new Date()
      let y = td.getFullYear()
      let m = td.getMonth() + 1
      let d = td.getDate()
      const l = '-'
      if (m < 10) {
        m = '0' + m
      }
      if (d < 10) {
        d = '0' + d
      }
      this.today = y + l + m + l + d
      this.data[0].date = this.today
    },
    getList () {
      // 获取当前list
      // axios.get('/list', this.curDay).then((res) => {
      //   this.data1 = res.data
      // })
      console.log(this.curDay)
    },
    openFullModal () {
      this.modalFull = true
    },
    handleEdit (row, index) {
      this.editDate = row.date
      this.editStaff = row.staff
      this.editOrder = row.order
      this.editProduct = row.product
      this.editIndex = index
    },
    handleSave (index) {
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
        this.data[index].date = this.editDate
        this.data[index].staff = this.editStaff
        this.data[index].order = this.editOrder
        this.data[index].product = this.editProduct
        this.editIndex = -1
      }
    },
    ok () {
      // this.exportData = this.columns.concat()
      // this.columns.pop()
      // console.log(this.exportData)
      // this.$refs.modelTable.exportCsv({ filename: '旭佰餐具包装报表', columns: this.columns, data: JSON.parse(JSON.stringify(this.data)) })
      console.log(this.data)
      // this.columns.concat()
      this.$Message.info('恭喜，导出成功！')
    },
    cancel () {
      this.$Message.info('已取消')
    },
    cancelSub () {
      this.$Message.info('已取消提交')
    },
    submit () {
      this.$Message.info('数据提交成功！')
    }
  },
  mounted () {
    this.getToday()
  }
}
</script>
<style>
.activeRow {
  margin: 10px 0;
}
.activeRow button {
  margin: 0 20px;
}
</style>
