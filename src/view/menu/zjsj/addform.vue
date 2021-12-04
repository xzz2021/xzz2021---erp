<template>
<el-dialog title="质检录入" :visible.sync="show" width="1000px" center>
    <Form ref="zjsj" :model="zjsj" v-show="true" :rules="ruleValidate" :label-width="110">
      <Row>
        <FormItem label="日期" prop="date" >
           <Input v-model="zjsj.date"
           placeholder="日期" clearable></Input>
        </FormItem>
        <FormItem label="订单号" prop="order" >
            <Input v-model="zjsj.order" placeholder="订单号" clearable></Input>
        </FormItem>
        <FormItem label="班次" prop="work">
            <Select v-model="zjsj.work" placeholder="班次" clearable filterable>
                <Option value="白">白</Option>
                <Option value="夜">夜</Option>
            </Select>
        </FormItem>
        <FormItem label="班长姓名" prop="monitorname" >
            <Input v-model="zjsj.monitorname" placeholder="班长姓名" clearable></Input>
        </FormItem>
        <FormItem label="机台号" prop="num" >
            <Input v-model="zjsj.num" placeholder="机台号" clearable></Input>
        </FormItem>
         <FormItem label="员工姓名" prop="staff" >
            <Input v-model="zjsj.staff" placeholder="员工姓名" clearable></Input>
        </FormItem>
        <FormItem label="原料" prop="material">
            <Input v-model="zjsj.material" placeholder="原料" clearable></Input>
        </FormItem>
        <FormItem label="工时" prop="worktime" >
            <Input v-model="zjsj.worktime" placeholder="工时" clearable></Input>
        </FormItem>
          <FormItem label="模出" prop="model">
            <Select v-model="zjsj.model" placeholder="模出" clearable filterable>
                <Option value="1*4">1*1</Option>
                <Option value="1*2">1*2</Option>
                <Option value="1*3">1*3</Option>
                <Option value="1*4">1*4</Option>
                <Option value="1*5">1*5</Option>
                <Option value="1*6">1*6</Option>
                <Option value="1*8">1*8</Option>
                <Option value="1*10">1*10</Option>
                <Option value="1*14">1*14</Option>
                <Option value="1*16">1*16</Option>
                <Option value="1*24">1*24</Option>
                <Option value="1*28">1*28</Option>
                <Option value="1*88">1*88</Option>
            </Select>
        </FormItem>
        <FormItem label="料号" prop="matnum">
            <Select v-model="zjsj.matnum" placeholder="料号" clearable filterable>
                <Option value="A1185">A1185</Option>
                <Option value="A1180">A1180</Option>
            </Select>
        </FormItem>
        <FormItem label="上班余料" prop="lastsurplus" >
            <Input v-model="zjsj.lastsurplus" placeholder="上班余料" clearable></Input>
        </FormItem>
        <FormItem label="当班领料" prop="curreceive" >
            <Input v-model="zjsj.curreceive" placeholder="当班领料" clearable></Input>
        </FormItem>
        <FormItem label="当班余料" prop="curremain" >
            <Input v-model="zjsj.curremain" placeholder="当班领料" clearable></Input>
        </FormItem>

        <FormItem label="实际用料" prop="usage" >
            <Input v-model="zjsj.usage" placeholder="实际用料" clearable></Input>
        </FormItem>
        <FormItem label="光粉上班余料" prop="lastsurplusG" >
            <Input v-model="zjsj.lastsurplusG" placeholder="上班余料" clearable></Input>
        </FormItem>
        <FormItem label="当班领光粉" prop="curreceiveG" >
            <Input v-model="zjsj.curreceiveG" placeholder="当班领料" clearable></Input>
        </FormItem>
        <FormItem label="当班余光粉" prop="curremainG" >
            <Input v-model="zjsj.curremainG" placeholder="当班领料" clearable></Input>
        </FormItem>

        <FormItem label="当班用光粉" prop="usageG" >
            <Input v-model="zjsj.usageG" placeholder="实际用料" clearable></Input>
        </FormItem>
        <FormItem label="花色" prop="color">
            <Select v-model="zjsj.color" placeholder="花色" filterable multiple allow-create @on-create="handleCreatepro">
              <Option v-for="color in colorList" :value="color.value" :key="color.value">{{ color.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="克重" prop="weight" >
            <Input v-model="zjsj.weight" placeholder="克重" clearable></Input>
        </FormItem>
        <FormItem label="一等品" prop="one" >
            <Input v-model="zjsj.one" placeholder="一等品" clearable></Input>
        </FormItem>
        <FormItem label="二等品" prop="two" >
            <Input v-model="zjsj.two" placeholder="二等品" clearable></Input>
        </FormItem>
        <FormItem label="生产总数" prop="totalprod" >
            <Input v-model="zjsj.totalprod" placeholder="生产总数" clearable></Input>
        </FormItem>
        <FormItem label="一等用料" prop="oneusage" >
            <Input v-model="zjsj.oneusage" placeholder="一等用料" clearable></Input>
        </FormItem>
        <FormItem label="耗料" prop="loss" >
            <Input v-model="zjsj.loss" placeholder="耗料" clearable></Input>
        </FormItem>
        <FormItem label="利用率" prop="usagerate" >
            <Input v-model="zjsj.usagerate" placeholder="利用率" clearable></Input>
        </FormItem>
       <FormItem label="模压工艺" prop="craft">
            <Select v-model="zjsj.craft" placeholder="工艺名称" filterable multiple allow-create @on-create="handleCreatepro">
              <Option v-for="craft in craftList" :value="craft.value" :key="craft.value">{{ craft.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="定量" prop="quantity" >
            <Input v-model="zjsj.quantity" placeholder="定量" clearable></Input>
        </FormItem>
        <FormItem label="单价" prop="unitprice" >
            <Input v-model="zjsj.unitprice" placeholder="单价" clearable></Input>
        </FormItem>
        <FormItem label="计件工资" prop="totalprice" >
            <Input v-model="zjsj.totalprice" placeholder="计件工资" clearable></Input>
        </FormItem>
        <FormItem label="奖金" prop="bonus" >
            <Input v-model="zjsj.bonus" placeholder="奖金" clearable></Input>
        </FormItem>
        <FormItem label="计时" prop="timing" >
            <Input v-model="zjsj.timing" placeholder="计时" clearable></Input>
        </FormItem>
        <FormItem label="换模" prop="exemodel" >
            <Input v-model="zjsj.exemodel" placeholder="换模" clearable></Input>
        </FormItem>
        <FormItem label="罚款" prop="fine" >
            <Input v-model="zjsj.fine" placeholder="罚款" clearable></Input>
        </FormItem>
      </Row>
      <Row>
        <FormItem label="合计工资" prop="lottery" >
            <Input v-model="zjsj.lottery" placeholder="合计工资/元" clearable></Input>
        </FormItem>
       </Row>
        <FormItem label="备注" prop="remark">
            <Input v-model="zjsj.remark" type="textarea" placeholder=""></Input>
        </FormItem>
        <FormItem style="margin-left: 400px">
            <Button @click="handleReset('zjsj')" >清空输入</Button>
            <Button type="primary" @click="handleSubmit('zjsj')" style="margin-left: 20px">提交</Button>
        </FormItem>
    </Form>
    </el-dialog>
</template>
<script>
import { subzjsj } from '../../../api/forms'

export default {
  data () {
    return {
      show: false,
      colorList: [
        { value: '梅花', label: '梅花' },
        { value: '白菠萝', label: '白菠萝' },
        { value: '粉边', label: '粉边' },
        { value: '黑红', label: '黑红' },
        { value: '红色', label: '红色' },
        { value: '蝴蝶', label: '蝴蝶' },
        { value: '花色1', label: '花色1' },
        { value: '灰色', label: '灰色' },
        { value: '金边', label: '金边' },
        { value: '金框边', label: '金框边' },
        { value: '兰花', label: '兰花' },
        { value: '兰色', label: '兰色' },
        { value: '蓝', label: '蓝' },
        { value: '狼头', label: '狼头' },
        { value: '绿菠萝', label: '绿菠萝' },
        { value: '绿甲虫', label: '绿甲虫' },
        { value: '绿水彩', label: '绿水彩' },
        { value: '木纹', label: '木纹' },
        { value: '柠檬', label: '柠檬' },
        { value: '四叶草', label: '四叶草' },
        { value: '小黄花', label: '小黄花' },
        { value: '薰衣草', label: '薰衣草' },
        { value: '叶子', label: '叶子' },
        { value: '郁金香', label: '郁金香' },
        { value: '棕色', label: '棕色' }
      ],
      craftList: [
        { value: '抛边', label: '抛边' },
        { value: '抛面', label: '抛面' },
        { value: '磨边', label: '磨边' },
        { value: '转孔', label: '转孔' },
        { value: '过叶轮', label: '过叶轮' },
        { value: '挫耳', label: '挫耳' }
      ],
      zjsj: {
        date: '',
        order: '',
        work: '',
        monitorname: '',
        num: '',
        staff: '',
        material: '',
        worktime: '',
        model: '',
        matnum: '',
        lastsurplus: '',
        curreceive: '',
        curremain: '',
        usage: '',
        lastsurplusG: '',
        curreceiveG: '',
        curremainG: '',
        usageG: '',
        color: '',
        weight: '',
        one: '',
        two: '',
        totalprod: '',
        oneusage: '',
        loss: '',
        usagerate: '',
        craft: '',
        quantity: '',
        unitprice: '',
        totalprice: '',
        bonus: '',
        timing: '',
        exemodel: '',
        fine: '',
        lottery: '',
        remark: ''
      },
      ruleValidate: {
        date: [
          { required: true, message: '这里忘了填了！', trigger: 'blur' }
        ],
        order: [
          { required: true, message: '这里忘了填了！', trigger: 'blur' }
        ],
        work: [
          { required: true, message: '这里忘了填了！', trigger: 'blur' }
        ],
        monitorname: [
          { required: true, message: '这里忘了填了！', trigger: 'blur' }
        ],
        num: [
          { required: true, message: '这里忘了填了！', trigger: 'blur' }
        ],
        staff: [
          { required: true, message: '这里忘了填了！', trigger: 'blur' }
        ],
        material: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        worktime: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        model: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        matnum: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        lastsurplus: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        curreceive: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        curremain: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        usage: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        lastsurplusG: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        curreceiveG: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        curremainG: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        usageG: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        color: [
          { type: 'array', required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        weight: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        one: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        two: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        totalprod: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        oneusage: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        loss: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        usagerate: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        craft: [
          { type: 'array', required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        quantity: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        unitprice: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        totalprice: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        lottery: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    currentDay (e) {
      // 当前选择的日期
      this.curDay = e
    },
    getToday () {
      const td = new Date()
      let m = td.getMonth() + 1
      let d = td.getDate()
      if (m < 10) {
        m = '0' + m
      }
      if (d < 10) {
        d = '0' + d
      }
      this.zjsj.date = m + '月' + d + '日'
    },
    open () {
      this.show = true
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // this.zjsj.product = (this.zjsj.product).join('+')
          this.zjsj.color = (this.zjsj.color).join('+')
          this.zjsj.craft = (this.zjsj.craft).join('+')
          subzjsj(this.zjsj).then(res => {
            if (res.status === 1) {
              alert('提交的数据有误，请检查后重新提交！')
            }
          })
          this.$Message.success('哈哈，提交成功')
          this.show = false
          setTimeout(this.$parent.getList, 500)
        } else {
          this.$Message.error({
            background: true,
            content: '输入数据不完整，请检查一下!'
          })
        }
      })
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
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    handleCreatepro (val) {
      this.proList.push({
        value: val,
        label: val
      })
    }
  },
  mounted () {
    this.getToday()
  }
}
</script>
<style>
FormItem {
  background-color: rgb(238, 36, 36);
}
</style>
