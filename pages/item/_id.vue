<template>
  <div>
    <v-container class="py-10">
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
          {{ item.description }}
        </dd>
      </dl>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import * as algoliasearch from 'algoliasearch'
import config from '@/plugins/algolia.config.js'

@Component({})
export default class Item extends Vue {
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
  }

  get title(): string {
    return this.item.label
  }

  get url(): string {
    return this.baseUrl + '/item/' + this.item.objectID
  }

  baseUrl: string = process.env.BASE_URL || ''

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
  }

  getQuery(label, value): any {
    const field = `dev_MAIN[refinementList][${label}][0]`
    const query = {
      'dev_MAIN[sortBy]': 'dev_MAIN_temporal_asc',
    }
    query[field] = value
    return query
  }

  getValues(data): string[] {
    if (!data) {
      return []
    }
    return Array.isArray(data) ? data : [data]
  }
}
</script>
