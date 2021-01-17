<template>
  <div>
    <v-container class="my-5">
      <h2 class="mb-5">
        {{ $t(field) }}: {{ id }}（{{ total.toLocaleString() }}）
      </h2>

      <template v-if="Object.keys(entity).length > 0">
        <v-row class="mb-5">
          <v-col v-if="entity.image" cols="12" sm="2">
            <v-img height="150px" contain :src="entity.image" />
          </v-col>
          <v-col cols="12" sm="10">
            <p v-if="entity.description">
              {{ entity.description }}
            </p>

            <v-tooltip bottom>
              <template #activator="{ on }">
                <v-btn
                  :href="baseUrl + '/snorql?describe=' + uri"
                  icon
                  v-on="on"
                  ><v-img
                    contain
                    width="30px"
                    :src="baseUrl + '/img/icons/rdf-logo.svg'"
                    @click="dwnJson()"
                /></v-btn>
              </template>
              <span>{{ $t('RDF') }}</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </template>

      <v-card flat outlined class="my-5">
        <GChart type="ColumnChart" :data="chartData" :options="chartOptions" />
      </v-card>

      <h3 class="mt-5">
        {{ $t('items') }}<small v-if="total > 50">（{{ $t('上位') }}50）</small>
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn
              :to="
                localePath({
                  name: 'search',
                  query: getQuery(field, id),
                })
              "
              icon
              v-on="on"
              ><v-icon>mdi-magnify</v-icon></v-btn
            >
          </template>
          <span>{{ $t('search') }}</span>
        </v-tooltip>
      </h3>

      <div v-for="(arr, key) in items" :key="key" class="mt-5">
        <h4 class="mb-2">{{ key }}（{{ arr.length }}）</h4>
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
import axios from 'axios'

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
      const index = client.initIndex('dev_MAIN') // _temporal_asc

      const facets = await index.searchForFacetValues('year', '', {
        filters: field + ':' + id,
        maxFacetHits: 100,
      })

      const results = await index.search('', {
        filters: field + ':' + id,
        hitsPerPage: 50,
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

      return { results: results.hits, items, field, facets: facets.facetHits }
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
      entities: [],
      uri: '',
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
    total() {
      let total = 0
      const facets = this.facets

      for (let i = 0; i < facets.length; i++) {
        const facet = facets[i]

        total += facet.count
      }

      return total
    },
    chartData() {
      // const items = this.items
      let minYear = 2000
      let maxYear = 0

      const facets = this.facets
      const items = {}

      for (let i = 0; i < facets.length; i++) {
        const facet = facets[i]
        const year = Number(facet.value)
        items[year] = facet.count

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
          freq = items[year]
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

    entity() {
      const entities = this.entities
      if (entities.length > 0) {
        return entities[0]
      } else {
        return {}
      }
    },
  },

  async created() {
    const map = {
      spatial: 'place',
      temporal: 'time',
      agential: 'chname',
    }

    let id = this.id
    if (id === '兜町') {
      id = '日本橋兜町'
    }

    const uri =
      'https://nakamura196.github.io/repo/api/' + map[this.field] + '/' + id
    this.uri = uri

    const query = `
      PREFIX schema: <http://schema.org/>
      PREFIX type: <https://jpsearch.go.jp/term/type/>
      PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
      PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX owl: <http://www.w3.org/2002/07/owl#>
      PREFIX dct: <http://purl.org/dc/terms/>
      PREFIX hpdb: <https://w3id.org/hpdb/api/>
      PREFIX sh: <http://www.w3.org/ns/shacl#>
      SELECT DISTINCT * WHERE {
        ?s rdfs:label ?label . 
        filter (?s = <${uri}>)
        optional { ?s schema:description ?description } 
        optional { ?s schema:image ?image } 
      }
      LIMIT 1
    `

    let url = 'https://dydra.com/ut-digital-archives/shibusawa/sparql?query='

    url = url + encodeURIComponent(query) + '&output=json'

    const res = await axios.get(url)
    const results = res.data
    this.entities = results
  },

  methods: {
    getQuery(label, value) {
      const field = `dev_MAIN[refinementList][${label}][0]`
      const query = {
        // 'dev_MAIN[sortBy]': 'dev_MAIN', // _temporal_asc',
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
