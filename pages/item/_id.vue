<template>
  <div>
    <v-container class="py-10">
      <p class="mb-5 text-center">
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn
              v-if="item.prev"
              class="ma-1"
              :to="
                localePath({
                  name: 'item-id',
                  params: { id: item.prev },
                })
              "
              v-on="on"
              ><v-icon>mdi-chevron-left</v-icon></v-btn
            >
          </template>
          <span>{{ $t('previous') }}</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn
              v-if="item.next"
              class="ma-1"
              :to="
                localePath({
                  name: 'item-id',
                  params: { id: item.next },
                })
              "
              v-on="on"
              ><v-icon>mdi-chevron-right</v-icon></v-btn
            >
          </template>
          <span>{{ $t('next') }}</span>
        </v-tooltip>
      </p>

      <dl class="row mb-5">
        <dt class="col-sm-3 text-muted pb-0">
          <b>{{ $t('label') }}</b>
        </dt>
        <dd class="col-sm-9">
          {{ item.label }}
        </dd>
      </dl>
      <dl class="row mb-5">
        <dt class="col-sm-3 text-muted pb-0"><b>URL</b></dt>
        <dd class="col-sm-9" style="overflow-wrap: break-word">
          <a :href="url">{{ url }}</a>
        </dd>
      </dl>
      <template v-for="(tag, key) in ['agential', 'spatial', 'temporal']">
        <dl v-if="item[tag].length > 0" :key="key" class="row mb-5">
          <dt class="col-sm-3 text-muted pb-0">
            <b>{{ $t(tag) }}</b>
          </dt>
          <dd class="col-sm-9">
            <template v-for="(value, key2) in getValues(item[tag])">
              <nuxt-link
                :key="key2"
                class="mr-4"
                :to="
                  localePath({
                    name: 'search',
                    query: getQuery(tag, value),
                  })
                "
              >
                {{ value }}
              </nuxt-link>
            </template>
          </dd>
        </dl>
      </template>
      <dl class="row mb-5">
        <dt class="col-sm-3 text-muted pb-0">
          <b>{{ $t('text') }}</b>
        </dt>
        <dd class="col-sm-9">
          <span v-html="item.xml"> </span>
          <p>
            <b class="mr-2">{{ $t('legend') }}:</b>
            <persName class="mr-2">{{ $t('agential') }}</persName>
            <placeName class="mr-2">{{ $t('spatial') }}</placeName>
            <date class="mr-2">{{ $t('date') }}</date>
            <time>{{ $t('temporal') }}</time>
          </p>
        </dd>
      </dl>
    </v-container>
  </div>
</template>

<script>
import * as algoliasearch from 'algoliasearch'
import config from '@/plugins/algolia.config.js'

export default {
  async asyncData({ payload, app }) {
    if (payload) {
      return { item: payload }
    } else {
      const id = app.context.params.id
      const client = algoliasearch(config.appId, config.apiKey)
      const index = client.initIndex('dev_MAIN')
      const item = await index.getObject(id)
      return { item }
    }
  },

  data() {
    return {
      baseUrl: process.env.BASE_URL,
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
    title() {
      return this.item.label
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
