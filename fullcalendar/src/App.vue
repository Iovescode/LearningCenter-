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
//获取当前时间戳
// function getTimes(newTeim){
//     const newTeim = null||newTeim
//     return Math.round(new Date(newTeim).getTime()
//   }
a.
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
         // constraint: "businessHours",
          className: "success",
         editable:true,
        },
        {
          id: 2,
          title: "Party",
          start: "2018-08-13T20:00:00",
          end: "2018-08-13T22:00:00",
         // constraint: "businessHours",
          className: "success",
          editable:true,
        },
        {
          id: 3,
          title: "Party全天计划\r\n#####\r\n写代码",
          start: "2018-08-14T20:00:00",
          end: "2018-08-14T22:00:00",
          //constraint: "businessHours",
          className: "success",
         editable:true,
          description: 'This is a cool event'
        }
      ],

      config: {
       // allDay:false,
        startEditable:false,
        editable:true,
        allDayText: "all-day",
         selectable: false,
        allDaySlot: false,
        locale: "ZH-CN",
        weekMode: "variable",
        defaultView: "agendaWeek",
        weekMode: "liquid",
        dragOpacity: {
			agenda: .5,
			'':.6
		},
        // eventClick: event => {
        //   console.log(event);
        // },
        navLinks: true, // can click day/week names to navigate views
            navLinkDayClick: function(date, jsEvent) {
                console.log('day', date.format()); // date is a moment
                console.log('coords', jsEvent.pageX, jsEvent.pageY);
                alert(date.format());
            },

         dayClick: function(date, jsEvent, view,e) {
           console.log(date, jsEvent, view,e)
          // alert('Clicked on: ' + date.format());
          // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
          //alert('Current view: ' + view.name);
          // change the day's background color just for fun
          // $(this).css('background-color', 'red');
        },
         eventDrop: function(event,dayDelta,minuteDelta,allDay,revertFunc) {
         alert(90)
         console.log(event,dayDelta,minuteDelta,allDay,revertFunc)
       },
        eventClick: function(calEvent, jsEvent, view) {
        alert('Event: ' + calEvent.title);
        alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
        alert('View: ' + view.name);

        // change the border color just for fun
        $(this).css('border-color', 'red');

    },
   
    
		
		 eventResize: function(event,dayDelta,minuteDelta,revertFunc) {
			revertFunc();
    	},
		
    // eventRender: function(event, element) {
    //     console.log(event)
    // },
    eventMouseover(e){
      console.log(e)
    },
    eventDragStart(e){
     console.log(e)
    },
    eventConstraint(e){
      alert('899')
    },
    eventMouseover:function(jsEvent,data,r){
      var toheight= parseInt($(this).css('top'))
      var height=this.clientHeight/2+toheight
      console.log(toheight)
      $('.fc-slats').append("<div class='topcss'><div calss='aa'>ksjbcjudsbcu</div></div>")
      $('.topcss').css('top',height)
    },
     eventMouseout:function(){
         
           $('.topcss').remove()
        },
          // console.log(jsEvent)
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
    },
    
    
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
</style>
