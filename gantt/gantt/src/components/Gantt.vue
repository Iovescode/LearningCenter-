<template>
  <div id='tableid'>
    <table class="hello">
      <tr>
        <th>
          <span >kkk</span>
        </th>
        <th v-for="(item, index) in headerDays" :key='index'>
          <span >{{item}}</span>
        </th>
      </tr>
      <tr v-for="(item, index) in data" :key='index'>
        <td>
          <span>{{item.title}}</span>
        </td>
        <td v-for="(ite, ins) in item.days" :key='ins'>
          <span>
            <a v-if="ite.title&&ite.width!=='0'" :data='ite.remark' class="iniClass" @mouseenter="mouseenter" @mouseleave="mouseleave" :style="{ background: ite.activeColor,width: ite.width}">{{ite.title}} {{ite.percentum}}</a>
            <a v-if="ite.title" :data='ite.remark' @mouseenter="mouseenter" @mouseleave="mouseleave" :style="{ background: ite.activeColors,width: ite.widths}" class="iniClassB"></a>
            <a v-if="ite.isweek" :data='ite.remark'  class="iniClassC"></a>
          </span>
        </td>
      </tr>
    </table>
    <div class="tooltip" :style="{ top: top,left:left}" v-if="isshow">
      <p>{{remark}}</p>
      <div class="arrow"></div>
    </div>
  </div>
</template>

<script>
import { getDays } from './time.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      headerDays: [],
      row: [{
        title: '项目一',
        today: '2018-10-9',
        endTime: '2018-10-20',
        activeColor: 'red',
        activeColors: 'green',
        remark: '这是项目一'
      },
      {
        title: '项目二',
        today: '2018-10-9',
        endTime: '2018-10-16',
        activeColor: 'red',
        activeColors: 'green',
        remark: '这是项目二'
      },
      {
        title: '项目二',
        today: '2018-10-15',
        endTime: '2018-10-25',
        activeColor: 'red',
        activeColors: 'green',
        remark: '这是项目二'
      },
      {
        title: '项目二',
        today: '2018-10-3',
        endTime: '2018-10-9',
        activeColor: 'red',
        activeColors: 'green',
        remark: '这是项目二'
      }],
      data: [],
      isshow: false,
      top: '0',
      left: '0',
      remark: ''
    }
  },
  created () {
    // initHeaderTime 表头
    this.headerTime()
  },
  methods: {
    headerTime () {
      // 当前月的计算
      for (let index = 0; index < getDays(); index++) {
        let dayDate = new Date().getFullYear() + `${'-'}` + parseInt(new Date().getMonth() + 1) + `${'-'}` + parseInt(index + 1)
        this.headerDays.push(dayDate)
      }
      this.row.map((ite, ins) => {
        let obg = {
          days: []
        }
        this.headerDays.forEach((element, index) => {
          // 初始化数据结构
          let daysObj = {
            title: '',
            today: '',
            endTime: '',
            activeColor: '',
            activeColors: '',
            remark: '',
            widths: '',
            width: ''
          }

          if (this.isWeek(element)) {
            // 周六 周如处理
            daysObj.isweek = true
          }
          if (ite.today === element) {
            // 构造数据结构
            let sum = (this.timestamp(ite.endTime) - this.timestamp(ite.today)) / 86400000
            let now = (this.timestamp(new Date()) - this.timestamp(ite.today)) / 86400000
            ite.widths = sum * 70 + 'px'
            ite.width = now * 70 + 'px'
            ite.percentum = (now / sum).toFixed(2) + '%'
            daysObj.day = element
            daysObj = ite
            obg.title = ite.title
            if (now <= 0) {
              daysObj.remark = '当前项目还未开展'
              daysObj.title = "''"
              daysObj.width = '0'
            }
            obg.days.push(daysObj)
          } else {
            obg.days.push(daysObj)
          }
        })
        this.data.push(obg)
      })
    },
    // 鼠标事件
    mouseenter (e) {
      this.remark = e.target.getAttribute('data')
      if (e.target.title) {
        this.isshow = false
      }
      this.isshow = true
      this.left = e.clientX - 70 + 'px'
      this.top = e.clientY - 90 - e.offsetY / 2 + 'px'
    },
    mouseleave (e) {
      this.isshow = false
    },
    // 工具函数库
    timestamp (time) {
      return new Date(time || null).getTime()
    },
    isWeek (Week) {
      var dt = new Date(Week || null)
      if (dt.getDay() === 6 || dt.getDay() === 0) {
        return true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  position: absolute;
}

table {
  /* width: 100%; */
  border-collapse: collapse;
}

table,
td,
th {
  min-width: 80px;
  height: 50px;
  position: relative;
  /* padding: 10px 5px 17px 7px; */
  border: 1px solid black;
}

table,
td,
th,
span {
  position: relative;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 300;
}
.iniClass{
  cursor: pointer;
  /* width: 100px; */
   height: 20px;
  border-radius: 5px;
  font-size: 3px;
  position: absolute;
  z-index: 3;
}
.iniClassB{
  width: 20px;
    height: 20px;
  cursor: pointer;
  display: inline-block;
  font-size: 3px;
  position: absolute;
  border-radius: 5px;
  z-index: 1;
}

#tableid {
  position: relative;
}

#container {
  width: 400px;
  margin: 100px auto 0 auto;
}

.item {
  width: 100px;
  height: 100px;
  margin: 15px;
  background: #73a058;
  float: left;
  border-radius: 50px;
}

h1 {
  font-family: "HeydingsCommonIconsRegular", sans-serif;
  font-weight: normal;
  margin: 30px 0 0 0;
  color: #fff;
  text-align: center;
  font-size: 60px;
  line-height: 30px;
}

.tooltip p {
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 300;
}

.tooltip {
  width: 120px;
  padding: 10px;
  border-radius: 3px;
  position: absolute;
  z-index: 4;
  box-shadow: 1px 1px 10px 0 #ccc;
  /* margin: -500px 0 0 -20px; */
  background: #fff;
  -webkit-transition: margin 0.5s ease-in-out;
  -moz-transition: margin 0.5s ease-in-out;
}

.item:hover {
  background: #6d643b;
}

.item:hover .tooltip {
  margin: -145px 0 0 -20px;
  -webkit-transition: margin 0.15s ease-in-out;
  -moz-transition: margin 0.15s ease-in-out;
}

.arrow {
  position: absolute;
  margin: 10px 0 0 50px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #fff;
}
.iniClassC{
  top: 1px;
    left: 1px;
    background-color: #00ffff4d;
    width: 82px;
    height: 52px;
    cursor: pointer;
    display: inline-block;
    font-size: 3px;
    position: absolute;
    z-index: 1;
}
</style>
