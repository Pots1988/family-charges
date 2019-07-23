<template>
  <div class="form-group mb-0 datepicker">
    <label for="date" class="datepicker__text" v-if="labelVisible">Дата</label>
    <Datepicker 
      :monday-first="true"
      :language="ru"
      v-model="compDate"
      :bootstrap-styling="true"
      id="date"
      class="datepicker__el"
      :minimumView="monthOnly ? 'month' : 'day'"
      :initialView="monthOnly ? 'month' : 'day'"
    >
    </Datepicker>
  </div>
</template>

<script>
  import {ru} from "vuejs-datepicker/dist/locale";
  import Datepicker from "vuejs-datepicker";
  
  export default {
    props: {
      labelVisible: {
        type: Boolean,
        default: false
      },
      date: {
        type: Date,
        default() {
          return new Date()
        }
      },
      monthOnly: {
        type: Boolean,
        default: false
      }
    },
    components: {
      Datepicker
    },
    data() {
      return {
        ru: ru
      }
    },
    computed: {
      compDate: {
        get() {
          return this.date
        },
        set(val) {
          this.$emit(`date-change`, val);
        }
      },

    }
  }
</script>

<style lang="scss">
  .datepicker {
    align-items: center;
    display: flex;
    // position: relative;
  }

  .datepicker__text {
    margin: 0 10px 0 0;
  }

  .datepicker__el {
    flex-grow: 1;
  }

  .vdp-datepicker { 
    position: static !important;

    .form-control {
      width: 100%;
      background: none;
    }
  }

  .vdp-datepicker__calendar {
    width: auto !important;
    left: 0;
    right: 0;
    top: 100%;
    margin-top: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3)
  }

  .vdp-datepicker__calendar .cell.selected {
    background: #007bff !important;
    color: #fff !important;
    border-color: #007bff !important;
  }
</style>