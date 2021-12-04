<template>
    <div>
    <h1>电表数据统计</h1>
<section id="main">
    <ul id="title">
        <li :class='curIndex==index ? "active": "" ' :key='item.id' v-for='(item, index) in list' @click="change(index)">{{item.title}}</li>
    </ul>
<div :class='curIndex==index ? "current": "" ' :key='item.id' v-for='(item, index) in list' >
    <!-- <Row> -->
        <DatePicker v-if="index == 0" @on-change="curDate"  type= "date" placeholder="请选择日期"  style="width: 200px; margin: 10px"></DatePicker>
        <DatePicker v-if="index == 1" @on-change="curDate"  type= "month" placeholder="请选择月份" style="width: 200px; margin: 10px"></DatePicker>
        <DatePicker v-if="index == 2" @on-change="curDate"  type= "year" placeholder="请选择年份"  style="width: 200px; margin: 10px"></DatePicker>
        <Button v-if="index == 0" type="primary" @click="getDlist" style="width: 70px" >查询</Button>
        <Button v-if="index == 1" type="warning" @click="getMlist" style="width: 70px">查询</Button>
        <Button v-if="index == 2" type="error"   @click="getYlist" style="width: 70px">查询</Button>
        <Table v-if="index == 0" width="1100" height="500" border :columns="columns1" :data="data1"></Table>
        <Table v-if="index == 1" width="1100" height="500" border :columns="columns2" :data="data2"></Table>
        <Table v-if="index == 2" width="1100" height="500" border :columns="columns3" :data="data3"></Table>
    </div>
    </section>
    </div>
</template>

<script>
export default {
  data () {
    return {
      curTime: '',
      curIndex: 0,
      list: [
        {
          id: 1,
          title: '日报'
        },
        {
          id: 2,
          title: '月报'
        },
        {
          id: 3,
          title: '年报'
        }
      ]
    }
  },
  methods: {
    change (index) {
      this.curIndex = index
    },
    curDate (e) {
      this.curTime = e
    },
    getList () {
      getclgl(this.curTime).then(res => {
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
    }
  }
}
</script>
<style>
#title{
  overflow: hidden;
  padding: 0;
  margin: 0;
}
#title li {
  box-sizing: border-box;
  padding: 0;
  float: left;
  width: 100px;
  height: 45px;
  line-height: 45px;
  list-style: none;
  text-align: center;
  border-top: 1px solid blue;
  border-bottom: 1px solid blue;
  cursor: pointer;
}
#title li:first-child {
  border-left: 1px solid blue;
  border-radius: 4px 0 0 4px;
}
#title li:last-child {
  border-right: 1px solid blue;
  border-radius: 0 4px 4px 0;
}
#title li.active {
  background-color: rgb(101, 252, 244);
}
#main > div {
  height: 600px;
  display: none;
  /* text-align: center;
  font-size: 30px;
  line-height: 30px; */
  border: 1px solid blue;
  border-radius: 6px;
}
#main > div.current {
  display: block;
}
</style>
