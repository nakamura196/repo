<template>
  <div>
    <v-sheet color="grey lighten-3">
      <v-container class="py-4">
        <h1>
          <template v-if="$i18n.locale === 'ja'">
            {{ $t(title) }}{{ $t('browse_by') }}
          </template>
          <template v-else>
            {{ $t('browse_by') }}
            {{ $t(title) }}
          </template>
        </h1>
      </v-container>
    </v-sheet>

    <v-container>
      <div class="my-5">
        <v-btn
          v-for="(obj, index) in settings"
          :key="index"
          class="my-1 mr-4"
          :to="
            localePath({
              name: 'entity-id',
              params: { id: index },
            })
          "
        >
          {{ obj.label }}
        </v-btn>
      </div>

      <template v-if="loadingFlag">
        <div class="text-center my-10">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
      </template>
      <template v-else>
        <grid :col="4" :list="people"></grid>
      </template>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import axios from 'axios'
// import grid from '~/components/Grid.vue'

@Component({})
export default class PageCategory extends Vue {
  @Watch('$route', { deep: true })
  watchTmp(): void {
    this.search()
  }

  settings: any = {
    agential: {
      type: 'type:Agent',
      query: 'fc-agentials',
      label: '人物',
    },
    place: {
      type: 'type:Place',
      query: 'fc-places',
      label: '場所',
    },
  }

  loadingFlag: boolean = true
  results: any[] = []
  label: string = ''
  people: any[] = []

  // state
  mounted() {
    this.search()
  }

  search() {
    this.loadingFlag = true
    const id: any = this.$route.params.id

    const setting = this.settings[id]

    const type = setting.type

    const query =
      `
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
        ?s rdfs:label ?label;  rdf:type ` +
      type +
      `
            optional { ?s schema:image ?image } 
      }
      ORDER BY ?s
      LIMIT 100
    `

    let url = 'https://dydra.com/ut-digital-archives/shibusawa/sparql?query='

    url = url + encodeURIComponent(query) + '&output=json'

    axios.get(url).then((response: any) => {
      const results = response.data

      const people = []
      for (let i = 0; i < results.length; i++) {
        const obj = results[i]

        if (obj.label.value) {
          continue
        }

        const tmp = id === "agentail" ? id : "spatial"

        const field = `dev_MAIN[refinementList][${tmp}][0]`

        const queryObj: any = {
          'dev_MAIN[sortBy]': 'dev_MAIN_temporal_asc',
        }
        queryObj[field] = obj.label

        const person: any = {
          label: obj.label,
          path: {
            name: 'search',
            query: queryObj,
          },
        }

        if (obj.image) {
          person.image = obj.image
        } else {
          person.image = process.env.BASE_URL + '/img/icons/no-image.png'
        }

        const url = process.env.BASE_URL + '/snorql/?describe=' + obj.s
        person.url = url

        people.push(person)
      }
      this.people = people
      this.loadingFlag = false
    })
  }

  get title() {
    return this.settings[this.$route.params.id].label
  }

  head() {
    return {
      title: this.$t('category') + ' : ' + this.$t(this.title),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('search_by_category'),
        },
      ],
    }
  }
}
</script>
