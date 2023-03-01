<template>
  <product-modal
    :temp-product="tempProduct"
    :add-cart="addCart"
    :open-modal="openModal"
    ref="productModal"
  />
  <table class="table align-middle">
    <thead>
      <tr>
        <th>圖片</th>
        <th>商品名稱</th>
        <th>價格</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td style="width: 200px">
          <div style="height: 100%">
            <img
              style="width: 100%; max-height: 150px"
              :src="product.imageUrl"
              :alt="product.title"
            />
          </div>
        </td>
        <td>{{ product.title }}</td>
        <td>
          <div class="h5">{{ product.price }} 元</div>
          <del class="h6" v-if="product.price !== product.origin_price"
            >原價 {{ product.origin_price }} 元</del
          >
        </td>
        <td>
          <div class="btn-group btn-group-sm">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="goProductDetail(product.id)"
            >
              <i class="fas fa-pulse"></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="addCart(product.id)"
            >
              <i class="fas fa-pulse"></i>
              加到購物車
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import axios from "axios";
import productModal from "../components/productModal.vue";

export default {
  components: { productModal },
  data() {
    return {
      url: import.meta.env.VITE_PATH,
      api_path: "rita009",
      products: {},
      tempProduct: {},
    };
  },
  methods: {
    // 取得產品列表
    getData() {
      axios
        .get(`${this.url}api/${this.api_path}/products/all`)
        .then((res) => {
          this.products = res.data.products;
          console.log("產品列表：", this.products);
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    // 取得單一產品資訊
    openModal(id) {
      axios
        .get(`${this.url}api/${this.api_path}/product/${id}`)
        .then((res) => {
          this.tempProduct = res.data.product;
          this.$refs.productModal.openModal();
          console.log("單一產品資訊：", this.tempProduct);
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    //加入購物車
    addCart(product_id, qty = 1) {
      const data = {
        product_id,
        qty,
      };
      axios
        .post(`${this.url}api/${this.api_path}/cart`, { data })
        .then((res) => {
          this.$refs.productModal.closeModal();
          console.log("加入購物車：", res.data.data);
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    // 開啟產品資訊
    goProductDetail(productId){
      this.$router.push(`product-detail/${productId}`)
    }
  },
  components: {
    productModal,
  },
  mounted() {
    this.getData();
  },
};
</script>
