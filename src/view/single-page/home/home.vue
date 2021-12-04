<template>
  <div>
    <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <!-- <Row>
      <Card shadow>
        <example style="height: 310px; width: 1200px" />
      </Card>
    </Row> -->
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo
  },
  data () {
    return {
      inforCardData: [
        { title: '当前仓库总量', icon: 'md-locate', count: 2324, color: '#19be6b' },
        { title: '当天入库量', icon: 'md-share', count: 657, color: '#ed3f14' },
        { title: '当天使用量', icon: 'md-chatbubbles', count: 142, color: '#E46CBB' },
        { title: '当月原料使用量', icon: 'md-map', count: 1840, color: '#9A66E4' }
      ]
    }
  },
  mounted () {
    //
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
