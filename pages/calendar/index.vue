<template>
  <div>
    <v-container class="my-10">
      <v-simple-table>
        <template #default>
          <tbody>
            <tr v-for="(obj, key) in years" :key="key">
              <th class="text-center" width="4%" style="border: 1px solid grey">
                {{ key }}
              </th>
              <template v-for="value in 12">
                <td
                  :key="key + '-' + value"
                  class="text-center"
                  width="3%"
                  style="border: 1px solid grey"
                  :style="
                    items[key + '-' + zfill(value, 2)]
                      ? 'background-color: yellow;'
                      : ''
                  "
                >
                  {{ value }}月
                  <br />
                  {{ items[key + '-' + zfill(value, 2)] || 0 }}
                </td>
              </template>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </div>
</template>

<script>
import * as algoliasearch from 'algoliasearch'
import config from '@/plugins/algolia.config.js'

export default {
  async asyncData({ payload }) {
    if (payload) {
      return { item: payload }
    } else {
      const client = algoliasearch(config.appId, config.apiKey)
      const index = client.initIndex('dev_MAIN')

      const results = await index.searchForFacetValues('yearAndMonth', '', {
        maxFacetHits: 100,
      })

      const items = {}
      for (let i = 0; i < results.facetHits.length; i++) {
        const obj = results.facetHits[i]
        items[obj.value] = obj.count
      }

      return { items }
    }
  },
  data: () => ({
    minYear: 1868,
    maxYear: 1920,
  }),
  computed: {
    years() {
      const years = {}
      for (let i = this.minYear; i < this.maxYear; i++) {
        years[i] = {}
      }
      return years
    },
  },
  methods: {
    // NUM=値 LEN=桁数
    zfill(NUM, LEN) {
      NUM = Number(NUM)
      return (Array(LEN).join('0') + NUM).slice(-LEN)
    },
  },
}
</script>
