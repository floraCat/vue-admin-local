<template>
  <div class="myImprt">
    <form-crud
      field    = "xlsdata" 
      specHandle = "import"
      :items   = "items"
      :ables   = "ables"
      :apiObj  = "{
                  edit: null,
                  del : null,
                }"
      :noObj   = "{
                  add : true,
                  dels: true,
                  }"
      :pageObj  = "pageObj"
      @importList = "importList"
    ></form-crud>
  </div>
</template>

<script>
  import formCrud from '../form/crud'
  import Field from './list_field'
  export default {

    components: {
      formCrud,
    },

    data () {
      return {
        items: [{loading: true}],
        ables: [],
        saveData: null,
        pageObj: {
          pageNo: 1
        }
      }
    },

    mounted: function () {
      this.checkField()
    },

    methods: {

      checkField (items) {
        this.ables = Field(this)
      },

      importList (_items) {
        this.items = JSON.parse(JSON.stringify(_items))
      },  

    }
  }
</script>