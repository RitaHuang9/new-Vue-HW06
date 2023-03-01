<template>
  <div class="d-flex grid" style="gap: 40px">
    <div class="w-100">
      <!-- 購物車列表 -->
      <div class="text-end">
        <button
          class="btn btn-outline-danger"
          type="button"
          @click="deleteAllCart"
        >
          清空購物車
        </button>
      </div>
      <!-- 購物車清單 -->
      <div v-if="this.cart.carts">
        <!-- {{ this.cart.carts }} -->
        <table class="table align-middle" v-if="this.cart.carts.length > 0">
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th style="width: 150px">數量/單位</th>
              <th class="text-end">單價</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td>
                <button
                  @click="deleteCartData(item.id)"
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                >
                  <!-- :disabled="item.id === loadingItem" -->
                  <i class="fas fa-pulse"></i>
                  x
                </button>
              </td>
              <td>
                {{ item.product.title }}
                <!-- <div class="text-success">
                                            已套用優惠券
                                        </div> -->
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <select
                    name=""
                    id=""
                    class="form-control"
                    v-model="item.qty"
                    @change="updatedCart(item)"
                  >
                    <!-- :disabled="item.id === loadingItem" -->
                    <option :value="i" v-for="i in 20" :key="i + '1234'">
                      {{ i }}
                    </option>
                  </select>
                </div>
              </td>
              <!-- <td> {{ item.product.origin_price }}</td> -->
              <td class="text-end">
                {{ item.final_total }}
                <!-- <small class="text-success">折扣價： {{ item.product.price }} </small> -->
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ cart.final_total }}</td>
            </tr>
            <!-- <tr>
          <td colspan="3" class="text-end text-success">折扣價</td>
          <td class="text-end text-success">{{}}</td>
        </tr> -->
          </tfoot>
        </table>
        <div v-else class="d-flex justify-content-center align-items-center flex-column" style="min-height: 200px;">
          <p>購物車裡沒東西囉～～趕緊去購物吧</p>
          <router-link type="button" :to="{ name: 'productList' }"> 前往產品列表 </router-link >
          </div>
      </div>
    </div>
    <div class="my-5 row justify-content-center w-100">
      <Form ref="form" @submit="createOrder" v-slot="{ errors }">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>

          <Field
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
            v-model="form.user.email"
          ></Field>

          <error-message name="email" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>

          <Field
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            placeholder="請輸入姓名"
            :class="{ 'is-invalid': errors['姓名'] }"
            rules="required"
            v-model="form.user.name"
          ></Field>
          <error-message name="姓名" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>

          <Field
            id="tel"
            name="電話"
            type="text"
            class="form-control"
            placeholder="請輸入電話"
            :class="{ 'is-invalid': errors['電話'] }"
            v-model="form.user.tel"
            rules="required|min:8|max:10"
          ></Field>
          <error-message name="電話" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>

          <Field
            id="address"
            name="地址"
            type="text"
            class="form-control"
            placeholder="請輸入地址"
            rules="required"
            :class="{ 'is-invalid': errors['地址'] }"
            v-model="form.user.address"
          ></Field>
          <error-message name="地址" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea
            id="message"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger">送出訂單</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import VeeValidate from "vee-validate";

export default {
  data() {
    return {
      url: import.meta.env.VITE_PATH,
      api_path: "rita009",
      cart: {},
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  methods: {
    // 取得購物車
    getCarts() {
      axios
        .get(`${this.url}api/${this.api_path}/cart`)
        .then((res) => {
          this.cart = res.data.data;
          console.log("購物車清單", this.cart);
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    // 更新購物車
    updatedCart(item) {
      const data = {
        product_id: item.product.id,
        qty: item.qty,
      };
      axios
        .put(`${this.url}api/${this.api_path}/cart/${item.id}`, { data })
        .then((res) => {
          this.getCarts();
          console.log("更新購物車", res);
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    // 刪除單筆購物車資訊
    deleteCartData(id) {
      axios
        .delete(`${this.url}api/${this.api_path}/cart/${id}`)
        .then((res) => {
          this.getCarts();
          console.log("刪除單一購物車", res.data);
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    //刪除全部購物車
    deleteAllCart() {
      axios
        .delete(`${this.url}api/${this.api_path}/carts`)
        .then((res) => {
          this.getCarts();
          console.log("刪除全部購物車", res.data);
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    createOrder() {
      console.log("createOrder", this.form);
      const order = this.form;
      axios
        .post(`${this.url}api/${this.api_path}/order`, { data: order })
        .then((res) => {
          this.getCarts();
          this.$refs.form.resetForm(); //清空表單
          alert`訂單已送出～～`;
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
  mounted() {
    this.getCarts();
    // console.log('購物車是否為空',this.cart.carts.length === 0);
    
  },
};
</script>
