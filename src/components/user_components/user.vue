<template>
  <div class="container">
    <div class="text-center" style="margin-top: 80px">
      <h1>User List</h1>
    </div>
    <div v-if="message" class="alert alert-success">
      {{ message }}
    </div>
    <table
      id="example"
      class="table table-striped table-bordered"
      style="width: 100%; margin-top: 30px"
    >
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Username</th>
          <th>Password</th>
          <th>Email</th>
          <th style="text-align: center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, stt) in users" v-bind:key="user.id">
          <td>{{ stt + 1 }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.password }}</td>
          <td>{{ user.email }}</td>
          <td style="text-align: center">
            <el-icon
              v-on:click="deleteUser(user.id)"
              style="font-size: 20pt; color: red"
              ><delete
            /></el-icon>
            <router-link
              :to="{
                name: 'EditUser',
                params: {
                  id: user.id,
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
      <router-link to="/users/new"
        ><el-button type="success"> New </el-button></router-link
      >
    </div>
  </div>
</template>
<script setup>
import { Edit, Delete } from "@element-plus/icons-vue";
</script>
<script>
import UserService from "@/client/base_client";
import { ElButton } from "element-plus";
import swal from "sweetalert";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "users",
  components: { ElButton },
  data() {
    return {
      name_user: "users",
      message: "",
      users: [],
    };
  },
  methods: {
    getUsers() {
      UserService.getAllList(this.name_user).then((response) => {
        this.users = response.data;
      });
    },
    deleteUser(id) {
      swal({
        title: "Do you want to delete ?",
        icon: "warning",
        buttons: "Yes",
      }).then((result) => {
        if (result) {
          UserService.DeleteEntity(this.name_user, id)
            .then((response) => {
              this.getUsers();
              console.log(response.data);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      });
    },
  },
  created() {
    this.getUsers();
  },
};
</script>
<style>
@import "@/assets/css/Bootstrap v4.5.2.css";
@import "@/assets/css/dataTables_bootstrap4_min.css";
</style>
