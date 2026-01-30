<template>
  <v-app>
    <v-app-bar color="#7d0c14">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Personnel evaluation system</v-toolbar-title>
      <v-spacer />
      <!-- โปรไฟล์ -->
      <!-- <v-btn icon="mdi-account-circle" variant="text" /> -->
       <p>ผู้ใช้งาน : {{ user.first_name }} {{ user.last_name }} <br> {{ user.role }}</p>&nbsp;&nbsp;
       <v-btn @click="logout" class="bg-white">ออกจากระบบ</v-btn>
    </v-app-bar>

    <v-navigation-drawer color="#404040" v-model="drawer" width="260">
      <v-list density="comfortable" nav>
        <v-list-item v-for="items in navitem" :key="items.title" :to="items.to">
          <v-list-item-title>
            {{ items.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="py-6">
        <NuxtPage />
      </v-container>
      <v-footer app class="text-caption justify-center">© 2025 VEC Skills</v-footer>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import {useDisplay} from 'vuetify'
const {mdAndDown} = useDisplay()
const isMobile = computed(() => mdAndDown.value)
const drawer = ref(false)
const user = ref<any>({})

const logout = async () =>{
  if(!confirm('ต้องการออกจากระบบใช่หรือไม่'))return
  localStorage.getItem('token')
  navigateTo('/')
}

</script>

<style scoped>

</style>