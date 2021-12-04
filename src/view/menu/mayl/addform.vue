<template>
<el-dialog title="密胺原料录入" :visible.sync="show" width="700px" center>
    <Form ref="mayl" :model="mayl" v-show="true" :rules="ruleValidate" :label-width="100">
      <Row>
        <FormItem label="日期" prop="date" >
           <Input v-model="mayl.date"
           placeholder="日期" clearable></Input>
        </FormItem>
        <FormItem label="单据号" prop="order" >
            <Input v-model="mayl.order" placeholder="单据号" clearable></Input>
        </FormItem>
        <FormItem label="品名及规格" prop="material">
            <Select v-model="mayl.material" placeholder="品名及规格"  filterable multiple allow-create @on-create="handleCreatepro">
              <Option v-for="material in proList" :value="material.value" :key="material.value">{{ material.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="数量(包)" prop="num" >
            <Input v-model="mayl.num" placeholder="数量(包)" clearable></Input>
        </FormItem>
        <FormItem label="重量(包)" prop="weight" >
            <Input v-model="mayl.weight" placeholder="重量(包)" clearable></Input>
        </FormItem>
         <FormItem label="总重量(KG)" prop="totalweight" >
            <Input v-model="mayl.totalweight" placeholder="总重量(KG)" clearable></Input>
        </FormItem>
        <FormItem label="出库/入库" prop="warehouse">
            <Select v-model="mayl.warehouse" placeholder="出库/入库" filterable clearable>
              <Option value="出库">出库</Option>
              <Option value="入库">入库</Option>
            </Select>
        </FormItem>
        <FormItem label="收货方签名" prop="person" >
            <Input v-model="mayl.person" placeholder="收货方签名" clearable></Input>
        </FormItem>
       <FormItem label="卸料" prop="outstore" >
            <Input v-model="mayl.outstore" placeholder="卸料" clearable></Input>
        </FormItem>
        <FormItem label="供应商" prop="company" >
            <Input v-model="mayl.company" placeholder="供应商" clearable></Input>
        </FormItem>
        <FormItem label="备注" prop="remark">
            <Input v-model="mayl.remark" type="textarea" placeholder=""></Input>
        </FormItem>
       </Row>
    </Form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleReset('mayl')">清空输入</el-button>
            <el-button type="primary" @click="handleSubmit('mayl')">提交</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { submayl } from '../../../api/forms'

export default {
  data () {
    return {
      show: false,
      proList: [
        { value: 'A1185', label: 'A1185' },
        { value: 'A1351', label: 'A1351' },
        { value: 'A123', label: 'A123' },
        { value: 'A1250', label: 'A1250' },
        { value: 'A1335', label: 'A1335' },
        { value: 'A1357', label: 'A1357' },
        { value: 'A117', label: 'A117' },
        { value: 'A1355', label: 'A1355' },
        { value: 'A3266', label: 'A3266' },
        { value: 'A5286', label: 'A5286' },
        { value: 'A4226', label: 'A4226' },
        { value: 'A3227', label: 'A3227' },
        { value: 'B6076', label: 'B6076' },
        { value: 'B6074', label: 'B6074' },
        { value: 'A7060', label: 'A7060' },
        { value: 'B6699', label: 'B6699' },
        { value: 'GR8701', label: 'GR8701' },
        { value: 'B6700', label: 'B6700' },
        { value: 'A4224', label: 'A4224' },
        { value: 'A4227', label: 'A4227' },
        { value: 'A7098', label: 'A7098' },
        { value: 'M239', label: 'M239' },
        { value: 'M226', label: 'M226' },
        { value: 'M7193', label: 'M7193' }
      ],
      mayl: {
        date: '',
        order: '',
        material: '',
        num: '',
        weight: '',
        totalweight: '',
        warehouse: '',
        person: '',
        outstore: '',
        company: '',
        remark: ' '
      },
      ruleValidate: {
        date: [
          { required: true, message: '这里忘了填了！', trigger: 'blur' }
        ],
        order: [
          { required: true, message: '这里忘了填了！', trigger: 'blur' }
        ],
        material: [
          { type: 'array', required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        num: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        weight: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        totalweight: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        warehouse: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        person: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        outstore: [
          { required: true, message: '这里忘了填了！', trigger: 'change' }
        ],
        company: [
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
      this.mayl.date = m + '月' + d + '日'
    },
    open () {
      this.show = true
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.mayl.material = (this.mayl.material).join('+')
          // this.mayl.color = (this.mayl.color).join('+')
          // this.mayl.craft = (this.mayl.craft).join('+')
          submayl(this.mayl).then(res => {
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
