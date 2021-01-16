<template>
  <div>
    <v-container class="my-5">
      <h2 class="mb-5">{{ $t('calendar') }}</h2>

      <v-card flat outlined class="my-5">
        <GChart type="ColumnChart" :data="chartData" :options="chartOptions" />
      </v-card>

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
                    count(key, value) > 0 ? 'background-color: #FFF59D;' : ''
                  "
                >
                  <template v-if="count(key, value) > 0">
                    <nuxt-link
                      :to="
                        localePath({
                          name: 'calendar-type-year-month-day',
                          params: {
                            type: 'month',
                            year: key,
                            month: value,
                            day: 1,
                          },
                        })
                      "
                    >
                      {{ getMonth(value) }}
                    </nuxt-link>
                    <br />
                    {{ count(key, value) }}
                  </template>
                  <template v-else> {{ getMonth(value) }} </template>
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
import axios from 'axios'
import { GChart } from 'vue-google-charts'

export default {
  components: {
    GChart,
  },
  async asyncData({ payload }) {
    if (payload) {
      return { item: payload }
    } else {
      const results = await axios.get(process.env.BASE_URL + '/data/years.json')
      return { items: results.data }
    }
  },
  data: () => ({
    chartOptions: {
      chart: {
        title: 'Company Performance',
        subtitle: 'Sales, Expenses, and Profit: 2014-2017',
      },
    },
  }),
  computed: {
    years() {
      const years = {}
      const items = this.items
      let minYear = 2000
      let maxYear = 0
      for (const year in items) {
        if (year > maxYear) {
          maxYear = year
        }
        if (year < minYear) {
          minYear = year
        }
      }
      for (let i = minYear; i < maxYear; i++) {
        years[i] = {}
      }
      return years
    },
    chartData() {
      const years = [['Year', 'Appearances']]
      const items = this.items

      for (const year in this.years) {
        let freq = 0
        if (items[year]) {
          for (const month in items[year]) {
            freq += items[year][month]
          }
        }

        years.push([year + '', freq])
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
    count(year, month) {
      const items = this.items
      year = Number(year)
      month = Number(month)
      if (!items[year]) {
        return 0
      }
      if (items[year][month]) {
        return items[year][month]
      } else {
        return 0
      }
    },
    transMonth(month) {
      const monthEnglishList = [
        'Jan.',
        'Feb.',
        'Mar.',
        'Apr.',
        'May',
        'Jun.',
        'Jul.',
        'Aug.',
        'Sep.',
        'Oct.',
        'Nov.',
        'Dec.',
      ]
      return monthEnglishList[month - 1]
    },
    getMonth(month) {
      if (this.$i18n.locale === 'ja') {
        return month + '月'
      } else {
        return this.transMonth(month)
      }
    },
  },
}
</script>
