<template>
  <div class="container text-center" style="margin-top: 80px">
    <div v-if="this.id == null">
      <h1>Create New User</h1>
    </div>
    <div v-else>
      <h1>Edit User</h1>
    </div>
  </div>
  <form @submit.prevent="SaveUser" class="submit-form">
    <div class="form-group">
      <label>Name</label>
      <el-input v-model="this.user.name" placeholder="Please input" clearable
        ><template #prepend> <el-button :icon="Avatar" /> </template
      ></el-input>
    </div>
    <div class="form-group">
      <label>Phone</label>
      <el-input
        type="tel"
        placeholder="Please input"
        required
        clearable
        v-model="this.user.phone"
        ><template #prepend> <el-button :icon="Iphone" /> </template
      ></el-input>
    </div>
    <div class="form-group">
      <label>Username</label>
      <el-input
        type="text"
        placeholder="Please input"
        clearable
        required
        v-model="this.user.username"
        ><template #prepend> <el-button :icon="User" /> </template
      ></el-input>
    </div>
    <div class="form-group">
      <label>Password</label>
      <el-input
        v-model="this.user.password"
        required
        type="password"
        placeholder="Please input password"
        show-password
      />
    </div>
    <div class="form-group">
      <label>Email</label>
      <el-input
        type="email"
        placeholder="Please input email"
        clearable
        required
        v-model="this.user.email"
        ><template #prepend> <el-button :icon="Message" /> </template
      ></el-input>
    </div>
    <Button class="btn btn-primary">Submit</Button>
  </form>
</template>
<script setup>
import { User, Avatar, Iphone, Message } from "@element-plus/icons-vue";
</script>
<script>
import UserService from "@/client/base_client";
import swal from "sweetalert";
import { ElInput } from "element-plus";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "users_form",
  components: { ElInput },
  data() {
    return {
      name_user: "users",
      user: [],
      id: null,
    };
  },
  methods: {
    getUser() {
      UserService.findEntityById(this.name_user, this.id)
        .then((response) => {
          this.user = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    SaveUser() {
      if (this.id == null) {
        var data = {
          name: this.user.name,
          phone: this.user.phone,
          username: this.user.username,
          password: this.user.password,
          email: this.user.email,
        };
        UserService.addEntity(this.name_user, data)
          .then((response) => {
            console.log(response.data);
            this.$router.push("/users");
            swal({
              text: "User added",
              icon: "success",
            });
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        var data1 = {
          id: this.id,
          name: this.user.name,
          phone: this.user.phone,
          username: this.user.username,
          password: this.user.password,
          email: this.user.email,
        };
        UserService.addEntity(this.name_user, data1)
          .then((response) => {
            console.log(response.data);
            this.$router.push("/users");
            swal({
              text: "User edit",
              icon: "success",
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
    if (this.id != null) {
      this.user = this.getUser();
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
