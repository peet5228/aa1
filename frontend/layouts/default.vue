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
import axios from 'axios';
import { computed, ref } from 'vue';
import {useDisplay} from 'vuetify'
// import {api} from '../API/bast'
const {mdAndDown} = useDisplay()
const isMobile = computed(() => mdAndDown.value)
const drawer = ref(false)
const user = ref<any>({})

const logout = async () =>{
  if(!confirm('ต้องการออกจากระบบใช่หรือไม่'))return
  localStorage.getItem('token')
  navigateTo('/')
}

const roles = [
  //staff
  {title:'หน้าหลัก',to:'/Staff/',role:'ฝ่ายบุคลากร'},

  //commit
  {title:'รายชื่อผู้รับการประเมิน',to:'/Committee/',role:'กรรมการประเมิน'},

  //eva
  {title:'หน้าหลัก',to:'/Evaluatee/',role:'ผู้รับการประเมินผล'},
]
const navitem = computed(() => roles.filter((item) => item.role.includes(user.value.role)))

const fetchUser = async () =>{
  const token = localStorage.getItem('token')
    if(!token){
      return await navigateTo('/',{replace:true})
    }
  try{
    const res = await axios.get(`${api}/profile`)
    user.value = res.data
  }catch(err){
    console.error('Error GET User',err)
    localStorage.getItem('token')
    await navigateTo('/',{replace:true})
  }
}
</script>

<style scoped>

</style>