<template>
  <div>
    <v-select
      v-model="precision"
      :items="precisionList"
      label="Precision"
      item-text="name"
      item-value="key"
    />
    <v-text-field
      label="DateTime"
      v-model="oneLineDate"
    />
    <div>
      <v-row justify="center">
        <v-col
          cols="12"
          sm="12"
          md="8"
        >
          <v-row>
            <v-col class="d-flex justify-center">
              <v-date-picker
                ref="datePicker"
                v-model="date"
                :type="['year', 'month'].indexOf(precision) !== -1 ? 'month' : 'date'"
                :allowed-dates="allowedDates"
                min="1900-01-01"
                :max="now"
                elevation="15"
              />
            </v-col>
            <v-col
              v-if="['exact', 'minute', 'hour'].indexOf(precision) !== -1"
              class="d-flex justify-center"
            >
              <v-time-picker
                ref="timePicker"
                v-model="time"
                elevation="15"
                :allowed-minutes="precision === 'hour' ? [0] : undefined"
                :use-seconds="precision === 'exact'"
                format="24hr"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoricalDatePicker',
  data () {
    const now = new Date().toISOString()
    return {
      now,
      precision: 'exact',
      precisionList: [
        //{ name: 'Interval', key: 'interval' },
        { name: 'Year', key: 'year' },
        { name: 'Month', key: 'month' },
        { name: 'Day', key: 'day' },
        { name: 'Hour', key: 'hour' },
        { name: 'Minute', key: 'minute' },
        { name: 'Exact', key: 'exact' }
      ],
      date: now.substr(0, 10),
      time: now.substr(11, 8),
      oneLineDate: ''
    }
  },
  watch: {
    oneLineDate (input) {
      // console.log('watch oneLineDate', input)
      if (this.date + ' ' + this.time === input) {
        return
      }
      if (Number.isNaN((new Date(input)).valueOf())) {
        return
      }
      const compos = input.split(' ')
      this.date = compos[0]
      this.time = compos[1]
    },
    date () {
      this.updateManualDate()
    },
    time () {
      this.updateManualDate()
    },
    precision () {
      this.initDateTime()
    }
  },
  mounted () {
    this.initDateTime()
    this.$nextTick(() => {
      this.$refs.datePicker.activePicker = 'YEAR'
    })
  },
  methods: {
    initDateTime () {
      const dayDate = this.now.substr(0, 10)
      switch (this.precision) {
        case 'exact':
          this.oneLineDate = dayDate + ' ' + this.now.substr(11, 8)
          break
        case 'minute':
          this.oneLineDate = dayDate + ' ' + this.now.substr(11, 5)
          break
        case 'hour':
          this.oneLineDate = dayDate + ' ' + this.now.substr(11, 2) + ':00'
          break
        case 'day':
          this.oneLineDate = this.now.substr(0, 10)
          break
        case 'year':
          // visitors of the futur, yes this code will break in 10 000 AD
          // https://en.wikipedia.org/wiki/Anno_Domini
          this.oneLineDate = this.now.substr(0, 4)
          this.$refs.datePicker.activePicker = 'YEAR'
          break
        case 'month':
          this.oneLineDate = this.now.substr(0, 7)
          break
      }
      console.log(this.oneLineDate)
    },
    updateManualDate () {
      this.oneLineDate = this.date + ((this.time ?? '') !== '' ? (' ' + this.time) : '')
    },
    allowedDates (value) {
      return !(this.precision === 'year' && !value.includes('-01'))
    }
  }
}
</script>
