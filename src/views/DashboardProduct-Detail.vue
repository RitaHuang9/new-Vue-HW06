<template>
  <h3 class="modal-title border-bottom fw-bolder pb-3 text-center">
    <!-- {{ this.isNew ? "新增" : "編輯" }} -->
    產品
  </h3>
  <div class="mt-3 row">
    <div class="col-sm-6">
      <div class="mb-3">
        <label for="title" class="form-label">標題</label>
        <input
          v-model="tempProduct.title"
          id="title"
          type="text"
          class="form-control"
          placeholder="請輸入標題"
        />
      </div>

      <div class="row">
        <div class="mb-3 col-md-6">
          <label for="category" class="form-label">分類</label>
          <input
            v-model="tempProduct.category"
            id="category"
            type="text"
            class="form-control"
            placeholder="請輸入分類"
          />
        </div>
        <div class="mb-3 col-md-6">
          <label for="price" class="form-label">單位</label>
          <input
            v-model="tempProduct.unit"
            id="unit"
            type="text"
            class="form-control"
            placeholder="請輸入單位"
          />
        </div>
      </div>

      <div class="row">
        <div class="mb-3 col-md-6">
          <label for="origin_price" class="form-label">原價</label>
          <input
            v-model.number="tempProduct.origin_price"
            id="origin_price"
            type="number"
            min="0"
            class="form-control"
            placeholder="請輸入原價"
          />
        </div>
        <div class="mb-3 col-md-6">
          <label for="price" class="form-label">售價</label>
          <input
            v-model.number="tempProduct.price"
            id="price"
            type="number"
            min="0"
            class="form-control"
            placeholder="請輸入售價"
          />
        </div>
      </div>
      <hr />

      <div class="mb-3">
        <label for="description" class="form-label">產品描述</label>
        <textarea
          v-model="tempProduct.description"
          id="description"
          type="text"
          class="form-control"
          placeholder="請輸入產品描述"
        >
        </textarea>
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">說明內容</label>
        <textarea
          v-model="tempProduct.content"
          id="description"
          type="text"
          class="form-control"
          placeholder="請輸入說明內容"
        >
        </textarea>
      </div>
      <div class="mb-3">
        <div class="form-check">
          <input
            v-model="tempProduct.is_enabled"
            id="is_enabled"
            class="form-check-input"
            type="checkbox"
            :true-value="1"
            :false-value="0"
          />
          <label class="form-check-label" for="is_enabled">是否啟用</label>
        </div>
      </div>
    </div>
    <div class="col-sm-6">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            圖片連結
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            上傳圖片
          </button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <div v-if="Array.isArray(tempProduct.imagesUrl)" class="mt-4">
            <h4>新增多圖</h4>
            <template
              v-for="(img, key) in tempProduct.imagesUrl"
              :key="key + 12345"
            >
              <input
                type="text"
                class="w-100 mb-2"
                v-model="tempProduct.imagesUrl[key]"
              />
              <img
                :src="tempProduct.imagesUrl[key]"
                alt=""
                class="w-100 mb-3"
              />
            </template>
            <div>
              <button
                class="btn btn-outline-primary btn-sm d-block w-100 mb-3"
                @click="tempProduct.imagesUrl.push('')"
                v-if="
                  !tempProduct.imagesUrl.length ||
                  tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]
                "
              >
                新增圖片
              </button>
              <button
                class="btn btn-outline-danger btn-sm d-block w-100"
                @click="tempProduct.imagesUrl.pop()"
                v-else
              >
                刪除圖片
              </button>
            </div>
          </div>

          <div v-else>
            <button
              class="btn btn-outline-primary btn-sm d-block w-100"
              @click="createImages"
            >
              新增圖片
            </button>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <label for="formFile" class="form-label">請上傳商品圖片</label>
          <input
            @change="uploadImg"
            class="form-control mb-2 9"
            type="file"
            id="formFile"
            name="file-to-upload"
          />

          <img class="img-fluid" :src="tempProduct.imageUrl" alt="" />
        </div>
      </div>
    </div>
  </div>
  <div class="d-flex my-4 justify-content-center">
    <button
      type="button"
      class="btn btn-outline-secondary me-2"
      data-bs-dismiss="modal"
      @click="goBack"
    >
      取消
    </button>
    <button type="button" class="btn btn-primary" @click="updateProduct">
      確認
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["dashboardProductId"],
  data() {
    return {
      id: this.$route.params.dashboardProductId,
      url: import.meta.env.VITE_PATH,
      api_path: "rita009",
      tempProduct: {
        imagesUrl: [],
      },
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
    updateProduct() {
      axios
      .put(`${this.url}api/${this.api_path}/admin/product/${this.tempProduct.id}`, { data : this.tempProduct }) //api資料結構在data裡
        .then((res) => {
          console.log('確認送出編輯',res);
          
          this.$router.push({
            name: 'dashboard',
          })
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.getData();
    console.log("動態參數資料", this.$route.params.dashboardProductId);
  },
};
</script>
