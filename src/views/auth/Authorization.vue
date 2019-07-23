<template>
  <section class="sect">
    <div class="container">
      <h1 class="h2 text-center">Вход</h1>
      <p class="text-center font-weight-bold">
        Нет аккаунта?
        <router-link :to="{ name: 'registration' }">Создайте его</router-link>
      </p>

      <form action="/" method="POST" name="authorization" @submit.prevent="checkForm">
        <div class="form-group">
          <label for="email">Почта:</label>
          <input type="email" name="email" v-model="email" class="form-control" id="email" placeholder="Введите почту" required>
        </div>
        <div class="form-group">
          <label for="password">Пароль:</label>
          <input type="password" name="password" v-model="password" class="form-control" id="password" placeholder="Введите пароль" required>
        </div>
        <button type="submit" class="btn btn-primary btn-block mt-4 mb-3">Войти</button>
      </form>

      <p class="text-center">
        <small>Забыли пароль?
          <router-link :to="{ name: 'forgot' }">Восстановите его</router-link>
        </small>
      </p>
    </div>
  </section>
</template>

<script>
  import { mapActions } from "vuex";

  export default {
    data() {
      return {
        email: null,
        password: null
      }
    },
    methods: {
      ...mapActions(["signIn"]),
      checkForm() {
        const user = {
          email: this.email,
          password: this.password
        };

        this.signIn(user)
          .then(() => {
            this.$router.push({ name: "dashboard"})
          })
          .catch(err => console.log(err));
      }
    }
  }
</script>
