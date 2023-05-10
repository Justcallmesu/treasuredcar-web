<template>
    <div class="flex flex-col gap-10 h-full w-2/4 bg-slate-100 rounded-lg py-12 px-12">
        <h1 class="text-3xl font-bold tracking-wider text-center">Daftar</h1>
        <div class="w-full flex flex-col items-center gap-5">
            <div class="form-control">
                <label for="fullName" class="font-bold">Masukkan Nama</label>
                <input type="text" class="form-input" id="fullName" placeholder="Full Name" v-model="fullName">
                <p class="text-red-400">{{ nameError }}</p>
            </div>
            <div class="form-control">
                <label for="email">Masukkan Email</label>
                <input type="email" class="form-input" id="email" placeholder="Example@gmail.com" v-model="email">
                <p class="text-red-400">{{ emailError }}</p>
            </div>
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
            <div class="w-full text-sm flex flex-col gap-1">
                    <p class="font-bold">Sudah punya akun ?</p>
                    <router-link :to="{ name: 'login' }" class="text-primary font-bold">Masuk</router-link>
                </div>
            <button class="form-button" @click="register">Register</button>
        </div>
    </div>
</template>

<script>
// Components
import emailvalidator from "email-validator";

// NPM Modules
import axios from "axios";

// Config
import config from "../../../utils/config.js"

import { createNamespacedHelpers } from 'vuex';
const { mapMutations } = createNamespacedHelpers("otp");

export default{
    data(){
        return{
            // Accessibility
            isVisible:false,
            
            // Input Variable
            email:"",
            fullName:"",
            password:"",
            confirmPassword:"",
            
            // Error
            passwordError:"",
            emailError:"",
            nameError:"",

            // Register Variable
            isValid:true
        }
    },
    computed:{
        getType() {
            if (this.isVisible) {
                return "text";
            }
            return "password";
        },
        getIcons(){
            if (this.isVisible) {
                return { "bi-eye-slash-fill": true };
            }
            return { "bi-eye-fill": true };
        }
    },
    methods:{
        ...mapMutations(["setData"]),
        async register(){
            this.isValid = true;
            this.emailError = this.passwordError = this.nameError = "";

            if(!this.email || !this.fullName || !this.password || !this.confirmPassword){
                this.isValid = false;
                return this.emailError = this.passwordError = this.nameError = "Please fill the data";
            } 

            if (this.fullName.length <= 1 ) {
                this.isValid = false;
                this.nameError = "Seriously ? your name only has 1 character ?"
            }

            if(!emailvalidator.validate(this.email)) {
                this.isValid = false;
                this.emailError = "Invalid Email";
            }

            if(this.password.length < 8 || this.confirmPassword.length < 8 ) {
                this.isValid = false;
                return this.passwordError = "Password length must 8 character or more";
                
            }

            if(this.password !== this.confirmPassword){
                this.isValid = false;
                this.passwordError = "Password and Confirm Password Doesnt Match";
            }

            if(this.isValid){
                try{
                    const response = await axios.post(`${process.env.VUE_APP_serverURL}/api/v1/user/register`,{
                        name:this.fullName,
                        email:this.email,
                        password:this.password,
                        confirmPassword:this.confirmPassword
                    },
                    {
                        headers:config.headers,
                        withCredentials: true
                    })

                    if(response.status === 201){
                        this.setData({email:this.email,actions:"register"})
                        this.$router.replace({name:"OTP"});
                    }
                }catch({response}){
                    if(response.status !== 200 && response.data.message.match(/email/ig)){
                        return this.emailError = response.data.message;
                    }
                }
            }
        }
    }
}
</script>
