<template>
  <div class="formCtrl">
    <label class="label">
      <span class="must" v-if="able.editObj.valid">*</span>
      <span v-text="able.label"></span>
    </label>
    <p class="p">
      <input 
        type="text"
        class="input" 
        :class="{readonly:readonly}"
        v-model="able.value"
        :readonly="readonly" 
        :placeholder="able.editObj.placeholder"
        :data-note="able.label" 
        :data-valid='able.editObj.valid' 
        :data-type='able.editObj.type' 
        :data-forCheck="able.editObj.valid || able.editObj.type"
      />
    </p>
  </div>
</template>

<script>

export default {
  
  props: {
  	action: String,
    able: Object
  },

  computed: {
  	readonly () {
  	  return this.action === 'add' ? false : this.able.editObj.modReadOnly
  	}
  },
}
</script>

<style lang="scss" scoped>
.readonly {
  border:none;
}
</style>