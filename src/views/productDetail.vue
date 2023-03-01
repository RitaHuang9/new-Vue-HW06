<template>
<router-link :to="{ name: 'productList' }" type="button" class="nav-item" > 〈 返回產品列表</router-link>
  <div class="row pt-3">
    <div class="col-sm-6">
      <img class="img-fluid  w-100" style="object-fit: cover; max-height:300px;" 
      :src="tempProduct.imageUrl" alt="" />
    </div>
    <div class="col-sm-6">
      <h2>{{ tempProduct.title }}</h2>
      <span class="badge bg-primary rounded-pill ms-0">{{
        tempProduct.category
      }}</span>
      <p>商品描述：{{ tempProduct.description }}</p>
      <p>商品內容：{{ tempProduct.content }}</p>
      <div class="h5">{{ tempProduct.price }} 元</div>
      <del class="h6" v-if="tempProduct.price !== tempProduct.origin_price">原價 {{ tempProduct.origin_price }} 元</del>

      <div>
        <div class="input-group">
          <select name="" id="" class="form-control" v-model.number="qty">
            <option :value="i" v-for="i in 20" :key="i + '12344'">
              {{ i }}
            </option>
          </select>
          <button
            type="button"
            class="btn btn-primary"
            @click="addCart(tempProduct.id, qty)"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
    <!-- col-sm-6 end -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["productId"],
  data() {
    return {
      id: this.$route.params.productId,
      url:import.meta.env.VITE_PATH,
      api_path:'rita009',
      tempProduct: {},
      qty: 1,
    };
  },
  methods: {
    getData() {
      axios
        .get(`${this.url}api/${this.api_path}/product/${this.id}`)
        .then((res) => {
          this.tempProduct = res.data.product;
          console.log("單一產品資訊：", this.tempProduct);
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    addCart(product_id, qty = 1) {
      const data = {
        product_id,
        qty,
      };
      axios
        .post(`${this.url}api/${this.api_path}/cart`, { data })
        .then((res) => {
          console.log("加入購物車：", res.data.data);
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
  mounted() {
    this.getData();
    // console.log("router", this.$route.params.productId);
  },
};
</script>
