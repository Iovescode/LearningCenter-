<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="date"
        label=""
      />
      <el-table-column
        prop="1"
        label="周一"
      />
      <el-table-column
        prop="2"
        label="周二"
      />
      <el-table-column
        prop="3"
        label="周三"
      />
      <el-table-column
        prop="4"
        label="周四"
      >
        <template slot-scope="scope">
          <span>dcdcwd</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="5"
        label="周五"
      />
      <el-table-column
        prop="6"
        label="周六"
      />
      <el-table-column
        prop="7"
        label="周日"
      />
    </el-table>
  </div>
</template>

<script>
export default {

  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      for (let index = 0; index < 24; index++) {
        this.tableData.push({
          date: index,
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
          6: [],
          7: []
        })
      }
    }
  }
}
</script>
