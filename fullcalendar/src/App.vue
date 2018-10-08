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
    <full-calendar ref="calendar" :event-sources="eventSources" @event-selected="eventSelected" @event-created="eventCreated"  :config="config"></full-calendar>
  </div>
</template>

<script>
function titleWeekSign(item, str, weektitle, weekName) {
  // console.log(weektitle, weekName);
  if (weektitle === weekName) {
    item.innerHTML =
      "<span class='weekNameCss weekNameCss_Action'>" +
      str +
      "</span><span class='weekName'>" +
      weekName +
      "</span>";
  } else {
    item.innerHTML =
      "<span class='weekNameCss'>" +
      str +
      "</span><span class='weekName'>" +
      weekName +
      "</span>";
  }
}

function titleWeek() {
  let weektitle;
  let weekNumber = new Date().getDay();
  if (weekNumber === 0) {
    weekNumber = 7;
  }
  const weekDate = ["", "周一", "周二", "周三", "周四", "周五", "周六", "周日"];
  for (let index = 0; index < weekDate.length; index++) {
    if (weekNumber === index) {
      weektitle = weekDate[index];
    }
  }

  [...$(".fc-row.fc-widget-header table tr").children()].forEach(
    (item, index) => {
      // console.log(item.getAttribute("data-date"));
      if (item.innerText.length > 5) {
        if (index) {
          var weekName;
          var str = "";
          if (item.innerText.slice(5).length > 1) {
            weekName = item.innerText.slice(0, 2);
            str = item.innerText.slice(5);
            if (isNaN(item.innerText.slice(5))) {
              if (str.slice(1, 3).length > 1) {
                str = str.slice(1, 4).trim();
              } else {
                str = (0 + str.slice(1, 2)).trim();
              }
            }
            titleWeekSign(item, str, weektitle, weekName);
          } else {
            weekName = item.innerText.slice(0, 2);
            str = ("0" + item.innerText.slice(5)).trim();
            titleWeekSign(item, str, weektitle, weekName);
          }
        }
      }
    }
  );
}
import moment from "moment";

