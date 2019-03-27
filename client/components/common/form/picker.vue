<template>
  <div class="formCtrl">
    <label class="label">
      <span class="must" v-if="able.editObj.valid">*</span>
      <span v-text="able.label"></span>
    </label>
    <p class="control" style="margin-bottom:8px;">
      <el-date-picker
      v-model="able.value"
      type="datetime"
      format="yyyy-MM-dd HH:mm"
      placeholder="选择日期时间"
      align="right"
      :picker-options="pickerOptions1">
    </el-date-picker>
    </p>
  </div>
</template>

<script>

import {DatePicker} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default {

  components: {
    'el-date-picker':DatePicker
  },

  data() {
      return {
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      };
    },
  
  props: {
    action: String,
    able: Object
  },

  updated () {
    console.log(555555)
    console.log(this.able.value)
  }
  
}
</script>

<style>
.el-time-spinner__wrapper:last-child {
  display: none;
}
</style>