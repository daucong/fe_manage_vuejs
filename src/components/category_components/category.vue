<template>
  <div class="container">
    <div class="text-center" style="margin-top: 80px">
      <h1>Category List</h1>
    </div>
    <!-- :data="categories"
      :columns="columns" -->
    <table class="table table-striped table-bordered" style="margin-top: 30px">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th style="text-align: center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, stt) in categories" v-bind:key="category.id">
          <td>{{ stt + 1 }}</td>
          <td>{{ category.name }}</td>
          <td style="text-align: center">
            <el-icon
              v-on:click="deleteCategory(category.id)"
              style="font-size: 20pt; color: red"
              ><delete
            /></el-icon>
            <router-link
              :to="{
                name: 'Editcategory',
                params: {
                  id: category.id,
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
    <div class="row_1">
      <router-link to="/categories/new"
        ><el-button type="success"> New </el-button></router-link
      >
    </div>
  </div>
</template>
<script setup>
import { Edit, Delete } from "@element-plus/icons-vue";
</script>
<script>
import CategoryService from "@/client/base_client";
import { ElButton } from "element-plus";
import swal from "sweetalert";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "categories",
  components: { ElButton },
  data() {
    return {
      name_category: "categories",
      categories: [],
      columns: [
        { data: "name" },
        {
          data: {},
        },
      ],
    };
  },
  methods: {
    getCategories() {
      CategoryService.getAllList(this.name_category).then((response) => {
        this.categories = response.data;
      });
    },
    deleteCategory(id) {
      swal({
        title: "Do you want to delete ?",
        icon: "warning",
        buttons: "Yes",
      }).then((result) => {
        if (result) {
          CategoryService.DeleteEntity(this.name_category, id)
            .then((response) => {
              this.getCategories();
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
    this.getCategories();
  },
};
</script>
<style>
@import "@/assets/css/Bootstrap v4.5.2.css";
@import "@/assets/css/dataTables_bootstrap4_min.css";
</style>
