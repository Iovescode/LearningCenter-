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
          <span v-else :data-x='item.day' :data-y='indexs+1'><a :style="{ background: item.hh.activeColor,width: item.hh.width}" @mouseenter="mouter" @mouseleave="moulea" v-if="item.day==item.hh.today&&item.hh.y==indexs"  class="iniClass">{{item.hh.title}}</a><a v-if="item.day==item.hh.today&&item.hh.y==indexs" @mouseenter="mouter" @mouseleave="moulea" class="iniClassB" :style="{ background: item.hh.activeColors,width: item.hh.widths}">{{item.hh.titles}}</a></span>
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
        { title: '项目一', today: '2018-9-7' },
        {
          title: '项目二',
          titles: '项目二',
          today: '2018-9-2',
          activeColor: 'red',
          activeColors: 'green',
          width: '200px',
          widths: '300px'
        },
        { title: '项目三', today: '2018-9-12' }
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
            hh = { ...itemss.hh }
          }
        })
        let obj = { day: items.day, hh: hh }
        this.newDate.push(obj)
      })
    },
    // 鼠标事件
    mouter (e) {
      $('.tooltip').css('top', 45)
      this.isshow = true
    },
    moulea (e) {
      this.isshow = false
    },
    // 工具函数
    mGetDate () {
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var d = new Date(year, month, 0)
      return d.getDate()
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
