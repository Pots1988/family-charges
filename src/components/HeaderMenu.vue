<template>
  <ul class="header-menu">
    <li v-if="!user">
      <router-link :to="{name: 'authorization' }" class="header-menu__link">
        <span class="visually-hidden">Authorization</span>
        <BaseIcon link="login" fill="#fff" />
      </router-link>
    </li>
    <template v-else>
      <li>
        <template v-if="userImg || userName">
          <div class="header-menu__img" v-if="userImg">
            <img :src="userImg" alt="">
          </div>
          {{ userName }}
        </template>
        <BaseLoader v-else :size="20" class="text-light" />
      </li>
      <li>
        <button type="button" class="header-menu__link" @click="exit">
          <span class="visually-hidden">Logout</span>
          <BaseIcon link="logout" fill="#fff" />
        </button>
      </li>
    </template>
  </ul>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from "vuex";

  export default {
    created() {
      this.createListen();
    },
    computed: {
      ...mapGetters([`user`, `userSettingsDB`, `userSettings`]),
      userName() {
        if (!this.userSettings) return "";
        return this.userSettings.name ? this.userSettings.name : this.userSettings.email;
      },
      userImg() {
        return this.userSettings ? this.userSettings.photoUrl : null;
      }
    },
    methods: {
      ...mapActions([`logoutUser`]),
      ...mapMutations([`setUserSettings`]),
      exit() {
        this.logoutUser()
          .then(() => this.$router.push({ name: `home` }))
      },
      createListen() {
        if (this.user) {
          this.userSettingsDB.onSnapshot(doc => this.setUserSettings(doc.data()));
        }
      }
    },
    watch: {
      user() {
        this.createListen();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header-menu {
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
    color: #fff;

    li {
      margin: 0 10px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .header-menu__link {
    text-decoration: none;
    color: inherit;
    padding: 0;
    border: 0;
    border-radius: 0;
    background: none;
  }

  .header-menu__img {
    
  }
</style>