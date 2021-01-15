<template>
  <div>
    <v-container class="my-5">
      <h2 class="mb-5">{{ $t(field) }}: {{ id }}（{{ results.length }}）</h2>

      <GChart type="ColumnChart" :data="chartData" :options="chartOptions" />

      <div v-for="(arr, key) in items" :key="key" class="mt-5">
        <h3 class="mb-2">{{ key }}（{{ arr.length }}）</h3>
        <p>
          <nuxt-link
            v-for="(obj, key2) in arr"
            :key="key2"
            :to="
              localePath({
                name: 'item-id',
                params: {
                  id: obj.objectID,
                },
              })
            "
            class="mr-5"
          >
            {{ obj.label }}
          </nuxt-link>
        </p>
      </div>
    </v-container>
  </div>
</template>

<script>
import * as algoliasearch from 'algoliasearch'
import config from '@/plugins/algolia.config.js'
import { GChart } from 'vue-google-charts'

export default {
  components: {
    GChart,
  },
  async asyncData({ payload, app }) {
    if (payload) {
      return { item: payload }
    } else {
      const id = app.context.params.id
      const field = app.context.params.entity

      const client = algoliasearch(config.appId, config.apiKey)
      const index = client.initIndex('dev_MAIN_temporal_asc')

      const results = await index.search('', {
        filters: field + ':' + id,
        hitsPerPage: 1000,
      })

      const items = {}

      for (let i = 0; i < results.hits.length; i++) {
        const obj = results.hits[i]
        const year = obj.year
        if (!items[year]) {
          items[year] = []
        }
        items[year].push(obj)
      }

      return { results: results.hits, items, field }
    }
  },

  data() {
    return {
      baseUrl: process.env.BASE_URL,
      chartOptions: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        },
      },
    }
  },

  head() {
    const title = this.title
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.url,
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ],
    }
  },

  computed: {
    chartData() {
      const items = this.items
      let minYear = 2000
      let maxYear = 0

      for (let year in items) {
        year = Number(year)
        if (minYear > year) {
          minYear = year
        }
        if (maxYear < year) {
          maxYear = year
        }
      }

      const years = [['Year', 'Appearances']]
      for (let year = minYear; year < maxYear + 1; year++) {
        let freq = 0
        if (items[year]) {
          freq = items[year].length
        }
        years.push([year + '', freq])
      }

      return years
    },

    title() {
      return this.id
    },

    id() {
      return this.$route.params.id
    },

    url() {
      return this.baseUrl + this.$route.path
    },
  },

  methods: {
    getQuery(label, value) {
      const field = `dev_MAIN[refinementList][${label}][0]`
      const query = {
        'dev_MAIN[sortBy]': 'dev_MAIN_temporal_asc',
      }
      query[field] = value
      return query
    },

    getValues(data) {
      if (!data) {
        return []
      }
      return Array.isArray(data) ? data : [data]
    },

    dwnJson() {
      // 保存するJSONファイルの名前
      const fileName = this.item.objectID + '.xml'

      // データをJSON形式の文字列に変換する。
      const data = this.item.xml

      // HTMLのリンク要素を生成する。
      const link = document.createElement('a')

      // リンク先にJSON形式の文字列データを置いておく。
      link.href = 'data:text/xml;charset=utf-8,' + encodeURIComponent(data)

      // 保存するJSONファイルの名前をリンクに設定する。
      link.download = fileName

      // ファイルを保存する。
      link.click()
    },
  },
}
</script>
<style>
date {
  background-color: #bbdefb;
}
time {
  background-color: #fff9c4;
}
persName,
forename,
surface {
  background-color: #ffccbc;
}
placeName {
  background-color: #c8e6c9;
}
</style>
