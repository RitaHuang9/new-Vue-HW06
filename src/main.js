import { createApp } from 'vue';
import { createPinia } from 'pinia';
import axios from 'axios';
import VueAxios from 'vue-axios';
//匯入 vee-validate 主套件
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate';
//匯入全部規則：
import AllRules from '@vee-validate/rules';
//匯入多國語系的功能
import { localize, setLocale } from '@vee-validate/i18n';
//匯入繁體中文語系檔案
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

//匯入全部規則
Object.keys(AllRules).forEach((rule) => {
    defineRule(rule, AllRules[rule]);
});
//設定 vee-validate 全域規則
configure({
    generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
    validateOnInput: true, // 當輸入任何內容直接進行驗證
});

//設定預設語系
setLocale("zh_TW");
//定義驗證規則
// defineRule("required", required);
// defineRule("email", email);
// defineRule("min", min);

// const { defineRule, Form, Field, ErrorMessage, resetForm } = VeeValidate;
// const { required, email, min, max } = VeeValidateRules;
// const { localize, loadLocaleFromURL } = VeeValidateI18n;



import App from "./App.vue";
import router from "./router";



import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());





createApp(App)
.use(router)
.use(VueAxios, axios)
.component('Form', Form)
.component('Field', Field)
.component('ErrorMessage', ErrorMessage)
.mount('#app')
