<template>
  <nav class="menu bg-primary">
    <div class="container">
      <ul class="menu__list">
        <li class="menu__item">
          <router-link :to="{name: 'settings' }" class="menu__link">
            <span class="visually-hidden">Settings</span>
            <BaseIcon link="settings" fill="#fff" />
          </router-link>
        </li>
        <li class="menu__item">
          <router-link :to="{name: 'statistic' }" class="menu__link">
            <span class="visually-hidden">Statistic</span>
            <BaseIcon link="statistic" fill="#fff" />
          </router-link>
        </li>
        <li class="menu__item">
          <router-link :to="{name: 'days' }" class="menu__link">
            <span class="visually-hidden">Days</span>
            <BaseIcon link="calendar" fill="#fff" />
          </router-link>
        </li>
        <li class="menu__item">
          <router-link :to="{name: 'newDay' }" class="menu__link">
            <span class="visually-hidden">Add new day</span>
            <BaseIcon link="day" fill="#fff" />
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
  @import "@/scss/variables.scss";  

  .menu {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 8px 0;
  }

  .menu__list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: space-between;
  }

  .menu__link {
    display: block;
  }
</style>