<template>
<div>
    <div class="dataTitle">材料查询</div>
    <Row class="activeRow">
      <Col>
      <Select v-model="material" placeholder="品名及规格"  filterable allow-create @on-create="handleCreatepro">
              <Option v-for="material in matList" :value="material.value" :key="material.value">{{ material.label }}</Option>
            </Select>
            </Col>
            <Col>
            <Button type="primary" @click="getList">查询</Button>
            </Col>
        </Row>
    <Table stripe border size="small" highlight-row height="600" ref="modelTable" :columns="columns" :data="clgl"></Table>

</div>
</template>

<script>
import { getclgl } from '../../../api/forms'
export default {
  data () {
    return {
      modal1: false,
      curDay: '',
      material: '',
      matList: [
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
      columns: [
        {
          title: '材料名称',
          key: 'material'
        },
        {
          title: '库存数量(KG)',
          key: 'total'
        },
        {
          title: '更新时间',
          key: 'time'
        }
      ],
      clgl: [
        {
          material: '',
          total: '',
          time: ''
        }
      ]
    }
  },
  methods: {
    getList () {
      getclgl(this.material).then(res => {
        const data = res.data
        if (data.status === 1) {
          this.$Message.error(data.message)
          console.log(data.message)
        } else {
          const time = res.data.time
          const time1 = time.length === 0 ? '当前查询的材料数据为空' : time[0].createtime
          this.clgl = [{ material: this.material, total: res.data.total, time: time1 }]
        }
      }).catch(err => {
        this.$Message.error('网络错误，请重试！')
        reject(err)
      })
    },
    ok () {
      if (this.clgl.length === 0) {
        this.$Message.info('数据是空的，请检查确认！')
      } else {
        this.$refs.modelTable.exportCsv({ filename: '旭佰餐具包装报表', columns: this.columns, data: this.data })
        this.$Message.info('恭喜，导出成功！')
      }
    },
    cancel () {
      this.$Message.info('已取消')
    },
    handleCreatepro (val) {
      this.matList.push({
        value: val,
        label: val
      })
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
