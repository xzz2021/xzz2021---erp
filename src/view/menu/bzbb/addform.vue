<template>
<el-dialog title="包装录入" :visible.sync="show" width="920px" center>
    <Form ref="bzbb" :model="bzbb" v-show="true" :rules="ruleValidate" :label-width="80">
      <Row>
        <FormItem label="日期" prop="date" >
           <Input v-model="bzbb.date"
           placeholder="日期" clearable></Input>
        </FormItem>
         <FormItem label="包装员工" prop="staff" >
            <Input v-model="bzbb.staff" placeholder="包装员工" clearable></Input>
        </FormItem>
        <FormItem label="订单号" prop="order" >
            <Input v-model="bzbb.order" placeholder="订单号" clearable></Input>
        </FormItem>
        <FormItem label="产品名称" prop="product">
            <Select v-model="bzbb.product" placeholder="品名"  filterable multiple allow-create @on-create="handleCreatepro">
              <Option v-for="product in proList" :value="product.value" :key="product.value">{{ product.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="花色" prop="color">
            <Select v-model="bzbb.color" placeholder="花色" filterable multiple allow-create @on-create="handleCreatepro">
              <Option v-for="color in colorList" :value="color.value" :key="color.value">{{ color.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="克重" prop="weight" >
            <Input v-model="bzbb.weight" placeholder="克重" clearable></Input>
        </FormItem>
        <FormItem label="装箱个数" prop="boxnum" >
            <Input v-model="bzbb.boxnum" placeholder="装箱个数" clearable></Input>
        </FormItem>
        <FormItem label="条形码" prop="barcode">
            <Select v-model="bzbb.barcode" placeholder="条形码" clearable filterable>
                <Option value="√">有</Option>
                <Option value="无">无</Option>
            </Select>
        </FormItem>
           <FormItem label="垫纸" prop="paper">
            <Select v-model="bzbb.paper" placeholder="垫纸" clearable filterable>
                <Option value="√">有</Option>
                <Option value="无">无</Option>
            </Select>
        </FormItem>
           <FormItem label="PP纸" prop="pp">
            <Select v-model="bzbb.pp" placeholder="PP纸" clearable filterable>
                <Option value="√">有</Option>
                <Option value="无">无</Option>
            </Select>
        </FormItem>
           <FormItem label="彩盒" prop="colorbox">
            <Select v-model="bzbb.colorbox" placeholder="彩盒" clearable filterable>
                <Option value="√">有</Option>
                <Option value="无">无</Option>
            </Select>
        </FormItem>
          <FormItem label="计时" prop="timing" >
            <Input v-model="bzbb.timing" placeholder="计时" clearable></Input>
        </FormItem>
          <FormItem label="其他" prop="other" >
            <Input v-model="bzbb.other" placeholder="其他" clearable></Input>
        </FormItem>
          <FormItem label="包装箱数" prop="boxes" >
            <Input v-model="bzbb.boxes" placeholder="包装箱数" clearable></Input>
        </FormItem>
         <FormItem label="单价" prop="unitprice">
            <Input v-model="bzbb.unitprice" placeholder="单价" clearable></Input>
        </FormItem>
        <FormItem label="金额" prop="totalprice">
            <Input v-model="bzbb.totalprice" placeholder="金额" clearable></Input>
        </FormItem>
         <FormItem label="包装个数" prop="totalnum" >
            <Input v-model="bzbb.totalnum" placeholder="包装个数" clearable></Input>
        </FormItem>
        <FormItem label="备注" prop="remark" width="200px">
            <Input v-model="bzbb.remark" type="textarea" placeholder=""></Input>
        </FormItem>
       </Row>
    </Form>
    <span slot="footer" class="dialog-footer">
            <el-button @click="handleReset('bzbb')">清空输入</el-button>
            <el-button type="primary" @click="handleSubmit('bzbb')">提交</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { subbzbb } from '../../../api/forms'

export default {
  data () {
    return {
      show: false,
      proList: [
        { value: '圆杯', label: '圆杯' },
        { value: '样品', label: '样品' },
        { value: '高杯', label: '高杯' },
        { value: '方杯', label: '方杯' },
        { value: '饭勺', label: '饭勺' },
        { value: '长柄勺', label: '长柄勺' },
        { value: '9寸有边汤盘', label: '9寸有边汤盘' },
        { value: '9寸无边盘', label: '9寸无边盘' },
        { value: '9寸方形深盘', label: '9寸方形深盘' },
        { value: '9.5寸圆深盘', label: '9.5寸圆深盘' },
        { value: '9.5寸无边盘', label: '9.5寸无边盘' },
        { value: '9.5寸翘角方盘', label: '9.5寸翘角方盘' },
        { value: '8寸无边盘', label: '8寸无边盘' },
        { value: '8.5寸圆碗', label: '8.5寸圆碗' },
        { value: '8.5寸圆深盘', label: '8.5寸圆深盘' },
        { value: '8.5寸无边盘', label: '8.5寸无边盘' },
        { value: '8.25寸圆形盖碗', label: '8.25寸圆形盖碗' },
        { value: '7寸无边深盘', label: '7寸无边深盘' },
        { value: '7寸无边盘', label: '7寸无边盘' },
        { value: '7寸平底汤碗', label: '7寸平底汤碗' },
        { value: '7.5寸方形深盘', label: '7.5寸方形深盘' },
        { value: '6寸平底汤碗', label: '6寸平底汤碗' },
        { value: '6.5寸圆深盘', label: '6.5寸圆深盘' },
        { value: '5寸带底方碗', label: '5寸带底方碗' },
        { value: '5.5寸翘角方盘', label: '5.5寸翘角方盘' },
        { value: '5.5寸单耳醋碗', label: '5.5寸单耳醋碗' },
        { value: '3.5寸马克杯', label: '3.5寸马克杯' },
        { value: '26CM长柄勺', label: '26CM长柄勺' },
        { value: '23CM饭勺', label: '23CM饭勺' },
        { value: '19.5寸带耳托盘', label: '19.5寸带耳托盘' },
        { value: '18寸双耳托盘', label: '18寸双耳托盘' },
        { value: '12寸螺纹碗', label: '12寸螺纹碗' },
        { value: '10寸圆形沙拉碗 ', label: '10寸圆形沙拉碗 ' },
        { value: '10寸圆形沙拉碗', label: '10寸圆形沙拉碗' },
        { value: '10寸圆碗', label: '10寸圆碗' },
        { value: '10寸有边平盘', label: '10寸有边平盘' },
        { value: '10寸无边盘', label: '10寸无边盘' },
        { value: '10寸沙拉碗', label: '10寸沙拉碗' },
        { value: '10.5寸圆方盘', label: '10.5寸圆方盘' }
      ],
      colorList: [
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
        { value: '梅花', label: '梅花' },
        { value: '木纹', label: '木纹' },
        { value: '柠檬', label: '柠檬' },
        { value: '四叶草', label: '四叶草' },
        { value: '小黄花', label: '小黄花' },
        { value: '薰衣草', label: '薰衣草' },
        { value: '叶子', label: '叶子' },
        { value: '郁金香', label: '郁金香' },
        { value: '棕色', label: '棕色' }
      ],
      bzbb: {
        date: '',
        staff: '',
        order: '',
        product: '',
        color: '',
        weight: '',
        boxnum: '',
        barcode: '',
        paper: '',
        pp: '',
        colorbox: '',
        timing: '',
        other: '',
        boxes: '',
        unitprice: '',
        totalprice: '',
        totalnum: '',
        remark: ''
      },
      ruleValidate: {
        date: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        staff: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        order: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        product: [
          { type: 'array', required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        color: [
          { type: 'array', required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        weight: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        boxnum: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        boxes: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        unitprice: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        totalprice: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        totalnum: [
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
      this.bzbb.date = m + '月' + d + '日'
    },
    open () {
      this.show = true
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.bzbb.product = (this.bzbb.product).join('+')
          this.bzbb.color = (this.bzbb.color).join('+')
          subbzbb(this.bzbb).then(res => {
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
