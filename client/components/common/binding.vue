<!-- 绑定弹窗（如角色/权限绑定） -->
<template>
  <div class="roleSetting">
    <i class="bg"></i>
    <div class="wrap">
      <button class="delete" @click="close()"></button>
      <div class="top">
        <h3>当前{{this.dataL[0] && this.dataL[0].roleName ? '用户' : '角色'}}：</h3>
        <ul class="roles">
          <li>{{transData.curName}}</li>
        </ul>
      </div>
      <div class="listBox">
        <!--左边-->
        <ol>
          <h5>其他{{this.dataL[0] && this.dataL[0].roleName ? '角色' : '权限'}}</h5>
          <ul class="opts">
            <li v-for="(item, index) in dataL" v-text="item[fieldKey]" @click="goLeft(index)"></li>
          </ul>
        </ol>
        <!--右边-->
        <ol class="self">
          <h5>已有{{this.dataL[0] && this.dataL[0].roleName ? '角色' : '权限'}}</h5>
          <ul class="opts">
            <li v-for="(item, index) in dataR" v-text="item[fieldKey]" @click="goRight(index)"></li>
          </ul>
        </ol>
      </div>
      <p>
        <a class="formBtn on" @click="submit()">提交</a>
        <a class="formBtn" @click="reset()">重置</a>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dataR: [],
        dataL: [],
        defDataL: [],
        defDataR: []
      }
    },
    props: [
      'transData',
    ],

    computed: {
      fieldKey () {
        // 区分绑定角色or权限
        let role = this.dataL[0] && this.dataL[0].roleName
        return role ? 'roleName' : 'menuName'
      }
    },
    mounted () {
      this.getItems()
    },

    methods: {

      getItems () {
        let self = this
        self.axios({
          url: self.transData.apiBindGet,
          method: 'GET',
          params: {
            id: self.transData.id
          }
        }).then((res) => {
          console.log(self.transData.curName +'绑定')
          if (res.data.status === '') {
            Funs.delCookie('xm_cookie')
            window.location.href = ''
          }
          if (res.data.status === 'failure') {
            self.$emit('failNote', res.data.message)
            setTimeout(function () {
              self.close()
            }, 0)
          }
          if (res.data.status === 'success') {
            console.log(res)
            let menus = res.data.result ? res.data.result.menus : null
            let rs = menus ? menus : res.data.user.roles
            self.dataR = rs || []
            self.dataL = res.data.list || []
            self.defDataL = JSON.stringify(rs)
            self.defDataR = JSON.stringify(res.data.list)
          }
        })
      },

      close (index) {
        this.$emit('close',index)
      },

      reset () {
        this.dataR = this.defDataL ? JSON.parse(this.defDataL) : []
        this.dataL = this.defDataR ? JSON.parse(this.defDataR) : []
      },

      submit () {
        let self = this
        // 区分绑定角色or权限
        let role = this.dataL[0] && this.dataL[0].roleName
        let arr = []
        for (let i = 0; i < self.dataR.length; i ++ ) {
          arr.push(self.dataR[i].id)
        }
        let submitData = {
          id: self.transData.id,
          roleIds: role ? arr : arr.join(',')
        }
        self.axios({
          url: self.transData.apiBindPost,
          method: 'POST',
          type: 'json',
          data: submitData
        }).then((res) => {
          console.log('角色绑定提交')
          if (res.data.status === '') {
            Funs.delCookie('xm_cookie')
            window.location.href = ''
          }
          if (res.data.status === 'failure') {
          self.$emit('failNote', res.data.message)
          setTimeout(function () {
            self.close()
          }, 0)
        }
        if (res.data.status === 'success') {
          console.log(res)
          self.close(1)
        }
        })
      },

      // 点左边会把其转到右边
      goRight (index) {
        if (this.dataL) {
          this.dataL.splice(0, 0, this.dataR[index])
        }
        else {
          this.dataL.push(this.dataR[index])
        }
        this.dataR.splice(index, 1)
      },

      // 点右边会把其转到左边
      goLeft (index) {
        if (this.dataR) {
          this.dataR.splice(0, 0, this.dataL[index])
        }
        else {
          this.dataR.push(this.dataL[index])
        }
        this.dataL.splice(index, 1)
      }
    }
  }
</script>

<style lang="scss">
@import '~assets/style/var.scss';
.roleSetting { 
  z-index: 9999; 
  position: fixed!important; 
  top: 0; left: 0; 
  width: 100%; 
  height: 2000px;

  .bg { 
    position: absolute; 
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100%; 
    background: #333; 
    opacity: .6;
  }

  .wrap{ 
    position: absolute; 
    top: 10%; 
    left:50%; 
    margin-left: -350px; 
    z-index: 99; 
    background: #fff; 
    width: 700px; 
    padding: 2rem 0 2rem 100px; 
    border-radius: 5px;
  }
  .top { 
    position: relative; 
  }
  .delete { 
    z-index: 99; 
    position: absolute; 
    top: 20px; 
    right: 20px; 
  }
  h3 { 
    position: absolute; 
    top: 0; 
    left: 0; 
    line-height: 3rem;
  }
  .roles { 
    margin-left: 6rem; 
    overflow: hidden;

    li{ 
      float: left; 
      margin-right: .5rem; 
      font-size: 16px; 
      font-weight: bold; 
      height: 3rem; 
      line-height: 3rem; 
      padding: 0 2rem; 
      background: $zs; 
      color: #fff; 
      border-radius: 4px;
    }
  }
}
.listBox { 
  overflow: hidden; 
  padding: 2rem 0; 
  ol{ 
    float: left; 
    width: 40%; 
    margin-right: 4%; 
    &.self {
      ul {
        background: $zBg;
        li {
          border-bottom: $zLine 1px solid;
          &:hover {
            color: #fff;
            background:#3a71a3;
          }
        }
      }
    }
  }
  h5 { 
    line-height: 3rem; 
    font-size: 16px; 
  }
  .opts{ 
    height: 20rem; 
    overflow-y: scroll; 
    padding: .5rem 0; 
    border: #ddd 1px solid; 
    border-top: $zs 3px solid; 
    line-height: 2.6rem;

    li {
      text-indent: 10px;
      border-bottom: #e8e8e8 1px solid;
      cursor: pointer;
      &:hover {
        background: #e5e5e5;
      }
    }
  }
}
</style>
