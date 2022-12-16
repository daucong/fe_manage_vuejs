<template>
  <div class="container">
    <div class="text-center" style="margin-top: 80px">
      <h1>Product List</h1>
    </div>
    <div style="display: flex">
      <a style="margin-top: 2px; margin-right: 3px">Show </a>
      <el-select
        v-model="this.limit"
        @change="getProducts(this.currentpage)"
        style="width: 70px"
      >
        <el-option :value="5" :label="5"> </el-option>
        <el-option :value="10" :label="10"> </el-option>
        <el-option :value="20" :label="20"> </el-option>
        <el-option :value="50" :label="50"> </el-option>
        <el-option :value="100" :label="100"> </el-option>
      </el-select>
      <el-select
        v-model="this.sortname"
        @change="getProducts(this.currentpage)"
        style="width: 80px"
      >
        <el-option value="ASC" label="ASC"> </el-option>
        <el-option value="DESC" label="DESC"> </el-option>
      </el-select>
      <el-select
        v-model="this.sortby"
        @change="getProducts(this.currentpage)"
        style="width: 80px"
      >
        <el-option value="id" label="ID"> </el-option>
        <el-option value="name" label="Name"> </el-option>
        <el-option value="price" label="Price"> </el-option>
      </el-select>
    </div>
    <el-input
      v-model="search"
      @input="getProducts(this.currentpage)"
      size="small"
      placeholder="Type to search"
    />
    <table
      id="example"
      class="table table-striped table-bordered"
      style="width: 100%"
    >
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th style="text-align: center">Image</th>
          <th style="text-align: center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, stt) in products.content" :key="product.id">
          <td>{{ stt + 1 }}</td>
          <td v-text="product.name"></td>
          <td>{{ product.price }} ₫</td>
          <td>{{ product.category.name }}</td>
          <td style="text-align: center">
            <img
              :src="`http://localhost:8080/api/ImgService/` + product.image"
              style="height: 50px; width: 50px"
            />
          </td>
          <td style="text-align: center">
            <el-icon
              v-on:click="deleteProduct(product.id)"
              style="font-size: 20pt; color: red"
              ><delete
            /></el-icon>
            <router-link
              :to="{
                name: 'Editproduct',
                params: {
                  id: product.id,
                },
              }"
            >
              <el-icon style="font-size: 20pt; margin-top: 2px"
                ><Edit /></el-icon
            ></router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-center" style="display: flex">
      <router-link to="/products/new"
        ><el-button style="margin-top: 2pt" type="success">
          New
        </el-button></router-link
      >
      <a style="margin-top: 5px; margin-left: 5px; margin-right: 5px"
        >Total: {{ this.totalItem }}</a
      >
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" v-bind:class="[{ disabled: !this.prev_page }]">
            <a class="page-link" href="#" @click="getProducts(this.first_page)"
              ><el-icon><DArrowLeft /></el-icon
            ></a>
          </li>
          <li class="page-item" v-bind:class="[{ disabled: !this.prev_page }]">
            <a class="page-link" href="#" @click="getProducts(this.prev_page)"
              ><el-icon><ArrowLeftBold /></el-icon
            ></a>
          </li>
          <li class="page-item" v-for="index in this.totalPages" :key="index">
            <a class="page-link" href="#" @click="getProducts(index)">{{
              index
            }}</a>
          </li>

          <li
            class="page-item"
            v-bind:class="[{ disabled: this.currentpage == this.totalPages }]"
          >
            <a class="page-link" href="#" @click="getProducts(this.next_page)"
              ><el-icon><ArrowRightBold /></el-icon
            ></a>
          </li>
          <li
            class="page-item"
            v-bind:class="[{ disabled: this.currentpage == this.totalPages }]"
          >
            <a class="page-link" href="#" @click="getProducts(this.last_page)"
              ><el-icon><DArrowRight /></el-icon
            ></a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script setup>
import { Edit, Delete } from "@element-plus/icons-vue";
</script>
<script>
import ProductService from "@/client/base_client";
import { ElButton, ElInput, ElSelect, ElOption } from "element-plus";
import "vuetify/styles";
import "vuetify/iconsets/mdi";
import swal from "sweetalert";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "products",
  components: { ElButton, ElInput, ElSelect, ElOption },
  data() {
    return {
      name_product: "products",
      message: "",
      products: [],
      currentpage: 1,
      last_page: "",
      first_page: "",
      next_page: "",
      prev_page: "",
      litmit: "",
      totalItem: "",
      totalPages: "",
      search: null,
      limit: 5,
      sortname: "ASC",
      sortby: "id",
    };
  },
  methods: {
    getProducts(page) {
      ProductService.getEntitysWithPaginh(
        this.name_product,
        page,
        this.limit,
        this.sortname,
        this.sortby,
        this.search
      ).then((response) => {
        this.products = response.data;
        this.currentpage = page;
        this.first_page = 1;
        this.last_page = response.data.totalPages;
        this.next_page = this.currentpage + 1;
        this.prev_page = this.currentpage - 1;
        this.litmit = response.data.size;
        this.totalItem = response.data.totalElements;
        this.totalPages = response.data.totalPages;
      });
    },
    deleteProduct(id) {
      swal({
        title: "Do you want to delete ?",
        icon: "error",
      }).then((result) => {
        if (result) {
          ProductService.DeleteEntity(this.name_product, id)
            .then((response) => {
              this.getProducts(this.currentpage);
              console.log(response.data);
            })
            .catch((e) => {
              alert("Don't deleted!");
              console.log(e);
            });
        }
      });
    },
  },
  created() {
    this.getProducts(this.currentpage);
  },
};
</script>
<style>
@import "@/assets/css/Bootstrap v4.5.2.css";
@import "@/assets/css/dataTables_bootstrap4_min.css";
</style>
