<template>
  <div class="text-end mt-4">
    <button class="btn btn-primary" @click="openModal('add', product)">
      建立新的產品
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="120">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.category }}</td>
        <td>{{ product.title }}</td>
        <td class="text-end">{{ product.origin_price }}</td>
        <td class="text-end">{{ product.price }}</td>
        <td>
          <span v-if="product.is_enabled" class="text-success">啟用</span>
          <span v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="openModal('edit', product)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="openModal('delete', product)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- <product-modals ref="prodcutModal" :open-modal="openModal" :temp-product="tempProduct"></product-modals> -->
</template>

<script>
import axios from "axios";
import productModals from "@/components/productModal.vue";
// import Modal from 'bootstrap/js/dist/modal';

export default {
  data() {
    return {
      url: import.meta.env.VITE_PATH,
      api_path: "rita009",
      products: {},
      page: {},
      tempProduct: {
        imagesUrl: [],
      },
      tempUploadImg: {}, //上傳圖片檔案
      isNew: false,
    };
  },
  methods: {
    checkLogin() {
      axios
        .post(`${this.url}api/user/check`)
        .then(() => {
          this.getProduct();
          console.log("有登入");
        })

        .catch((err) => {
          alert(err.data.message);

          that.$router.push({
            name: "login",
          });
        });
    },
    getProduct(page = 1) {
      axios
        .get(`${this.url}api/${this.api_path}/admin/products/?page=${page}`)
        .then((res) => {
          this.products = res.data.products;
          this.page = res.data.pagination;
          console.log("取得產品列表", this.products);
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    // 判斷 Modal開啟時的狀態
    openModal(status, product) {
      
      this.isNew = false;
      // 當入當前資料
      this.tempProduct = { ...product };
      console.log('編輯當前資料',this.tempProduct);
      this.$router.push(`dashboardProduct-detail/${this.tempProduct.id}`)
      // // 新增資料
      // if (status === "add") {
      //   this.$refs.prodcutModal.openModal();
      //   this.isNew = true;
      //   // 初始化
      //   this.tempProduct = {
      //     imagesUrl: [],
      //   };
      //   // 編輯資料
      // } else if (status === "edit") {
      //   this.$refs.prodcutModal.openModal();
      //   this.isNew = false;
      //   // 當入當前資料
      //   this.tempProduct = { ...product };
      //   console.log('編輯當前資料',this.tempProduct);
        
      //   // 刪除資料
      // } else if (status === "delete") {
      //   // delProductModal.openModal();
      //   this.tempProduct = { ...product }; //取資料內id
      // }
    },
  },
  components: {
    productModals,
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)rita009\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // https://github.com/axios/axios#global-axios-defaults
    axios.defaults.headers.common["Authorization"] = token;
    this.checkLogin();
  },
};
</script>
