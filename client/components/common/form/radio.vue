<template>
  <div class="formCtrl">
    <label class="label">
      <span class="must" v-if="able.editObj.valid">*</span>
      <span v-text="able.label"></span>
    </label>
    <p class="p">
      <label class="radio">
        <a href="javascript:;" class="_check" :class="{_checked:parseInt(able.value)}" @click="check(1)"><i class="fa fa-check"></i></a>
        <span @click="check(1)">{{able.editObj.val1 ? able.editObj.val1 : '有效'}}</span>
      </label>
      <label class="radio">
        <a href="javascript:;" class="_check" :class="{_checked:!parseInt(able.value)}" @click="check(0)"><i class="fa fa-check"></i></a>
        <span @click="check(0)">{{able.editObj.val0 ? able.editObj.val0 : '无效'}}</span>
      </label>
    </p>
  </div>
</template>

<script>

export default {

  props: {
    able: {}
  },

  methods: {
    check (val) {
      this.able.value = val
    },
  }

}
</script>