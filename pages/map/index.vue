<template>
  <div>
    <v-sheet color="grey lighten-3">
      <v-container class="py-4">
        <h1>{{ $t('map') }}</h1>
      </v-container>
    </v-sheet>

    <v-container>
      <div id="map-wrap" style="height: 80vh" class="my-2">
        <mapc :markers="markers" :zoom="2" :center="[38, 0]" />
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'
import Mapc from '~/components/common/Map.vue'

@Component({
  components: {
    Mapc,
  },
})
export default class PageMap extends Vue {
  map: any = {}
  markers: any[] = []

  async asyncData({ payload }: any) {
    if (payload) {
      return { item: payload }
    } else {
      const results = await axios.get(
        process.env.BASE_URL + '/data/spatial.json'
      )
      const markers = []

      for (const label in results.data) {
        const obj = results.data[label]

        const param: any = {}
        const fcField = 'fc-spatial'
        param[fcField] = label

        const marker: any = {
          latlng: [obj.lat, obj.long],
          content: label,
          path: {
            name: 'entity-entity-id',
            params: {
              entity: 'spatial',
              id: label,
            },
          },
        }

        markers.push(marker)
      }

      return {
        markers,
      }
    }
  }
}
</script>
