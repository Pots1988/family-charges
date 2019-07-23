<template>
  <section class="sect month">
    <div class="container">
      <h1 class="h2 text-center">Расчетный период</h1>
      <p class="text-center">
        Выберите дату с которой 
        <span class="font-weight-bold">начинать</span> 
        и которой 
        <span class="font-weight-bold">заканчивать</span> 
        расчетный месяц
      </p>
      <div class="month__date">
        <DatePicker
          :date="date"
          @date-change="dateChange"
        />
      </div>
      <BaseBtn 
        v-if="visibleBtn"
        :load="loadBtn"
        @click="setNewDate"
        class="btn-success btn-block mt-3"
      >Изменить дату</BaseBtn>
    </div>
  </section>
</template>

<script>
  import DatePicker from "@/components/DatePicker";
  import { mapGetters, mapMutations, mapActions } from "vuex";

  let userSettingListener;

  export default {
    name: `monthSettings`,
    components: {
      DatePicker
    },
    mounted() {
      userSettingListener = this.userSettingsDB.onSnapshot(doc => {
        this.setUserSettings(doc.data())
      })
    },
    beforeDestroy() {
      userSettingListener();
    },
    data() {
      return {
        visibleBtn: false,
        loadBtn: false,
        temporaryDate: null
      }
    },
    computed: {
      ...mapGetters([`userSettings`, `userSettingsDB`]),
      date() {
        const newDate = new Date();

        return new Date(newDate.getFullYear(), newDate.getMonth(), this.userSettings.monthStartFrom);
      }
    },
    methods: {
      ...mapMutations([`setUserSettings`, `addMessage`]),
      ...mapActions([`changeMonth`]),
      dateChange(e) {
        const newDate = new Date(e).getDate();

        if ( newDate != this.userSettings.monthStartFrom) {
          this.visibleBtn = true;
          this.temporaryDate = newDate;
        } else {
          this.visibleBtn = false;
          this.temporaryDate = null;
        }
      },
      setNewDate() {
        this.loadBtn = true;
        this.changeMonth(this.temporaryDate)
          .then(() => {
            this.loadBtn = false;
            this.visibleBtn = false;
            this.temporaryDate = null;

            this.addMessage({
              text: `Дата изменена`,
              type: `success`,
              id: Date.now()
            });
          })
          .catch(err => {
            this.loadBtn = false;

            console.warn(err);
            this.addMessage({
              text: `Ошибка смены даты`,
              type: `error`,
              id: Date.now()
            });
          });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .month__date {
    position: relative;
  }
</style>