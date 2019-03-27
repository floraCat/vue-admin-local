<template>
  <div class="formCtrl">
    <label class="label">
      <span class="must" v-if="able.editObj.valid">*</span>
      <span v-text="able.label"></span>
    </label>
    <p class="p">
      <input 
        type="password" 
        class="input" 
        v-model="able.value" 
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

}
</script>