<template>
  <section class="sect">
    <div class="container">
      <h1 class="h2 text-center">Восстановление пароля</h1>
      <p class="text-center font-weight-bold">
        Вспомнили пароль?
        <router-link :to="{ name: 'authorization' }">Войдите</router-link>
      </p>
      <form action="/" method="POST" name="authorization" @submit.prevent="checkForm">
        <div class="form-group">
          <label for="email">Почта:</label>
          <input type="email" name="email" v-model="email" class="form-control" id="email" placeholder="Введите почту" required>
        </div>
        <button type="submit" class="btn btn-primary btn-block mt-4 mb-3">Восстановить</button>
      </form>
      <BasePopup v-if="popupFeedback" @popup-close="closeFeedbackPopup">
        На вашу почту <span class="auth__link">{{ email }}</span> отправлено письмо с восстановлением пароля!
      </BasePopup>
    </div>
  </section>
</template>

<script>
  import { mapActions } from "vuex";

  export default {
    data() {
      return {
        email: null,
        popupFeedback: false
      }
    },
    methods: {
      ...mapActions(["resetPassword"]),
      checkForm() {
        const user = {
          email: this.email
        };

        this.resetPassword(user)
          .then(() => this.popupFeedback = true)
          .catch(err => console.log(err));
      },
      closeFeedbackPopup() {
        this.popupFeedback = false;
        this.$router.push({ name: `authorization` });
      }
    }
  }
</script>
