<template>
    <div class="flex flex-col items-center gap-10 h-full w-2/4 bg-slate-100 rounded-lg py-12 px-12">
        <div class="form-control">
            <label for="password" class="font-bold">Masukkan Password</label>
            <div class="w-full relative">
                <i class="bi absolute right-4 top-2 cursor-pointer scale-150 text-gray-400" :class="getIcons" @click="isVisible = !isVisible"></i>
                <input :type="getType" class="form-input pr-10" id="password" placeholder="Password" v-model="password">
            </div>
            <p class="text-red-400">{{ passwordError }}</p>
        </div>
        <div class="form-control">
            <label for="confirmPassword" class="font-bold">Masukkan Ulang Password</label>
            <div class="w-full relative">
                <i class="bi absolute right-4 top-2 cursor-pointer scale-150 text-gray-400" :class="getIcons" @click="isVisible = !isVisible"></i>
                <input :type="getType" id="confirmPassword" class="form-input pr-10" placeholder="Confirm Password" v-model="confirmPassword">
            </div>
            <p class="text-red-400">{{ passwordError }}</p>
        </div>
        <button class="form-button" @click="changePassword">Ganti</button>
    </div>
</template>

<script>
import axios from 'axios';

import config from '@/utils/config';

import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapMutations } = createNamespacedHelpers("otp");

export default{
    data(){
        return{
            password: "",
            confirmPassword: "",

            // Error
            passwordError:"",

            // Passsword
            isVisible:false
        }
    },
    computed:{
        ...mapGetters(["getOTP","getEmail","getActions"]),
        getURL() {
            if (this.$route.query.type === "sellers") {
                return "/auth/login?type=sellers"
            }
            return "/auth/login"
        },
        getIcons() {
            if (this.isVisible) {
                return { "bi-eye-slash-fill": true };
            }
            return { "bi-eye-fill": true };
        },
        getType() {
            if (this.isVisible) {
                return "text";
            }
            return "password";
        },
    },
    methods:{
        ...mapMutations(["setData"]),
        async changePassword(){
            this.isValid = true;
            const path = this.$route.query.type ? "seller" : "user";
            this.passwordError = "";

            if(!this.password || !this.confirmPassword){
                this.isValid = false;
                return this.passwordError =  "Please fill the data";
            }
            
            if (this.password.length < 8 || this.confirmPassword.length < 8) {
                this.isValid = false;
                return this.passwordError = "Password length must 8 character or more";
                
            }
            
            if (this.password !== this.confirmPassword) {
                this.isValid = false;
                this.passwordError = "Password and Confirm Password Doesnt Match";
            }
            
            if (this.isValid) {
                try {
                    const response = await axios.patch(`${process.env.VUE_APP_serverURL}/api/v1/${path}/changePassword`, {
                        email:this.getEmail,
                        otpCode:this.getOTP,
                        password:this.password,
                        confirmPassword:this.confirmPassword
                    },
                    {
                        headers: config.headers,
                        withCredentials: true
                    })
                    
                    console.log(response);
                    if (response.status === 201) {
                        this.setData({ email: null, actions: null ,otpCode:null})
                        this.$router.replace(this.getURL);
                    }
                } catch(error) {
                    console.log(error);
                }
            }
        }
    },
    created(){
        if(!this.getActions) this.$router.replace("/");
    }
}
</script>