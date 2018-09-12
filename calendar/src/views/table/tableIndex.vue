<template>
  <div class="calendar">
    <el-row>
      <div class="block">
        <el-date-picker
          v-model="value3"
          type="week"
          format="yyyy 第 WW 周"
          placeholder="选择周"
          @change="chose"/>
      </div>
    </el-row>
    <button @click="closeOthersTags">dfvfv</button>
    <expand-table v-if="hackReset" :rows="rows" :columns="columns" :day="day" :slot-name-arr="slotNameArr">
      <template slot-scope="scope" slot="week1">
        <div v-if="scope.row.week1.data.length>0">
          <el-popover
            placement="right-start"
            title="标题"
            width="200"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
            <a v-for="(item,index) in scope.row.week1.data" slot="reference" :key="index" :style="{background:item.backgroundColor,zIndex:item.zindex,height:item.height+'px'}" class="mm">{{ item.start }}</a>
          </el-popover>
        </div>
      </template>
      <template slot-scope="scope" slot="week2">
        <div v-if="scope.row.week2.data.length>0">
          <el-popover
            placement="right-start"
            title="标题"
            width="200"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
            <a v-for="(item,index) in scope.row.week2.data" slot="reference" :key="index" :style="{background:item.backgroundColor,zIndex:item.zindex,height:item.height+'px'}" class="mm">{{ item.start }}</a>
          </el-popover>
        </div>
      </template>
      <template slot-scope="scope" slot="week3">
        <div v-if="scope.row.week3.data.length>0">
          <el-popover
            placement="right-start"
            title="标题"
            width="200"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
            <a v-for="(item,index) in scope.row.week3.data" slot="reference" :key="index" :style="{background:item.backgroundColor,zIndex:item.zindex,height:item.height+'px'}" class="mm">{{ item.startEndTime }}</a>
          </el-popover>
        </div>
      </template>
      <template slot-scope="scope" slot="week4">
        <div v-if="scope.row.week4.data.length>0">
          <el-popover
            placement="right-start"
            title="标题"
            width="200"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
            <a v-for="(item,index) in scope.row.week4.data" slot="reference" :key="index" :style="{background:item.backgroundColor,zIndex:item.zindex,height:item.height+'px'}" class="mm">{{ item.start }}</a>
          </el-popover>
        </div>
      </template>
      <template slot-scope="scope" slot="week5">
        <div v-if="scope.row.week5.data.length>0">
          <el-popover
            placement="right-start"
            title="标题"
            width="200"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
            <a v-for="(item,index) in scope.row.week5.data" slot="reference" :key="index" :style="{background:item.backgroundColor,zIndex:item.zindex,height:item.height+'px'}" class="mm">{{ item.start }}</a>
          </el-popover>
        </div>
      </template>
      <template slot-scope="scope" slot="week6">
        <div v-if="scope.row.week6.data.length>0">
          <el-popover
            placement="right-start"
            title="标题"
            width="200"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
            <a v-for="(item,index) in scope.row.week6.data" slot="reference" :key="index" :style="{background:item.backgroundColor,zIndex:item.zindex,height:item.height+'px'}" class="mm">{{ item.start }}</a>
          </el-popover>
        </div>
      </template>
      <template slot-scope="scope" slot="week7">
        <div v-if="scope.row.week7.data.length>0">
          <el-popover
            placement="right-start"
            title="标题"
            width="200"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
            <a v-for="(item,index) in scope.row.week7.data" slot="reference" :key="index" :style="{background:item.backgroundColor,zIndex:item.zindex,height:item.height+'px'}" class="mm">{{ item.start }}</a>
          </el-popover>
        </div>
      </template>
    </expand-table>
  </div>
</template>

