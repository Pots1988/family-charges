<template>
  <section class="sect">
    <div class="container">
      <h1 class="h2 text-center">Регистрация</h1>
      <p class="text-center font-weight-bold">
        Есть аккаунт?
        <router-link :to="{ name: 'authorization' }">Войдите</router-link>
      </p>

      <form action="/" method="POST" name="registration" @submit.prevent="checkForm">
        <div class="form-group">
          <label for="email">Почта:</label>
          <input type="email" name="email" v-model="email" class="form-control" id="email" placeholder="Введите почту" required>
        </div>
        <div class="form-group">
          <label for="password">Пароль:</label>
          <input type="password" name="password" v-model="password" class="form-control" id="password" placeholder="Введите пароль" required>
        </div>
        <div class="form-group">
          <label for="password-confirm">Подтвердите пароль:</label>
          <input type="password" name="password-confirm" v-model="passwordConfirm" class="form-control" id="password-confirm" placeholder="Подтвердите пароль" required>
        </div>
        <button type="submit" class="btn btn-primary btn-block mt-4 mb-3">Зарегистрироваться</button>
      </form>
    </div>
  </section>
</template>

<script>
  import { mapActions } from "vuex";

  export default {
    data() {
      return {
        email: null,
        password: null,
        passwordConfirm: null
      }
    },
    methods: {
      ...mapActions(["signUp", "addUser"]),
      checkForm() {
        const user = {
          email: this.email,
          password: this.password
        };
        
        this.signUp(user)
          .then(response => {
            this.addUser(response)
              .then(response => {
                this.$router.push({ name: "dashboard"})
              })
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err));
      }
    }
  }
</script>
