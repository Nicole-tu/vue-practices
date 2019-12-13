<template>
  <div class="login-page">
    <div class="login-box login-box-position">
      <div class="login-box-title">
        <h1>My Diary</h1>
      </div>
      <div class="login-box-section">
        <div
          class="form-group"
          :class="{ 'has-error': error.userName.hasError }"
        >
          <div class="input-icon">
            <input
              id="userName"
              v-model="form.userName"
              type="text"
              class="login-form-control"
              required
              placeholder="username"
              @click="onClickInput('userName')"
            />
            <font-awesome-icon icon="user" size="lg" />
            <div v-show="error.userName.hasError" class="tip">
              {{ error.userName.msg }}
            </div>
          </div>
        </div>
        <div
          class="form-group"
          :class="{ 'has-error': error.password.hasError }"
        >
          <div class="input-icon">
            <input
              id="password"
              v-model="form.password"
              type="password"
              class="login-form-control"
              required
              placeholder="password"
              @click="onClickInput('password')"
              @keyup.13="onLogin"
            />
            <font-awesome-icon icon="key" size="lg" />
            <div v-show="error.password.hasError" class="tip">
              {{ error.password.msg }}
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="row">
        <a href="javascript:void(0);" class="text-primary" @click="goReset"
          >Create a new account</a
        >
      </div> -->
      <br />
      <div class="row">
        <a href="javascript:void(0);" class="btn btn-secondary" @click="onLogin"
          >Open</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        userName: "",
        password: ""
      },
      error: {
        userName: { hasError: false, msg: "Enter your username" },
        password: { hasError: false, msg: "Try to enter 'password'" }
      }
    };
  },
  created() {},
  methods: {
    onLogin(evt) {
      evt.preventDefault();
      if (this.form.userName != "Nicole") {
        this.error.userName.hasError = true;
        return;
      }
      if (this.form.password != "password") {
        this.error.password.hasError = true;
        return;
      }
      this.$store.dispatch("setUserName", this.form.userName);
      this.$router.push({ name: "home" });
    },
    goReset() {
      this.$router.push({ name: "forget" });
    },
    onClickInput(type) {
      this.error[type]["hasError"] = false;
    }
  }
};
</script>