<script>
import ExpandTable from '../table/calendar/index'
export default {
  components: {
    ExpandTable
  },
  data() {
    return {
      // 数据原
      source: [
        {
          id: 2,
          title: 'Party',
          start: '2018-09-02 10:00:00',
          end: '2018-09-02 22:00:00',
          backgroundColor: 'green'
        },
        {
          id: 3,
          title: 'Party全天计划\r\n#####\r\n写代码',
          start: '2018-09-03 20:00:00',
          end: '2018-09-03 22:00:00',
          backgroundColor: 'orange'
        },
        {
          id: 4,
          startEndTime: '22:00-23:00',
          title: 'Party全天计划\r\n#####\r\n写代码',
          start: '2018-09-02 22:00:00',
          end: '2018-09-02 23:00:00',
          zindex: '5'
        },
        {
          id: 5,
          startEndTime: '22:00-23:00',
          title: 'Party全天计划\r\n#####\r\n写代码',
          start: '2018-09-04 22:00:00',
          end: '2018-09-04 23:00:00',
          backgroundColor: 'orange',
          zindex: '3'
        },
        {
          id: 6,
          startEndTime: '22:00-23:00',
          title: 'Party全天计划\r\n#####\r\n写代码',
          start: '2018-08-03 22:00:00',
          end: '2018-08-06 06:00:00',
          backgroundColor: 'blue',
          zindex: '1'
        }
      ],
      week: '',
      day: '',
      ferryArr: [],
      value3: '',
      hackReset: true,
      columns: [],
      slotNameArr: ['week1', 'week2', 'week3', 'week4', 'week5', 'week6', 'week7'],
      rows: [],
      timeSpace: 60 // 时间间隔
    }
  },
  watch: {
    'source': function(val) {
      return val
    }
  },
  created() {
    this.getInitWeek(new Date())
  },
  mounted() {
    this.clHover()
  },

  methods: {
    closeOthersTags() {
      this.$store.dispatch('delView', this.$route).then(({ visitedViews }) => {
        if (this.$route.path) {
          const routePath = visitedViews.slice(-1)[0]
          return routePath ? this.$router.push(routePath) : this.$router.push('/')
        }
      })
    },
    // 选择 周
    chose() {
      const weekDate = JSON.stringify(this.value3).slice(1, 11)
      this.hackReset = false
      this.$nextTick(() => {
        this.hackReset = true
        this.getInitWeek(new Date(weekDate))
        this.clHover()
      })
    },

    // 元数据处理
    metadata() {
      this.ferryArr = []
      const arr = [...this.source]
      arr.map((item, index) => {
        const startDayTime = item.start.slice(0, 10)
        const endDayTime = item.end.slice(0, 10)
        if (startDayTime !== endDayTime) {
          const timeStartend = parseInt((this.timesStamp(item.end) - this.timesStamp(item.start)) / 86400)
          for (let index = 0; index < timeStartend; index++) {
            this.ferryArr.push(item)
          }
        }
      })
      this.ferry()
    },
    // 处理跨天
    ferry() {
      const arr = []
      this.ferryArr.map((item, index) => {
        const startDayTime = item.start.slice(0, 10)
        let startTime = 0
        let endTime = 0
        if (index) {
          endTime = arr[0] + 86400 * (index + 1)
          startTime = arr[0] + 86400 * index
        } else {
          startTime = this.timesStamp(startDayTime) + 57600
          endTime = startTime + 86400
          arr.push(startTime)
        }

        startTime = this.formatDate(startTime * 1000)
        endTime = this.formatDate(endTime * 1000)

        const target = { ...item, start: startTime, end: endTime }
        this.source.push(target)
        if (!index) {
          const laststart = item.end.slice(0, 10) + ' 00:00'
          const target = { ...item, start: laststart, end: item.end }
          this.source.push(target)
        }
      })

      // 计算高度
      this.sunHeight()
    },
    sunHeight() {
      const timeSpace = 15 || this.timeSpace
      this.source.map((item, index) => {
        // if (item.backgroundColor === undefined) {
        //   item.backgroundColor = ''
        // }
        if (item.zindex === undefined) {
          item.zindex = '2'
        }
        // 设置目标时间块的高度
        var startTime = this.timesStamp(item.start)
        var startEnd = this.timesStamp(item.end)
        const timeMistiming = startEnd - startTime
        item.height = timeMistiming / timeSpace * 0.733
      })
    },
    // 初始化日历
    init(weekDateObj) {
      // 时间间隔
      const b = 15
      const hour = 1440 / this.H
      this.rows = []
      for (let index = 0; index < hour; index++) {
        const hour = this.sumTime(index, b).hour
        this.rows.push({
          week0: hour,
          week1: { x: hour, y: this.week[0], data: [] },
          week2: { x: hour, y: this.week[1], data: [] },
          week3: { x: hour, y: this.week[2], data: [] },
          week4: { x: hour, y: this.week[3], data: [] },
          week5: { x: hour, y: this.week[4], data: [] },
          week6: { x: hour, y: this.week[5], data: [] },
          week7: { x: hour, y: this.week[6], data: [] }
        })
      }
      this.timeSolt(weekDateObj)
    },

    // 时间排序
    timeSolt(weekDateObj) {
      this.rows.map((item, index) => {
        for (const key in item) {
          if (key !== 'week0') {
            this.source.map((items, indexs) => {
              const startDayTime = items.start.slice(0, 10)
              const startHourTime = items.start.slice(11, 16)
              if (weekDateObj.weekArr.includes(startDayTime)) {
                if (startDayTime === item[key].y.slice(0, 10)) {
                  if (startHourTime === item[key].x) {
                    item[key].data.push(items)
                  }
                }
              }
            })
          }
        }
      })
    },
    // 初始化 当前的天 当前周
    getInitWeek(val) {
      const WeekData = [
        { value: 'week0', text: '' },
        { value: 'week1', text: '星期一' },
        { value: 'week2', text: '星期二' },
        { value: 'week3', text: '星期三' },
        { value: 'week4', text: '星期四' },
        { value: 'week5', text: '星期五' },
        { value: 'week6', text: '星期六' },
        { value: 'week7', text: '星期日' }
      ]
      this.columns = WeekData
      const weekArr = []
      this.week = this.getweek(val).week
      this.day = this.getweek(val).day
      WeekData.forEach((item, index) => {
        if (index) {
          weekArr.push(this.week[index - 1].slice(0, 10))
          const number = this.week[index - 1].slice(8, 11)
          const weekDay = number + this.columns[index].text
          item.text = weekDay
        }
      })
      const weekDate = JSON.stringify(val).slice(1, 11)
      this.init({ weekDate, weekArr })
      this.metadata()
    },
    // 清除 Hover
    clHover() {
      setTimeout(function() {
        const obj = document.getElementsByClassName('el-table--enable-row-hover')[0]
        let clz = obj.getAttribute('class')
        clz = clz.replace('el-table--enable-row-hover', '')
        obj.setAttribute('class', clz)
      }, 1)
    },
    // 15,30 1小时 间隔计算
    sumTime(index, b) {
      const nowHour = this.getweek(new Date()).nowTimes + index * b * 60 * 1000
      return { day: this.formatDate(new Date(nowHour)).slice(0, 11), hour: this.formatDate(new Date(nowHour)).slice(11, 16) }
    },
    // 获取当前周
    getweek(currentTime) {
      var currentDate = new Date(currentTime)
      var timesStamp = currentDate.getTime()
      var currenDay = currentDate.getDay()
      var Times = new Date(currentTime.toLocaleDateString()).getTime()
      var dates = []
      for (var i = 0; i < 7; i++) {
        const Dates = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7))
        const timeHour = Dates.getFullYear() + '-' + (Dates.getMonth() + 1) + '-' + Dates.getDate() + ' ' + Dates.getHours() + ':' + Dates.getMinutes() + ':' + Dates.getSeconds()
        dates.push(this.formatDate(timeHour))
      }
      if (currenDay === 0) {
        currenDay = 7
      }
      return { week: dates, day: currenDay, nowTimes: Times }
    },

    // 时间戳
    timesStamp(currentTime) {
      var currentDate = new Date(currentTime)
      var timesStamp = currentDate.getTime()
      return timesStamp / 1000
    },

    // 时间戳格式 小时
    formatDate(time) {
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

<style lang="sass">
.calendar
  td.red
    background-color: #606266;
    border-bottom: 1px solid #606266;
  a.mm
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 99%;
    border-radius: 3px;
    overflow: hidden;

</style>
