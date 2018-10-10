<template>
  <div class="app-container">s
    <div>
      <div style="height:100;width:50px">
        <ul>
          <li>dfvf</li>
          <li>dfvf</li>
          <li>dfvf</li>

        </ul>
        <ul>
          <li>dfvf</li>
          <li>dfvf</li>
          <li>dfvf</li>
        </ul>
      </div>
    </div>
    {{yourData}}
    <vue-timepicker :minute-interval="5" :format="yourFormat" v-model="yourData"></vue-timepicker>
    <div/>
  </div>
</template>

<script>
import VueTimepicker from 'vue2-timepicker'
export default {
  components: {VueTimepicker},
  name: 'InlineEditTable',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      yourFormat: 'hh:mm',
      yourData: {
        "hh": "00",
        "mm": "00"
      },
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {

    },
    selectTime() {
      if (this.isBloo) {
        this.isBloo = true
        // return false
      } else {
        this.$nextTick(() => {
          const times = [...document.querySelector('.el-time-spinner').children]
          const elem = [...times[1].children[0].children[0].children]
          elem.map((item, index) => {
            item.remove(index)
          })
          for (let index = 0; index < 12; index++) {
            var node = document.createElement('li')
            node.innerHTML = index * 5
            node.className = 'el-time-spinner__item'
            document.querySelector('.el-time-spinner').children[1].children[0].children[0].appendChild(node)
          }
          const els = [...times[1].children[0].children[0].children]
          for (let index = 0; index < els.length; index++) {
            // console.log(els[index])
            els[index].onclick = function(e) {
              if (e.target.className) {
                e.target.className = 'el-time-spinner__item active'
              } else {
                e.target.className = 'el-time-spinner__item'
              }
            }
          }
        })
      }
      this.isBloo = true
      // console.log(900)
    },
    my() {
      // console.log(90)
    }
  }
}
</script>

<style>
/* .el-time-spinner{
    width: 143%;
}
.el-time-panel.el-popper.Tims .el-time-panel__content.has-seconds .el-time-spinner.has-seconds >div:nth-last-child(1){
    display: none
} */

</style>
