<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-4">
      <article class="tile is-child box">
        <chart :type="'line'" :data="seriesData" :options="options"></chart>
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

    seriesData () {
      let data = {
        labels: this.obj.labels
      }
      data.datasets = this.obj.series.map((e, i) => {
        return {
          data: this.obj.data[i],
          label: this.obj.series[i],
          borderColor: this.obj.backgroundColor[i].replace(/1\)$/, '.5)'),
          pointBackgroundColor: this.obj.backgroundColor[i],
          backgroundColor: this.obj.backgroundColor[i].replace(/1\)$/, '.5)')
        }
      })
      return data
    }
  },

}
</script>