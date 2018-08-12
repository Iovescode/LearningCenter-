<template>
  <div id="app">
    <button @click="refreshEvents">Refresh</button>
    <button v-if="selected._id" @click="removeEvent">Remove</button>
    <div class="block">
    <span class="demonstration">周</span>
    <el-date-picker
      v-model="value3"
       @change="changeTime"
       :picker-options="{
      firstDayOfWeek: 1
        }"
      type="week"
      format="yyyy 第 WW 周"
      placeholder="选择周">
    </el-date-picker>
  </div>
    <pre>{{ selected }}</pre>
    <full-calendar ref="calendar" :event-sources="eventSources" @event-selected="eventSelected" @event-created="eventCreated" :config="config"></full-calendar>
  </div>
</template>

<script>
//获取当前时间戳
// function getTimes(newTeim){
//     const newTeim = null||newTeim
//     return Math.round(new Date(newTeim).getTime()
//   }

  import moment from 'moment';

function success() {
  $("a.success").append(" <b class='succeshtml'>Hello world!</b>");
}

export default {
  name: "app",
  data() {
    return {
      value3: "",
      events: [
        {
          id: 1,
          title: "Party",
          start: "2018-08-12T20:00:00",
          end: "2018-08-12T22:00:00",
          constraint: "businessHours",
          className: "success"
        },
        {
          id: 2,
          title: "Party",
          start: "2018-08-13T20:00:00",
          end: "2018-08-13T22:00:00",
          constraint: "businessHours",
          className: "success"
        },
        {
          id: 3,
          title: "Party",
          start: "2018-08-14T20:00:00",
          end: "2018-08-14T22:00:00",
          constraint: "businessHours",
          className: "success"
        }
      ],

      config: {
        allDayText: "all-day",
        allDaySlot: false,
        locale: "ZH-CN",
        weekMode: "variable",
        defaultView: "agendaWeek",
        weekMode: "liquid",
        eventClick: event => {
          console.log(event);
        }
      },

      selected: {}
    };
  },

  methods: {
    refreshEvents() {
      this.$refs.calendar.$emit("refetch-events");
    },

    removeEvent() {
      this.$refs.calendar.$emit("remove-event", this.selected);
      this.selected = {};
    },

    eventSelected(event) {
      this.selected = { ...event, source: {} };
    },

    getTimes(newTime) {
      newTime = null || newTime;
      return Math.round(new Date(newTime).getTime());
    },

    // 时间处理
    timehandling(timeArr) {
      return timeArr[0].end._i;
    },

    eventCreated(...test) {
      var newTimeNow = new Date().getTime();
      var initArrEnd = test[0].end._i;
      var initArrStart = test[0].start._i;
      var montsStart = [+initArrStart.slice(1, 2) + 1];
      var montsEnd = [+initArrEnd.slice(1, 2) + 1];
      var newTimeNowstart =
        initArrStart.slice(0, 1).join("-") +
        "-" +
        montsStart.join("-") +
        "-" +
        initArrStart.slice(2, 3).join("-") +
        " " +
        initArrStart.slice(3, 6).join(":");
      var newTimeNowend =
        initArrEnd.slice(0, 1).join("-") +
        "-" +
        montsEnd.join("-") +
        "-" +
        initArrEnd.slice(2, 3).join("-") +
        " " +
        initArrEnd.slice(3, 6).join(":");
      newTimeNowstart = Math.round(new Date(newTimeNowstart).getTime());
      newTimeNowend = Math.round(new Date(newTimeNowend).getTime());

      if (newTimeNow > newTimeNowstart) {
        alert("过去时间无法操作");
        return false;
      }

      let bloo = true;
      for (const value of this.events) {
        var scopeTimeStart = new Date(value.start).getTime();
        var scopeTimeEnd = new Date(value.end).getTime();

        if (scopeTimeEnd < newTimeNowstart + 0.5) {
          continue;
        } else if (scopeTimeStart > newTimeNowend - 0.5) {
          continue;
        } else {
          alert("bu是时间有冲突");
          bloo = false;
          return false;
        }
      }
      if (bloo) {
        alert("弹出");
      }
    },
    // 时间格式化
    timeFormats(time) {
      var date = new Date(time);
      var date_value =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      return date_value;
    },
    changeTime(val) {
      setTimeout(() => {
        this.$refs.calendar.fireMethod("gotoDate", moment(val));
        success();
      }, 2000);
    }
  },

  computed: {
    eventSources() {
      const self = this;
      return [
        {
          events(start, end, timezone, callback) {
            callback(self.events);
            success();
            // setTimeout(() => {
            //   callback(self.events.filter(() => Math.random() > 0.5));
            // }, 1000);
          }
        }
      ];
    }
  },

  mounted() {
    success();
    // setTimeout(() => {
    //   // this.$refs.calendar.fireMethod('next');
    // }, 1000);
  }
};
</script>

<style>
@import "~fullcalendar/dist/fullcalendar.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: scroll;
}
b.succeshtml {
  position: absolute;
  bottom: 0;
  right: 0;
  color: red;
}
</style>
