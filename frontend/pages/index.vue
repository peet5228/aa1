<template>
    <v-container fluid class="fill-height">
        <v-row justify="center" align="center">
            <v-col cols="12" md="6" lg="5">
                <div class="container mx-auto px-4 py-12 max-w-md">
                    <v-card rounded="lg">
                        <v-container class="bg" color="">
                            <p class="text-center font-weight-bold text-white text-h5">NTC EVALUATION SYSTEM</p>
                            <p class="text-center font-weight-bold text-white">ระบบประเมินบุคลากรวิทยาลัยเทคนิคน่าน</p>
                        </v-container>
                        <v-card-title class="text-xl text-center font-weight-bold">เข้าสู่ระบบ</v-card-title>
                        <v-card-text>
                            <form class="flex flex-col gap-4" @submit.prevent="Login">
                                <v-text-field v-model="username" label="ชื่อผู้ใช้" prepend-inner-icon="mdi-account-outline" required />
                                <v-text-field v-model="password" label="รหัสผ่าน" :type="showPw ? 'text' : 'password'" :append-inner-icon="showpw ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="showPw = !showPw" prepend-inner-icon="mdi-lock-outline" required />
                                <v-select v-model="role" :items="g" label="ประเภทสมาชิก" prepend-inner-icon="mdi-account-group"></v-select>
                                <v-alert v-if="error" type="error" density="comfortable" variant="tonal">
                                    {{ error }}
                                </v-alert>
                                <v-card-actions class="px-0">
                                    <v-spacer />
                                    <v-btn color="#7d0c14" type="submit">เข้าสู่ระบบ</v-btn>
                                    
                                    <NuxtLink to="/regis"><v-btn color="warning">สมัครสมาชิก</v-btn></NuxtLink>
                                </v-card-actions>
                            </form>
                        </v-card-text>
                    </v-card>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
definePageMeta({
    layout: false
})

import auth from '../API/auth'

const showPw = ref(false)
const username = ref('')
const error = ref('')
const password = ref('')
const role = ref('')
const g = ['ฝ่ายบุคลากร','กรรมการประเมิน','ผู้รับการประเมินผล']

const Login = async () => {
    try{
        const res = await auth.login({
            username:username.value,
            password:password.value,
            role:role.value,
        })
        console.log('API Response : ',res.data)
        localStorage.setItem('token',res.data.token)
        const useRole = res.data.role
        if(useRole === 'ฝ่ายบุคลากร') useRouter().push('/Staff')
        else if(useRole === 'กรรมการประเมิน') useRouter().push('/Committee')
        else if(useRole === 'ผู้รับการประเมินผล') useRouter().push('/Evaluatee')
    }catch(err){
        console.error("Error Login",err)
        error.value = error.response?.data?.message || 'เข้าสู่ระบบไม่สำเร็จ'
    }
}
</script>

<style scoped>
.bg{
    background-color: #7d0c14;
}
</style>