<template>
  <div class="hello">
      <el-button type="text" @click="userChange">点击打开 Dialog</el-button>
    <!-- 模拟 用户选择 -->
    <!-- form card -->
    <el-dialog
  title="提示"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
   <el-row class="box-card" v-for="item in makeData" :key="item.index" >
         <el-form  :inline="true" :ref="item.formRef" :model="item.formModel" class="demo-form-inline">
            <el-form-item label="区域" prop='region' :rules="[{ required: true, message: '区域不能为空'}]">
               <el-select v-model="item.formModel.region" placeholder="请选择">
                <el-option v-for="item in item.formModel.options"  :key="item.value" :label="item.label"  :value="item.value"> </el-option>
            </el-select>
            </el-form-item>
             <el-form-item label="审批人" prop='user' :rules="[{ required: true, message: '审批人不能为空'}]">
               <el-time-select v-model="item.formModel.user" :picker-options="{ start: '08:30', step: '00:15', end: '18:30'}" placeholder="选择时间">
                </el-time-select>
            </el-form-item>
            <el-form-item label="审批人" prop='user' :rules="[{ required: true, message: '审批人不能为空'}]">
               <el-input v-model="item.formModel.input" placeholder="审批人"></el-input>
            </el-form-item>
        </el-form>
</el-row>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
     
<!-- 提交 -->
<el-row type="flex" justify="center">
  <el-button type="primary" plain @click="enterForm">提交</el-button>
</el-row>
  </div>
</template>

<script>
export default {
  mounted() {
    this.init();
    this.userChange(); //模拟登录的是小明
  },
  data() {
    return {
        centerDialogVisible:false,
      one: [],
      makeData: [],
      options: [
        {
          value: "1",
          label: "黄金糕"
        },
        {
          value: "2",
          label: "双皮奶"
        },
        {
          value: "3",
          label: "蚵仔煎"
        },
        {
          value: "4",
          label: "龙须面"
        },
        {
          value: "5",
          label: "北京烤鸭"
        }
      ]
    };
  },
  methods: {
      open(){

      },
    init() {
      for (let index = 0; index < 2; index++) {
        this.makeData.push({
          formRef: index, //表单ref
          formModel: {
            user: "",
            region: "",
            options: this.options,
            input: ""
          },
          formShow: "", //表单是否显示的控制
          formName: "表单A" //表单标题
        });
      }
    },
    enterForm() {
      let arrModel = [];
      let newArr = [];
      let _self = this;
      this.makeData.forEach((item, index) => {
        checkForm(item.formRef);
        arrModel.push(item.formModel);
      });

      function checkForm(arrName) {
        var result = new Promise(function(resolve, reject) {
          _self.$refs[arrName][0].validate(valid => {
            if (valid) {
              resolve();
            } else {
              reject();
            }
          });
        });
        newArr.push(result);
      }

      Promise.all(newArr)
        .then(function() {
          //都通过了
          console.log(arrModel);
          const arr = [];
          arrModel.forEach(item => {
            arr.push({
              [item.region]: [{ user: item.user, region: item.region }]
            });
          });
          console.log(arr);
          const str = JSON.stringify(arr);

          const strs = str.substring(1, str.length - 1);
          console.log(eval("(" + strs + ")"));

          // alert("恭喜，表单全部验证通过");
        })
        .catch(function() {
          console.log("err");
        });
    },
    userChange() {
        this.centerDialogVisible=true
      this.makeData.map((item, index) => {
        var c = item.formRef;
        if (this.$refs[c] && this.$refs[c][0]) {
          this.$refs[c][0].resetFields();
        }
        return item;
      });
    }
  }
};
</script>

<style scoped>
.box-card {
  margin-bottom: 30px;
}
</style>
