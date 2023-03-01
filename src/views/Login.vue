<template>
  <div class="container mt-3">
    <div class="login w-75 mx-auto pt-5">
      <div class="main-block main-bg" style="flex-direction: column">
        <div class="row justify-content-center">
          <h1 class="h3 mb-3 text-center">請先登入</h1>
          <div class="my-5 row justify-content-center w-100">
            <Form ref="form" @submit="login" v-slot="{ errors }">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  class="form-control"
                  :class="{ 'is-invalid': errors['email'] }"
                  placeholder="請輸入 Email"
                  rules="required|email"
                  v-model="user.username"
                ></Field>

                <ErrorMessage
                  name="email"
                  class="invalid-feedback"
                ></ErrorMessage>
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">密碼</label>

                <Field
                  id="password"
                  name="密碼"
                  type="password"
                  class="form-control"
                  placeholder="請輸入密碼"
                  :class="{ 'is-invalid': errors['密碼'] }"
                  rules="required"
                  v-model="user.password"
                ></Field>
                <error-message
                  name="密碼"
                  class="invalid-feedback"
                ></error-message>
              </div>

              <div class="text-end">
                <button
                  type="submit"
                  class="btn btn-lg btn-primary w-50 mt-3 d-block mx-auto"
                >
                  登入
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      url: import.meta.env.VITE_PATH,
      api_path: "rita009",
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      const that = this;
      axios
        .post(`${this.url}admin/signin`, this.user)
        .then(function (res) {
          const { token, expired } = res.data;

          // 到ndm複製（https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie）
          document.cookie = `rita009=${token}; expires=${expired}`;
          // 登入頁面不需要在讀取 Cookie 拿到 token 後賦予到 headers 上，因為登入頁面不需要做驗證行為，只需將登入成功時取得的 token 寫入 cookie 即可。
          that.$router.push({
            name: "dashboard",
          });
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
};
</script>
