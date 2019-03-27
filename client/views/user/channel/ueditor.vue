<template>
  <vue-editor id="editor"
      useCustomImageHandler
      @imageAdded="handleImageAdded" v-model="htmlForEditor">
    </vue-editor>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  components: {
      VueEditor
   },

   props: [
    'transData'
   ],

  data () {
    return {
      htmlForEditor: ''  
    }
  },

  computed: {
    api_img () {
      // return 'http://localhost/_vue_test/imgHandle.php'
      return `${this.API.url}/resource/save${this.API.suf}`
    },
    content () {
      return this.transData.content
    }
  },

  mounted () {},

  watch: {
    htmlForEditor () {
      this.transData.content = this.htmlForEditor
    },
    content () {
      this.htmlForEditor = this.transData.content
    }
  },

  methods: {
      //提交上传的图片
      handleImageAdded: function(file, Editor, cursorLocation) {
        let self = this
        var formData = new FormData();
        formData.append('image', file)

        self.axios({
          url: self.api_img,
          method: 'POST',
          data: formData,
          headers: {
              "Content-Type": "multipart/form-data"
            }
        })
        .then((res) => {
          console.log('php返回数据')
          console.log(res)
          let url = 'http://' + res.data.result.resPath
          Editor.insertEmbed(cursorLocation, 'image', url);
        })
        .catch((err) => {
          console.log(err);
        })
      }
    }

}
</script>

<style lang="scss">
.quillWrapper .ql-snow.ql-toolbar {
  border-top-left-radius: .4rem;
  border-top-right-radius: .4rem;
}
.ql-container.ql-snow {
  border-bottom-left-radius: .4rem;
  border-bottom-right-radius: .4rem;
}
</style></style>