<template>
  <div >
    <table class="hello">
      <tr>
        <th v-for="(item, index) in date" :key='index'>
          <span v-if="index=='0'">{{index}}</span>
          <span v-else>{{index}}</span>
        </th>
      </tr>
      <tr v-for="(items,indexs) in data" :key='indexs'>
        <td v-for="(item, index) in dates" :key='index'>
          <span v-if="index=='0'" :data-x='indexs+1' :data-y='item.d'></span>
          <span v-else :data-x='indexs+1' :data-y='item.d'><a class="iniClass">{{item.hh.title}}</a><a class="iniClassB"></a></span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      opt: [{title: '项目一'}, {title: '项目二'}],
      date: [],
      dates: [],
      data: [0, 1, 2, 3, 4, 5]
    }
  },
  created () {
    this.tableDay()
  },
  methods: {
    tableDay () {
      for (let index = 0; index < 32; index++) {
        this.date.push({
          day: index
        })
      }

      this.date.map((item, indexs) => {
        this.dates.push({...item, d: indexs, hh: this.opt[indexs] || ''})
      })

      console.log(this.dates)
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  margin: 50px auto;
}
table {
  width: 60%;
    border-collapse: collapse;
}

table, td, th {
  position: relative;
  padding: 10px 5px 17px 7px;
  border: 1px solid black;
}
table, td, th, span{
  position: relative;
}
.iniClassB{
  font-size: 3px;
  position: absolute;
  z-index: 1;
}
.iniClass{
  font-size: 3px;
  position: absolute;
  z-index: 3;

}
</style>
