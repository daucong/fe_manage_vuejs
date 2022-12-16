import { createRouter, createWebHistory } from "vue-router";
import user_form from "@/components/user_components/user_form.vue";
import ListCategory from "@/components/category_components/category.vue";
import category_form from "@/components/category_components/category_form.vue";
import ListProduct from "@/components/product_components/product.vue";
import product_form from "@/components/product_components/product_form.vue";
const routes = [
  {
    name: "ListUser",
    path: "/users",
    component: () => import("@/components/user_components/user"),
  },
  { path: "/users/new", component: user_form },
  { name: "EditUser", path: "/users/edit/:id", component: user_form },
  { name: "ListCategory", path: "/categories", component: ListCategory },
  { path: "/categories/new", component: category_form },
  {
    name: "Editcategory",
    path: "/categories/edit/:id",
    component: category_form,
  },
  { name: "ListProduct", path: "/products", component: ListProduct },
  { path: "/products/new", component: product_form },
  { name: "Editproduct", path: "/products/edit/:id", component: product_form },
  {
    path: "/:catchAll(.*)",
    component: Error,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
