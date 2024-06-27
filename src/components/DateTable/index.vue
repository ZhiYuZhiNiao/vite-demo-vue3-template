<template>
  <div class="date-table-container">
    <div class="action-box">
      <ElDatePicker
        v-model="selectDate"
        type="date"
        style="margin-right: 8px;"
        @change="getCurDateList"
      />
      <ElButton @click="prevWeek">上一周</ElButton>
      <ElButton @click="nextWeek">下一周</ElButton>
    </div>
    <div class="table-box">
      <div class="table-head-box">
        <div class="left-small-box"></div>
        <div class="right-box">
          <div
            v-for="dateItem of dateList"
            :key="dateItem.date.toDateString()"
            class="col-box"
          >
            <div>{{ `${dateItem.date.getMonth() + 1}-${dateItem.date.getDate()}` }}</div>
            <div>{{ `周${WeekMap[dateItem.date.getDay()]}` }}</div>
            <data v-if="dateItem.isToady" class="today">{{ dateItem.isToady ? '今' : '' }}</data>
          </div>
        </div>
      </div>
      <div class="table-body-box">
        <div class="left-small-box">
          <div
            v-for="(mealTime, index) of mealTimeList"
            :key="`mealTime--${index}`"
            class="row-box"
          >
            {{ mealTime }}
          </div>
        </div>
        <div class="right-box">
          <div
            v-for="(mealTime, index) of mealTimeList"
            :key="`mealTime--${index}`"
            class="row-box"
          >
            <div
              v-for="dateItem of dateList"
              :key="dateItem.date.toDateString()"
              class="col-box"
              @click="onColClick(mealTime, dateItem)"
            >
              列
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useDateHeader, WeekMap } from '@/hook/useDateHeader'
const { dateList, prevWeek, nextWeek, getCurDateList } = useDateHeader(new Date())
const selectDate = ref(new Date())
const mealTimeList = ref(['早餐', '午餐', '晚餐', '宵夜'])

/** @typedef {import('@/hook/useDateHeader').DateItem[number]} DateItem */

/**
 * @type {{
 *  (e: 'itemClick', mealTime: string, dateItem: DateItem): void
 * }}
*/
const emit = defineEmits(['itemClick'])

/**
 * @param {string} mealTime
 * @param {DateItem} dateItem
 */
const onColClick = (mealTime, dateItem) => {
  emit('itemClick', mealTime, dateItem)
}

</script>
<style lang="scss" scoped>
.date-table-container {
  --head-line-color: #fff;
  --body-line-color: #ccc;
  --head-col-height: 80px;
  --row-height: 150px;
  &>.action-box {
    padding-bottom: 30px;
  }
  &>.table-box {
    &>.table-head-box {
      display: flex;
      background-color: var(--el-color-primary);
      &>.left-small-box {
        border-right: 1px solid var(--head-line-color);
      }
      &>.right-box {
        display: flex;
        &>.col-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: var(--head-col-height);
          text-align: center;
          &:not(:last-child) {
            border-right: 1px solid var(--head-line-color);
          }
          color: #fff;
          position: relative;
          &>.today {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 70%;
            background-color: #fff;
            color: var(--el-color-primary);
            border-radius: 50%;
            width: 25px;
            height: 25px;
          }
        }
      }
    }
    &>.table-body-box {
      display: flex;
      background-color: #f9f9f9;
      &>.left-small-box {
        border-right: 1px solid var(--body-line-color);
        &>.row-box {
          writing-mode: vertical-lr;
          line-height: 45px;
          text-align: center;
          letter-spacing: 5px;
        }
      }
      &>.right-box {
        &>.row-box {
          display: flex;
          &>.col-box {
              &:not(:last-child) {
              border-right: 1px solid var(--body-line-color);
            }
          }
        }
      }
    }
    .left-small-box {
      width: 45px;
    }
    .right-box {
      flex: 1;
    }
    .row-box {
      min-height: var(--row-height);
      line-height: var(--row-height);
      &:nth-child(even) {
        background-color: #e5f2ff;
      }
    }
    .col-box {
      flex: 1;
      text-align: center
    }
  }

}
</style>
