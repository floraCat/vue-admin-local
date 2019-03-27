<template>
  <div>
    <script :id=id type="text/plain"></script>
  </div>
</template>
<script>
import 'assets/plugin/UE/ueditor.config.js'
import 'assets/plugin/UE/ueditor.all.js'
import 'assets/plugin/UE/lang/zh-cn/zh-cn.js'
import 'assets/plugin/UE/ueditor.parse.min.js'

  export default {
    name: 'UE',
    data () {
      return {
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      },
      id: {
        type: String
      },
    },
    mounted() {
      const _this = this;
      this.editor = UE.getEditor(this.id, this.config); // 初始化UE
      this.editor.addListener("ready", function () {
        _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      });
    },
    methods: {
      getUEContent() { // 获取内容方法
        console.log(42546474568567)
        console.log(this.editor.getContent())
        return this.editor.getContent()
      }
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>

