<template>
  <div>
    <v-row v-show="mainFlag" class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat color="white">
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small>mdi-chevron-right</v-icon>
            </v-btn>
            <v-toolbar-title class="ml-4">
              {{ title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template #activator="{ on, attrs }">
                <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'custom-daily'">
                  <v-list-item-title>Year</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="value"
            color="primary"
            :events="events"
            :type="type"
            @click:event="showEvent"
            @change="updateRange"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-toolbar-title>{{ selectedEvent.name }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title>{{ selectedEvent.id }}</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <span>{{ selectedEvent.description }}</span>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  text
                  color="secondary"
                  :to="
                    localePath({
                      name: 'item-id',
                      params: { id: selectedEvent.id },
                    })
                  "
                >
                  詳細
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// NUM=値 LEN=桁数
import * as algoliasearch from 'algoliasearch'
import config from '@/plugins/algolia.config.js'

function zfill(NUM, LEN) {
  NUM = Number(NUM)
  return (Array(LEN).join('0') + NUM).slice(-LEN)
}

export default {
  async asyncData({ payload, app }) {
    if (payload) {
      return { item: payload }
    } else {
      // 初期値
      let value = '1914-01-02'
      let type = 'custom-daily'

      if (app.context.params.year) {
        const params = app.context.params
        value =
          params.year +
          '-' +
          zfill(params.month, 2) +
          '-' +
          zfill(params.day, 2)
        if (params.type !== 'year') {
          type = params.type
        }
      }

      const es = value.split('-')

      const client = algoliasearch(config.appId, config.apiKey)
      const index = client.initIndex('dev_MAIN')
      const query = es[0] + '-' + es[1]
      const results = await index.search(query, {
        hitsPerPage: 200,
      })

      const events = []
      for (let i = 0; i < results.hits.length; i++) {
        const obj = results.hits[i]
        const date = new Date(`${obj.temporal}T00:00:00`)
        const event = {
          name: obj.label,
          start: date,
          end: date,
          color: 'primary',
          id: obj.objectID,
          description: obj.description,
        }
        events.push(event)
      }

      return { value, type, events, title: query }
    }
  },
  data: () => ({
    baseUrl: process.env.BASE_URL,
    initFlag: true,
    mainFlag: true,

    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      'custom-daily': 'Year',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
  }),

  head() {
    const title = this.$t('calendar') + ' ' + this.title
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
    url() {
      return this.baseUrl + this.$route.path
    },
  },
  methods: {
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => (this.selectedOpen = true), 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange() {
      let type = this.type
      if (this.type === 'custom-daily') {
        type = 'year'
      }
      if (!this.initFlag) {
        this.mainFlag = false

        if (type === 'year') {
          this.$router.push(
            this.localePath({
              name: 'calendar',
            })
          )
        } else {
          const es = this.value.split('-')
          this.$router.replace(
            this.localePath({
              name: 'calendar-type-year-month-day',
              params: {
                type,
                year: es[0],
                month: Number(es[1]),
                day: Number(es[2]),
              },
            })
          )
        }
      }
      this.initFlag = false
    },
  },
}
</script>
