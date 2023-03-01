<template>
  <div>產品編輯</div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal.js";

export default {
  props: ['tempProduct', 'updateProduct', 'isNew', 'uploadImg','createImages'],
  data() {
    return {
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      tempUploadImg: {}, //上傳圖片檔案
      isNew: false,
      page: {},
    };
  },
  watch: {
    openModal() {
      console.log("以點擊");

      modal.addEventListener("hidden.bs.modal", (event) => {
        this.qty = 1;
      });
    },
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
  },
  mounted() {
    // this.modal = new Modal(this.$refs.modal);
  },
};
</script>
