<template>
  <Card :shadow="shadow" class="info-card-wrapper" :padding="0">
    <div class="content-con">
      <div class="top-area" :style="{background: color}">
        <p class="tit" >{{title}}</p>
        <!-- <common-icon class="icon"  :type="icon" :size="iconSize" color="#fff"/>  -->
      </div>
      <div class="bottom-area" style="height:50px">
        <!-- 各区数据 -->
        <el-row :gutter="10">
         <el-col :span="12"><div class="">订单数：{{num1}}</div></el-col>
         <el-col :span="12"><div class="">总箱数： {{num2}} </div></el-col>
         </el-row>
         <el-row :gutter="10">
         <el-col :span="12"><div class="">已完成： {{num3}} </div></el-col>
         <el-col :span="12"><div class="">未完成： {{num4}} </div></el-col>
        </el-row>
      <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
// import CommonIcon from '_c/common-icon'
export default {
  name: 'StoreCard',
  components: {
    // CommonIcon
  },
  props: {
    top: {
      type: Number,
      default: 36
    },
    color: {
      type: String,
      default: '#2d8cf0'
    },
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    num1: {
      type: Number,
      default: 20
    },
    num2: {
      type: Number,
      default: 20
    },
    num3: {
      type: Number,
      default: 20
    },
    num4: {
      type: Number,
      default: 20
    },
    iconSize: {
      type: Number,
      default: 20
    },
    shadow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less">
.common{
  float: left;
  height: 100%;
  display: table;
  text-align: center;
}
.size{
  width: 100%;
  height: 100%;
}
.middle-center{
  display: table-cell;
  vertical-align: middle;
}
.info-card-wrapper{
  .size;
  overflow: hidden;
  .ivu-card-body{
    .size;
  }
  .content-con{
    .size;
    position: relative;
    .left-area{
      .common;
      & > .icon{
        .middle-center;
      }
    }
    .right-area{
      .common;
      & > div{
        .middle-center;
      }
    }
  }
}
.tit{
  color: antiquewhite;
  text-align: center;
}
</style>
