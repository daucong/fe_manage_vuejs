<template>
  <div class="container text-center" style="margin-top: 80px">
    <div v-if="this.id == null">
      <h1>Create New Category</h1>
    </div>
    <div v-else>
      <h1>Edit Category</h1>
    </div>
  </div>
  <form @submit.prevent="SaveCategory" class="submit-form">
    <div class="form-group">
      <label>Name</label>
      <el-input
        type="text"
        placeholder="Please input"
        clearable
        required
        v-model="this.category.name"
      />
    </div>
    <button class="btn btn-primary">Submit</button>
  </form>
</template>

<script>
import CategoryService from "@/client/base_client";
import { ElInput } from "element-plus";
import swal from "sweetalert";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "categories_form",
  components: { ElInput },
  data() {
    return {
      name_categories: "categories",
      category: [],
      id: null,
    };
  },
  methods: {
    getCategory() {
      CategoryService.findEntityById(this.name_categories, this.id)
        .then((response) => {
          this.category = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    SaveCategory() {
      if (this.id == null) {
        var data = {
          name: this.category.name,
        };
        CategoryService.addEntity(this.name_categories, data)
          .then((response) => {
            console.log(response.data);
            this.$router.push("/categories");
            swal({
              text: "Category added",
              icon: "success",
            });
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        var data1 = {
          id: this.id,
          name: this.category.name,
        };
        CategoryService.addEntity(this.name_categories, data1)
          .then((response) => {
            console.log(response.data);
            this.$router.push("/categories");
            swal({
              text: "Category edited",
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
      this.category = this.getCategory();
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
