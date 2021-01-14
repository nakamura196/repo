<template>
  <client-only>
    <ais-instant-search
      :routing="routing"
      :search-client="searchClient"
      index-name="dev_MAIN"
    >
      <v-container class="my-5">
        <v-row>
          <v-col col="12" sm="8" order-sm="12">
            <client-only>
              <ais-powered-by class="my-2" />
            </client-only>

            <ais-search-box :placeholder="$t('add_a_search_term')" />

            <v-sheet class="pa-4 pt-10 my-4" color="grey lighten-3">
              <v-row dense>
                <v-col cols="12" :sm="6">
                  <ais-stats>
                    <p slot-scope="{ nbHits }" class="my-0">
                      {{ $t('search_result') }}: {{ nbHits.toLocaleString() }}
                      {{ $t('hits') }}
                    </p>
                  </ais-stats>
                </v-col>
                <v-col cols="12" :sm="3">
                  <ais-hits-per-page
                    :items="[
                      { text: '24', value: 24, default: true },
                      { text: '60', value: 60 },
                      { text: '120', value: 120 },
                      { text: '512', value: 512 },
                    ]"
                  >
                    <v-select
                      v-model="perPage"
                      slot-scope="{ items, refine }"
                      dense
                      :items="items"
                      :label="$t('items_per_page')"
                      @change="refine(perPage)"
                    >
                      {{ getPageValue(items) }}
                    </v-select>
                  </ais-hits-per-page>
                </v-col>
                <v-col cols="12" :sm="3">
                  <ais-sort-by
                    :items="[
                      { value: 'dev_MAIN', label: this.$t('relevance') },
                      {
                        value: 'dev_MAIN_temporal_asc',
                        label: this.$t('temporal') + ' ' + this.$t('asc'),
                      },
                    ]"
                  >
                    <v-select
                      v-model="sort"
                      slot-scope="{ items, currentRefinement, refine }"
                      dense
                      :items="getSortItems(items)"
                      :label="$t('sort_by')"
                      @change="refine(sort)"
                    >
                      {{ getSortValue(currentRefinement) }}
                    </v-select>
                  </ais-sort-by>
                </v-col>
              </v-row>
            </v-sheet>

            <ais-pagination :padding="2" class="my-4" />

            <ais-hits>
              <v-row slot-scope="{ items }">
                <v-col v-for="item in items" :key="item.objectID" cols="12">
                  <v-card flat outlined>
                    <div class="pa-4">
                      <nuxt-link
                        :to="
                          localePath({
                            name: 'item-id',
                            params: { id: item.objectID },
                          })
                        "
                      >
                        <h3>{{ item.label }}</h3>
                      </nuxt-link>
                      <div class="my-2">
                        <span class="mr-4">
                          <b>{{ $t('ID') }}:</b>
                          {{ item.objectID }}
                        </span>
                        <span
                          v-if="item.agential && item.agential.length > 0"
                          class="mr-4"
                        >
                          <b>{{ $t('agential') }}:</b>
                          {{ item.agential.join(', ') }}
                        </span>
                        <span
                          v-if="item.spatial && item.spatial.length > 0"
                          class="mr-4"
                        >
                          <b>{{ $t('spatial') }}:</b>
                          {{ item.spatial.join(', ') }}
                        </span>
                        <span
                          ><b>{{ $t('temporal') }}:</b>
                          {{ item.temporal }}</span
                        >
                      </div>
                      <p v-if="item._snippetResult.description" class="mt-4">
                        <ais-highlight attribute="description" :hit="item" />
                      </p>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </ais-hits>

            <ais-pagination :padding="2" class="my-4" />
          </v-col>

          <v-col col="12" sm="4" order-sm="1">
            <v-row>
              <v-col col="12" sm="6">
                <h2>{{ $t('filter') }}</h2>
              </v-col>
              <v-col col="12" sm="6" class="text-right">
                <ais-clear-refinements>
                  <span slot="resetLabel">{{ $t('reset') }}</span>
                </ais-clear-refinements>
              </v-col>
            </v-row>

            <v-card
              v-for="(tag, key) in ['agential', 'spatial', 'temporal']"
              :key="key"
              flat
              outlined
              class="mt-4"
            >
              <v-card-title class="headline grey lighten-2">
                {{ $t(tag) }}
              </v-card-title>
              <v-card-text>
                <ais-refinement-list
                  class="mt-4"
                  show-more
                  operator="and"
                  :show-more-limit="100"
                  :limit="20"
                  :attribute="tag"
                  :sort-by="['isRefined', tag == 'temporal' ? 'name:asc' : '']"
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </ais-instant-search>
  </client-only>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import * as algoliasearch from 'algoliasearch'
import { simple } from 'instantsearch.js/es/lib/stateMappings'
import 'instantsearch.css/themes/algolia-min.css'
import config from '@/plugins/algolia.config.js'

@Component({})
export default class Search extends Vue {
  searchClient: any = algoliasearch(config.appId, config.apiKey)

  routing: any = {
    stateMapping: simple(),
  }

  sort: string = ''
  perPage: string = ''

  sortItems: any = [
    { value: 'dev_MAIN', label: this.$t('relevance') },
    {
      value: 'dev_MAIN_temporal_asc',
      label: this.$t('temporal') + ' ' + this.$t('asc'),
    },
  ]

  head() {
    return {
      title: this.$t('search'),
    }
  }

  getSortItems(items: any) {
    const array = []
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      array.push({
        text: item.label,
        value: item.value,
      })
    }
    return array
  }

  getSortValue(value: any) {
    this.sort = value
  }

  getPageValue(items: any) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item.isRefined) {
        this.perPage = item.value
        break
      }
    }
  }
}
</script>
