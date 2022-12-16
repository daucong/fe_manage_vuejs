<template>
  <div class="container text-center" style="margin-top: 80px">
    <div v-if="this.id == null">
      <h1>Create New Product</h1>
    </div>
    <div v-else>
      <h1>Edit Product</h1>
    </div>
  </div>
  <form
    @submit.prevent="SaveProduct"
    enctype="multipart/form-data"
    class="submit-form"
  >
    <div class="form-group">
      <label>Product Name:</label>
      <el-input
        v-model="this.product.name"
        placeholder="Please input"
        clearable
        required
      />
    </div>
    <div class="form-group">
      <label>Product Price:</label>
      <el-input
        v-model="this.product.price"
        placeholder="Please input"
        :formatter="(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
        :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
        clearable
        required
      />
    </div>
    <div class="form-group">
      <label>Category: </label>
      <el-select v-model="this.category_id">
        <el-option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
          :label="category.name"
        >
        </el-option>
      </el-select>
    </div>
    <div class="form-group">
      <label>Product Image:</label>
      <v-file-input
        label="File input"
        ref="file"
        type="file"
        prepend-icon="mdi-camera"
        v-on:change="readImg"
      />
      <input v-model="this.product.image" hidden />
    </div>
    <button class="btn btn-primary">Submit</button>
  </form>
</template>

<script>
import CategoryService from "@/client/base_client";
import ProductService from "@/client/base_client";
import swal from "sweetalert";
import { ElInput, ElSelect, ElOption } from "element-plus";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "products_form",
  components: { ElInput, ElSelect, ElOption },
  data() {
    return {
      name_category: "categories",
      name_product: "products",
      product: [],
      categories: [],
      id: null,
      category_id: "",
    };
  },
  methods: {
    readImg(e) {
      var input = e.target;
      var filename = input.files[0].name;
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = (e) => {
          this.file = e.target.result;
          this.product.image = filename;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    getProduct() {
      ProductService.findEntityById(this.name_product, this.id)
        .then((response) => {
          this.product = response.data;
          this.category_id = response.data.category.id;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getCategories() {
      CategoryService.getAllList(this.name_category)
        .then((response) => {
          this.categories = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    SaveProduct() {
      let formData = new FormData();
      let file = this.$refs.file.files[0];
      formData.append("file", file);
      ProductService.uploadURL(formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      if (this.id == null) {
        var data = {
          name: this.product.name,
          price: this.product.price,
          category: { id: this.category_id },
          image: this.product.image,
        };
        ProductService.addEntity(this.name_product, data)
          .then((response) => {
            console.log(response.data);
            this.$router.push("/products");
            swal({
              text: "Product added",
              icon: "success",
              timer: 1000,
            });
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        var data1 = {
          id: this.id,
          name: this.product.name,
          price: this.product.price,
          category: { id: this.category_id },
          image: this.product.image,
        };
        ProductService.addEntity(this.name_product, data1)
          .then((response) => {
            console.log(response.data);
            this.$router.push("/products");
            swal({
              text: "Product edit",
              icon: "success",
              timer: 1000,
            });
          })

          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
  mounted() {
    this.id = this.$route.params.id;

    this.categories = this.getCategories();

    if (this.id != null) {
      this.product = this.getProduct();
    }
  },
};
</script>

<style>
.submit-form {
  max-width: 600px;
  margin: auto;
}
</style>
