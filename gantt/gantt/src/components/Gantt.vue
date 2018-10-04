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
          <span>{{item.to.title}}</span>
        </td>
        <td v-for="(ite, ins) in item.days" :key='ins'>
          <span>
            <a v-if="ite==item.to.today" :data='item.to.remark' class="iniClass" @mouseenter="mouseenter" @mouseleave="mouseleave" :style="{ background: item.to.activeColor,width: item.to.width}">{{item.to.title}}</a>
            <a v-if="ite==item.to.today" @mouseenter="mouseenter" @mouseleave="mouseleave" :style="{ background: item.to.activeColors,width: item.to.width}" class="iniClassB"></a>
          </span>
          <!-- <span >{{ite}}</span> -->
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
        today: '2018-10-4',
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
      for (let index = 0; index < getDays(); index++) {
        let dayDate = new Date().getFullYear() + `${'-'}` + parseInt(new Date().getMonth() + 1) + `${'-'}` + parseInt(index + 1)
        this.headerDays.push(dayDate)
      }
      this.row.map((ite, ins) => {
        let obg = {
          days: []
        }
        this.headerDays.forEach((element, index) => {
          if (ite.today === element) {
            let sum = (this.timestamp(ite.endTime) - this.timestamp(ite.today)) / 86400000
            // let now = (this.timestamp() - this.timestamp(ite.today)) / 86400000
            ite.width = sum * 70 + 'px'
            obg.days.push(element)
            obg = {...obg, to: ite}
          } else {
            obg.days.push(element)
          }
        })
        this.data.push(obg)
      })
    },
    mouseenter (e) {
      this.remark = e.target.getAttribute('data')
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
  width: 200%;
  border-collapse: collapse;
}

table,
td,
th {
  position: relative;
  padding: 10px 5px 17px 7px;
  border: 1px solid black;
}

table,
td,
th,
span {
  position: relative;
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

</style>
