<template>
  <div>
    <el-table
      :ref="tableRefName"
      :data="rows"
      :day="day"
      :cell-class-name="tableRowClassName"
      border
      class="special-table-hidden-checkbox"
      element-loading-text="拼命加载中..."
      @cell-click="openactivename"
      @selection-change="handleSelectionChange">
      <!-- 正常列 -->
      <el-table-column
        v-for="(cloumn,index) in columns"
        :key="index"
        :prop="cloumn.value"
        :label="cloumn.text"
        :fixed="cloumn.fixed"
        :sortable="cloumn.sortable">

        <template slot-scope="scope">
          <template v-if="slotNameArr && slotNameArr.includes(cloumn.value)">
            <slot :name="cloumn.value" :row="scope.row" />
          </template>
          <template v-else>{{ scope.row[cloumn.value] }}</template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ExpandTable',
  filters: {
  },
  props: {
    // 基础类
    rows: {
      type: Array,
      required: true
    }, // 列表：数据(必填)
    columns: {
      type: Array,
      required: true
    }, // 列表：表头(必填)  value:String(必填) text:String(必填) sortable:Boolean fixed: true/left/right
    day: { type: Number, required: true }
    // slotNameArr: Array, // 列表：slot数组
    // tableRefName: String, // 列表：ref名字
    // cellClassRowName: String, // 列表：放在row里 行的样式名字
    // checkboxValidateRowName: String, // 列表：放在row里 判断当前行是否显示 checkBox
    // canCheckAllBox: String, // 是否有checkBox 传yes/no/'' 是否允许全选
    // tableExpandSlotName: String, // table 伸缩模板名称
    // tableExpandColumns: Array // table 伸缩标题名称数组
  },
  data() {
    return {
    }
  },
  computed: {
    'labelClassName'() {
      if (this.canCheckAllBox === 'no') {
        return 'display-none'
      }
      return ''
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    tableRowClassName({ row, column, rowIndex, columnIndex }) {
      console.log(columnIndex)
      if (this.day) {
        if (columnIndex === this.day) {
          return 'red'
        }
      }

      // return 'red'
    }, // 行样式
    openactivename(row, column, cell, event) {
      let keyname
      for (const x in row) {
        if (x === column.property) {
          keyname = row[x]
        }
      }
      this.$emit('open-activename', keyname, column, cell, event)
    },
    handleSelectionChange(val) {
      this.$emit('selection-change-event', val)
    }, // checkbox 选中/取消 事件
    checkBoxValidateCanSelect(row) {
      if (row[this.checkboxValidateRowName] === true) {
        return false
      }
      return true
    } // 判断行是否能选中 checkbox
  }
}
</script>

<style scoped lang="sass"></style>

