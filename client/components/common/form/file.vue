<!-- 图片上传控件 -->
<template>
  <div class="formCtrl">
    <label class="label">
      <span class="must" v-if="able.editObj.valid">*</span>
      <span v-text="able.label"></span>
    </label>
    <div class="p">
      <form class="myFile">
        <div class="wrap">
          <span class="btn" @click="upload()" v-show="!items.length">点击上传图片</span>
          <div class="ctrl">
            <input class="file" type="file" @change="showUploadPic($event)" ref="file" />
          </div>
          <input 
            type="hidden" 
            :value="items.join(',')" 
            :data-note="able.label" 
            :data-valid='able.editObj.valid' 
            :data-type='able.editObj.type' 
            :data-forCheck="able.editObj.valid || able.editObj.type" 
          />
            <div class="imgs" v-show="items.length">
              <li v-for="(item, index) in items">
                <div>
                  <img :src="item" />
                  <a href="javascript:;" class="quit" @click="delect(index)"></a>
                </div>
              </li>
            </div>
            <span class="note" v-text="able.editObj.note"></span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {

  data () {
    return {
      items: []
    }
  },

  props: {
    able: {},
    ables: {}
  },

  computed: {
    resSave () {
      return `${this.API.url}/resource/isave${this.API.suf}`
    }
  },

  mounted () {
    if (this.able.value) {
      this.items.push(this.able.value)
    }
  },

  methods: {
    // 获取图片尺寸
    picSize (obj) {
      var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
      var fileSize = 0;
      if (isIE && !obj.files) {
        var filePath = obj.value;
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
        var file = fileSystem.GetFile(filePath);
        fileSize = file.Size; //单位：b
      } else {
          fileSize = obj.files[0].size;
      }
      var size = fileSize / 1024; // 单位k
      return size
    },
    showUploadPic (ev) {
      let self = this
      let _size = this.picSize(this.$refs.file)
      if (_size > this.able.editObj.limitSize) {
        alert("上传图片已超过限制的大小")
        return false
      }
      let objUrl = this.getFileUrl(ev.target)
      this.items.push(objUrl)
      let image = new FormData()
      image.append('file', this.$refs.file.files[0])
      this.submit(image)
    },
    getFileUrl (obj) {
      let url
      if (navigator.userAgent.indexOf("MSIE")>=1){ // IE 
        url = obj.value
      }else if(window.createObjectURL!=undefined){ // basic
        url = window.createObjectURL(obj.files.item(0))
      }else if (window.URL!=undefined){ // mozilla(firefox)
        url = window.URL.createObjectURL(obj.files.item(0))
      }else if (window.webkitURL!=undefined){ // webkit or chrome
        url = window.webkitURL.createObjectURL(obj.files.item(0))
      } 
      return url
    },
    submit (data) {
      let self = this
      self.axios({
        url: self.resSave,
        method: 'POST',
        data: data,
        headers: {
              "Content-Type": "multipart/form-data"
            }
      }).then((res) => {
        console.log('图片上传后返回数据：')
        if (res.data.status === '') {
          Funs.delCookie('xm_cookie')
          window.location.href = ''
        }
        if (res.data.status === 'failure') {
          self.$emit('alert', 1, res.data.message)
        }
        if (res.data.status === 'success') {
          console.log(res)
          let _rs = res.data.result
          if (self.able.editObj.saveField2) { // 一般为缩略图
            for (let x = 0; x < self.ables.length; x ++) {
              if (self.ables[x].key === self.able.editObj.saveField2) {
                self.ables[x].value = _rs[self.able.editObj.saveFile2]
              }
            }
          }
          self.able.value = _rs.resPath
        }
      })
    },
    delect (index) {
      this.items.splice(index, 1)
    },

  },

}
</script>

<style scope>
.select { width: 10rem; }
.select select { width: 10rem; }

.myFile .wrap { position: relative; margin-top: .3rem;}
.myFile .wrap .btn{ display: block; width: 100px; height: 30px; line-height: 30px; text-align: center; border:#ddd 1px solid; background: #f6f6f6; border-radius: 5px;}
.myFile .wrap .ctrl{ position: absolute; top: 0; left: 0;}
.myFile .wrap .ctrl input[type=file]{ display: none; width: 100px; height: 30px;}
.myFile .wrap .ctrl input[type=file]:first-child{ display: block; opacity:0; filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);}
.myFile .wrap .imgs{ overflow: hidden;}
.myFile .wrap .imgs li{ position: relative; float: left; margin: 0 10px 10px 0; text-align: center;}
.myFile .wrap .imgs li div{ display: table-cell;  width: 84px; height: 84px; padding: 2px; border:#eee 1px solid; text-align: center; vertical-align: middle;}
.myFile .wrap .imgs img{ max-width: 100%; max-height: 100%;}
.myFile .wrap .imgs .quit{ position:absolute; bottom:-5px; right:-5px; width:15px; height:15px; background:url(~assets/imgs/i_quit2.png) no-repeat;}
.myFile .wrap .note { display: block; font-size: 12px; color: #aaa; margin-bottom: 10px;}
</style>