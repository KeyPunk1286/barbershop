<template>
  <div class="calendar__parent">
    <div class="calendar__header">
      <button @click="prevMonth" class="calendar__prevMonth">
        <font-awesome-icon icon="circle-chevron-left" size="xl" style="color: #494a4b" />
      </button>
      <span class="calendar__month"
        >{{ currentYear }} - {{ $t(`calendar.${monthNames[currentMonth - 1]}`) }}</span
      >
      <button @click="nextMonth" class="calendar__nextMonth">
        <font-awesome-icon
          :icon="['fas', 'circle-chevron-right']"
          size="xl"
          style="color: #494a4b"
        />
      </button>
    </div>

    <div class="calendar__body">
      <div class="calendar__day-week">
        <div v-for="day in daysOfWeek" :key="day" class="calendar__day">
          {{ $t(`calendar.${day}`) }}
        </div>
      </div>
      <div class="calendar__dates">
        <div
          v-for="date in calendarDates"
          :key="date"
          @click="selectDate(date)"
          class="calendar__date"
        >
          {{ date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//==== impor
import { ref, computed } from 'vue'
//==== emits
const emit = defineEmits(['onSelectedDate'])
//==== data
const currentDate = ref(new Date())
const currentYear = ref(currentDate.value.getFullYear())
const currentMonth = ref(currentDate.value.getMonth() + 1)

const monthNames = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
]
//==== computed
const daysOfWeek = computed(() => ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'])

const calendarDates = computed(() => {
  const firstDayOfMonth = new Date(currentYear.value, currentMonth.value - 1, 1).getDay()
  const lastDayOfMonth = new Date(currentYear.value, currentMonth.value, 0).getDate()

  const dates = []
  for (let i = 1; i <= lastDayOfMonth; i++) {
    dates.push({
      date: i,
      dayOfWeek: daysOfWeek.value[(firstDayOfMonth + i - 1) % 7]
    })
  }

  const paddedDates = [...Array(firstDayOfMonth).fill(null), ...dates]

  return paddedDates.map((date) => (date ? `${date.date}` : null))
})
//==== methods
const prevMonth = () => {
  currentMonth.value -= 1
  if (currentMonth.value < 1) {
    currentMonth.value = 12
    currentYear.value -= 1
  }
}

const nextMonth = () => {
  currentMonth.value += 1
  if (currentMonth.value > 12) {
    currentMonth.value = 1
    currentYear.value += 1
  }
}

function selectDate(numDate) {
  const selectedYear = currentYear.value
  const selectedMonth = currentMonth.value
  const selectedFullDate = `${numDate}. ${selectedMonth}. ${selectedYear}`
  emit('onSelectedDate', selectedFullDate)
}
</script>

<style lang="scss" scoped>
.calendar {
  &__parent {
    max-width: 400px;
    border: 1px rgba(0, 0, 0, 0.567) solid;
    border-radius: 10px;
    overflow: hidden;
    // padding: 10px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f0f0f0;
    padding: 10px 40px;
  }

  // &__prevMonth {
  // }

  // &__month {

  // }

  // &__nextMonth {
  // }

  // &__body {
  // }

  &__day-week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  &__day {
    text-align: center;
    padding: 5px;
  }

  &__dates {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  &__date {
    text-align: center;
    padding: 5px;
    border: 1px solid #ddd;
    cursor: pointer;
    transition: background-color 0.4s;
    @media (hover: hover) {
      &:hover {
        background-color: #c2c2c2;
      }
    }
  }
  &__date:active {
    background-color: #c2c2c2;
  }
}
</style>
