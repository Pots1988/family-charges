<template>
  <section class="sect">
    <div class="container">
      <h1 class="h2 text-center">Настройки</h1>

      <p v-if="loadUserSettings">Loading...</p>
      <template v-else>
        <ul class="list-group mt-4" v-if="userSettings">
          <li class="list-group-item d-flex justify-content-between align-items-center">
            {{ userEmail }}

            <button type="button" class="btn btn-outline-info btn-edit">
              <BaseIcon link="edit" width="20" height="20" />
            </button>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Изменить пароль

            <button type="button" class="btn btn-outline-info btn-edit">
              <BaseIcon link="edit" width="20" height="20" />
            </button>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Места

            <router-link :to="{name: 'places' }" class="btn btn-outline-info btn-edit">
              <BaseIcon link="edit" width="20" height="20" />
            </router-link>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Категории
            <router-link :to="{name: 'categories' }" class="btn btn-outline-info btn-edit">
              <BaseIcon link="edit" width="20" height="20" />
            </router-link>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Расчетный период
            <router-link :to="{name: 'settingMonth' }" class="btn btn-outline-info btn-edit">
              <BaseIcon link="edit" width="20" height="20" />
            </router-link>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Имя: {{ userName }}
            <button type="button" class="btn btn-outline-info btn-edit" @click="showNamePopup">
              <BaseIcon link="edit" width="20" height="20" />
            </button>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Аватар: 
            <img :src="userImg" alt="Аватар пользователя" v-if="userImg">
            <button type="button" class="btn btn-outline-info btn-edit" @click="showNamePopup">
              <BaseIcon link="edit" width="20" height="20" />
            </button>
          </li>
        </ul>
      </template>
    </div>
    <BasePopup v-if="popup" @popup-close="popupClose">
      <form action="/" name="place" method="POST" @submit.prevent="updatePlace">
        <div class="form-group">
          <label for="changeName">Изменить имя</label>
          <input type="text" class="form-control mb-3" id="changeName"
            v-model.trim="newName"
          >
          <BaseBtn class="btn-success btn-block" @click="updatePlace" :load="load">Изменить</BaseBtn>
        </div>
      </form>
    </BasePopup>
  </section>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from "vuex";

  export default {
    name: `settings`,
    created() {
      this.loadUserSettings = true;
      this.userSettingsDB.onSnapshot(doc => {
        this.setUserSettings(doc.data());
        this.loadUserSettings = false;
      })
    },
    data() {
      return {
        popup: false,
        newName: ``,
        load: false,
        loadUserSettings: false
      }
    },
    computed: {
      ...mapGetters([`userSettings`, `userSettingsDB`]),
      userEmail() {
        return this.userSettings.email;
      },
      userName() {
        return this.userSettings.name ? this.userSettings.name : `не задано`;
      },
      userImg() {
        return this.userSettings.photoUrl
      }
    },
    methods: {
      ...mapActions([`changeName`]),
      ...mapMutations([`addMessage`, `setUserSettings`]),
      showNamePopup() {
        this.newName = this.userSettings.name;
        this.popup = true;
      },
      popupClose() {
        this.popup = false;
      },
      updatePlace() {
        if (this.newName.length) {
          this.load = true;
          this.changeName(this.newName)
            .then(() => {
              this.newName = ``;
              this.load = false;
              this.popup = false;
            })
            .catch(err => {
              this.load = false;
              console.warn(err);
              this.messages.push({
                text: `Ошибка смены имени`,
                type: `danger`,
                id: Date.now()
              });
            })
        }
      }
    }
  }
</script>