function success() {
  titleWeek();
  var ox = document.createElement("div");
  var oy = document.createElement("div");
  ox.style.width = "100%";
  ox.style.height = "1px";
  ox.style.backgroundColor = "#ddd";
  ox.style.position = "absolute";
  ox.style.pointerEvents = "none";
  ox.style.left = 0;
  document.getElementsByClassName("fc-view")[0].appendChild(ox);
  oy.style.height = "100%";
  oy.style.pointerEvents = "none";
  oy.style.width = "1px";
  oy.style.backgroundColor = "#ddd";
  oy.style.position = "absolute";
  oy.style.top = 0;
  document.getElementsByClassName("fc-view")[0].appendChild(oy);
  document.getElementsByClassName("fc-view")[0].onmousemove = function(e) {
    var e = e || event;
    var x = e.pageX;
    var y = e.pageY;
    ox.style.top = y - 145 + "px";
    oy.style.left = x + "px";
  };
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
          // constraint: "businessHours",
          className: "success",
          editable: true
        },
        {
          id: 2,
          title: "Party",
          start: "2018-08-13T20:00:00",
          end: "2018-08-13T22:00:00",
          // constraint: "businessHours",
          className: "success",
          editable: true
        },
        {
          id: 3,
          title: "Party全天计划\r\n#####\r\n写代码",
          start: "2018-08-14T20:00:00",
          end: "2018-08-14T22:00:00",
          //constraint: "businessHours",
          className: "success",
          editable: true,
          description: "This is a cool event"
        }
      ],

      config: {
        // allDay:false,
        allDaySlot: false,
        locale: "ZH-CN",
        weekMode: "variable",
        slotDuration: "00:15:00",
        minTime: "06:00:00",
        maxTime: "24:00:00",
        slotLabelFormat: "HH:mm",
        defaultView: "agendaWeek",
        contentHeight: 2000,
        selectable: false,
        editable: false,
        eventOverlap: true,
        dragOpacity: {
          agenda: 0.5,
          "": 0.6
        },
        // eventClick: event => {
        //   console.log(event);
        // },
        navLinks: true, // can click day/week names to navigate views
        navLinkDayClick: function(date, jsEvent) {
          console.log("day", date.format()); // date is a moment
          console.log("coords", jsEvent.pageX, jsEvent.pageY);
        },

        dayClick: function(date, jsEvent, view, e) {
          console.log(date, jsEvent, view, e);
          // alert('Clicked on: ' + date.format());
          // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
          //alert('Current view: ' + view.name);
          // change the day's background color just for fun
          // $(this).css('background-color', 'red');
        },
        eventDrop: function(event, dayDelta, minuteDelta, allDay, revertFunc) {
          alert(90);
          console.log(event, dayDelta, minuteDelta, allDay, revertFunc);
        },
        eventClick: function(calEvent, jsEvent, view) {
          alert("Event: " + calEvent.title);
          alert("Coordinates: " + jsEvent.pageX + "," + jsEvent.pageY);
          alert("View: " + view.name);

          // change the border color just for fun
          $(this).css("border-color", "red");
        },

        eventResize: function(event, dayDelta, minuteDelta, revertFunc) {
          revertFunc();
        },

        // eventRender: function(event, element) {
        //     console.log(event)
        // },
        eventMouseover(e) {
          console.log(e);
        },
        eventDragStart(e) {
          console.log(e);
        },
        eventConstraint(e) {
          alert("899");
        },
        eventMouseover: function(jsEvent, data, r) {
          console.log(e);
          var toheight = parseInt($(this).css("top"));
          var height = this.clientHeight / 2 + toheight;
          console.log(toheight);
          $(".fc-slats").append(
            "<div class='topcss'><div calss='aa'>ksjbcjudsbcu</div></div>"
          );
          $(".topcss").css("top", height);
        },
        eventMouseout: function() {
          $(".topcss").remove();
        }
        // console.log(jsEvent)
      },

      selected: {}
    };
  },

  methods: {
    refreshEvents() {
      this.$refs.calendar.$emit("refetch-events");
      success();
    },

    removeEvent() {
      this.$refs.calendar.$emit("remove-event", this.selected);
      this.selected = {};
    },

    eventSelected(event) {
      this.selected = { event, source: {} };
    },

    getTimes(newTime) {
      newTime = null || newTime;
      return Math.round(new Date(newTime).getTime());
    },

    // 时间处理
    timehandling(timeArr) {
      return timeArr[0].end._i;
    },
    eventCreated(view) {
      // console.log( view)
      // $(this).removeClass('fc-event')
      // var that=this;
      // setTimeout(function(){
      //     that.refreshEvents()
      // },2000)
      //this.$refs.calendar.$emit("refetch-events");
    },

    // eventCreated(...test) {
    //   var newTimeNow = new Date().getTime();
    //   var initArrEnd = test[0].end._i;
    //   var initArrStart = test[0].start._i;
    //   var montsStart = [+initArrStart.slice(1, 2) + 1];
    //   var montsEnd = [+initArrEnd.slice(1, 2) + 1];
    //   var newTimeNowstart =
    //     initArrStart.slice(0, 1).join("-") +
    //     "-" +
    //     montsStart.join("-") +
    //     "-" +
    //     initArrStart.slice(2, 3).join("-") +
    //     " " +
    //     initArrStart.slice(3, 6).join(":");
    //   var newTimeNowend =
    //     initArrEnd.slice(0, 1).join("-") +
    //     "-" +
    //     montsEnd.join("-") +
    //     "-" +
    //     initArrEnd.slice(2, 3).join("-") +
    //     " " +
    //     initArrEnd.slice(3, 6).join(":");
    //   newTimeNowstart = Math.round(new Date(newTimeNowstart).getTime());
    //   newTimeNowend = Math.round(new Date(newTimeNowend).getTime());

    //   if (newTimeNow > newTimeNowstart) {
    //     alert("过去时间无法操作");
    //     return false;
    //   }

    //   let bloo = true;
    //   for (const value of this.events) {
    //     var scopeTimeStart = new Date(value.start).getTime();
    //     var scopeTimeEnd = new Date(value.end).getTime();

    //     if (scopeTimeEnd < newTimeNowstart + 0.5) {
    //       continue;
    //     } else if (scopeTimeStart > newTimeNowend - 0.5) {
    //       continue;
    //     } else {
    //       alert("bu是时间有冲突");
    //       bloo = false;
    //       return false;
    //     }
    //   }
    //   if (bloo) {
    //     alert("弹出");
    //   }
    // },
    // 时间格式化
    eventDrop: function(event, delta, revertFunc) {
      alert(event.title + " was dropped on " + event.start.format());

      if (!confirm("Are you sure about this change?")) {
        revertFunc();
      }
    },

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
.fc-event {
  /* background-color: rgba(0,0,0,0.0) */
  /* border: 1px solid */
}
b.succeshtml {
  position: absolute;
  bottom: 0;
  right: 0;
  color: red;
}
.weekNameCss {
  margin-right: 10px;
  text-align: center;
  width: 25px;
  height: 25px;
  line-height: 25px;
  display: inline-block;
  border-radius: 50%;
  font-size: 13px;
  font-weight: lighter;
}
.weekNameCss_Action {
  color: #fff;
  background-color: #2c7eff;
}
.fc-view {
  overflow: hidden;
}

/* th.fc-day-header.fc-widget-header.fc-today > span.weekNameCss {
  margin-right: 10px;
  text-align: center;
  width: 25px;
  height: 25px;
  line-height: 25px;
  display: inline-block;
  border-radius: 50%;
  font-size: 13px;
  font-weight: lighter;
  color: #fff;
  background-color: #2c7eff;
} */
</style>
