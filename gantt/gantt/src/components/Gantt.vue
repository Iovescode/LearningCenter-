<template>
  <div id='tableid'>
    <table class="hello">
      <tr>
        <th v-for="(item, index) in date" :key='index'>
          <span v-if="index=='0'"></span>
          <span v-else>{{item.day}}</span>
        </th>
      </tr>
      <tr v-for="(items,indexs) in opt" :key='indexs'>
        <td v-for="(item, index) in newDate" :key='index'>
          <span v-if="index=='0'" >{{items.title}}</span>
          <span v-else :data-x='item.day' :data-y='indexs+1'><a :style="{ background: item.hh.activeColor,width: item.hh.width}" @mouseenter="mouter" @mouseleave="moulea" v-if="item.day==item.hh.today&&item.hh.y==indexs"  class="iniClass">{{item.hh.title}}</a><a v-if="item.day==item.hh.today&&item.hh.y==indexs" @mouseenter="mouter" @mouseleave="moulea" class="iniClassB" :style="{ background: item.hh.activeColors,width: item.hh.widths}">''</a></span>
        </td>
      </tr>
    </table>
    <div class="tooltip" v-if="isshow"><p>Find important documents and manuals.</p><div class="arrow"></div></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      opt: [
        {
          title: '项目二',
          today: '2018-9-2',
          endTime: '2018-9-9',
          activeColor: 'red',
          activeColors: 'green',
          width: '200px',
          widths: '300px'
        },
        {
          title: '项目二',
          today: '2018-9-3',
          activeColor: 'red',
          activeColors: 'green',
          width: '200px',
          widths: '300px'
        },
        {
          title: '项目二',
          today: '2018-9-7',
          activeColor: 'red',
          activeColors: 'green',
          width: '200px',
          widths: '300px'
        }
      ],
      opts: [],
      date: [],
      dates: [],
      newDate: [],
      isshow: false
    }
  },
  created () {
    this.tableDay()
  },
  methods: {
    tableDay () {
      this.opt.map((ite, ins) => {
        ite.y = ins
      })
      let days =
      this.mGetDate(new Date().getFullYear(), new Date().getMonth()) + 1
      for (let index = 0; index < days; index++) {
        this.date.push({
          day: new Date().getFullYear() + `${'-'}` + parseInt(new Date().getMonth() + 1) + `${'-'}` + parseInt(index),
          hh: {}
        })
      }
      this.date.map((item, indexs) => {
        this.dates.push({ ...item, hh: this.opt[indexs] || { today: '' } })
      })
      this.dates.map((items, indexs) => {
        let hh = {}
        this.dates.map((itemss, indexss) => {
          if (items.day === itemss.hh.today) {
            let datediffStarEnd = this.getweek(itemss.hh.endTime).nowTimes - this.getweek(itemss.hh.today).nowTimes
            datediffStarEnd = datediffStarEnd / 86400
            let datediffNow = this.getweek(new Date()).nowTimes - this.getweek(itemss.hh.today).nowTime
            datediffNow = datediffNow / 86400
            let datediff = datediffNow / datediffStarEnd
            hh = { ...itemss.hh }
            hh.sum = datediff
            console.log(datediff)
          }
        })
        let obj = { day: items.day, hh: hh }

        this.newDate.push(obj)
      })
    },
    // 鼠标事件
    mouter (e) {
      // $('.tooltip').css('top', 45)
      this.isshow = true
      console.log(this.getweek(new Date()))
    },
    moulea (e) {
      this.isshow = false
    },
    // 工具函数   时间
    mGetDate () {
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var d = new Date(year, month, 0)
      return d.getDate()
    },
    DateDiff (sDate1, sDate2) {
      var aDate, oDate1, oDate2, iDays
      aDate = sDate1.split('-')
      oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
      aDate = sDate2.split('-')
      oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
      iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)
      return iDays
    },
    getweek (currentTime) {
      var currentDate = new Date(currentTime)
      var timesStamp = currentDate.getTime()
      var currenDay = currentDate.getDay()
      // var Times = new Date(currentTime.toLocaleDateString()).getTime()
      var dates = []
      for (var i = 0; i < 7; i++) {
        const Dates = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7))
        const timeHour = Dates.getFullYear() + '-' + (Dates.getMonth() + 1) + '-' + Dates.getDate() + ' ' + Dates.getHours() + ':' + Dates.getMinutes() + ':' + Dates.getSeconds()
        dates.push(this.formatDate(timeHour))
      }
      if (currenDay === 0) {
        currenDay = 7
      }
      return { week: dates, day: currenDay, nowTimes: timesStamp }
    },
    formatDate (time) {
      var date = new Date(time)
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      var d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      var h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      var minute = date.getMinutes()
      var second = date.getSeconds()
      minute = minute < 10 ? ('0' + minute) : minute
      second = second < 10 ? ('0' + second) : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  margin: 50px auto;
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
.iniClassB {
  display: inline-block;
  font-size: 3px;
  position: absolute;
  border-radius: 5px;
  z-index: 1;
}
.iniClass {
  width: 100px;
  border-radius: 5px;
  font-size: 3px;
  position: absolute;
  z-index: 3;
}
#tableid{
  position: relative
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
