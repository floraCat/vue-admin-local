<template>
  <div class="formCtrl">
    <label class="label" v-text="able.label"></label>
    <p class="p">
      <input 
        type="hidden" 
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
