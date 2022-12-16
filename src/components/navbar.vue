<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-template-root -->
<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail>
        <v-divider></v-divider>
        <v-list style="margin-top: 50px">
          <v-list-item
            prepend-avatar="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/91717daa-5f73-4e72-8c0a-9d07dbab0e46/d64mcho-4f3f931b-53bc-4d25-acad-99b0446f25e4.png/v1/fill/w_550,h_800,strp/one_piece__sanji_chibi_by_kanokawa_d64mcho-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODAwIiwicGF0aCI6IlwvZlwvOTE3MTdkYWEtNWY3My00ZTcyLThjMGEtOWQwN2RiYWIwZTQ2XC9kNjRtY2hvLTRmM2Y5MzFiLTUzYmMtNGQyNS1hY2FkLTk5YjA0NDZmMjVlNC5wbmciLCJ3aWR0aCI6Ijw9NTUwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.gSiRHymontlTu7FQB7wA9E-PliwENS9iD__qtKZT-g8"
            title="Đậu Thái Công"
            subtitle="dauthaicong11092001@gmailcom"
          ></v-list-item>
        </v-list>
        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-folder"
            title="My Files"
            value="myfiles"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-multiple"
            title="Shared with me"
            value="shared"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-star"
            title="Starred"
            value="starred"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 250px"></v-main>
    </v-layout>
  </v-card>
  <v-app :theme="theme">
    <v-app-bar>
      <v-main>
        <nav style="margin-top: -50px">
          <ul class="nav nav-tabs">
            <li class="nav-item dropdown">
              <router-link to="/users" class="nav-link">User</router-link>
            </li>
            <li class="nav-item dropdown">
              <router-link to="/categories" class="nav-link"
                >Category</router-link
              >
            </li>
            <li class="nav-item dropdown">
              <router-link to="/products" class="nav-link">Product</router-link>
            </li>
          </ul>
        </nav>
      </v-main>
      <v-btn
        :prepend-icon="
          theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
        "
        @click="onClick"
        >Toggle Theme</v-btn
      >
    </v-app-bar>
  </v-app>
</template>
<script setup>
import { ref } from "vue";
const theme = ref("light");

function onClick() {
  theme.value = theme.value === "light" ? "dark" : "light";
}
</script>
<style>
.nav-tabs {
  justify-content: center;
}
</style>
