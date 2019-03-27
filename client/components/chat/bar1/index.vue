<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-6">
      <article class="tile is-child box">
        <chart :type="'bar'" :data="waveData" :options="options"></chart>
      </article>
    </div>
  </div>
</template>

<script>

import Chart from 'vue-bulma-chartjs'

export default {

  components: {
    Chart
  },

  props: [
    'obj',
  ],

  data () {
    return {

      options: {
        tooltips: {
          mode: 'label'
        }
      },
    }
  },

  computed: {

    waveData () {
      return {
        labels: this.obj.labels,
        datasets: [{
          label: this.obj.label,
          data: this.obj.data,
          backgroundColor: this.obj.backgroundColor
        }]
      }
    },

  },

}
</script>