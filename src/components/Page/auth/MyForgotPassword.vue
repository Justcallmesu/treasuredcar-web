<template>
    <div class="flex flex-col items-center gap-10 h-full w-2/4 bg-slate-100 rounded-lg py-12 px-12">
        <h1 class="text-2xl font-bold">Lupa Password</h1>
        <div class="w-full">    
            <h3 class="font-bold">Pesan</h3>
            <p>Masukkan email dan otp akan dikirim</p>
        </div>

        <div class="form-control">
            <label for="email">Masukkan Email</label>
            <input type="email" id="email" class="form-input" placeholder="Example@gmail.com" v-model="email">
            <p class="text-red-400">{{ emailError }}</p>
        </div>

        <button class="form-button" @click="forgotPassword">Kirim</button>
    </div>
</template>

<script>

// NPM
import emailvalidator from "email-validator";
import axios from 'axios';

// config
import config from "../../../utils/config";

import { createNamespacedHelpers } from 'vuex';

const {mapMutations} = createNamespacedHelpers("otp");

export default{
    data(){
        return{
            email:"",
            emailError:""
        }
    },
    methods:{
        ...mapMutations(["setData"]),
        async forgotPassword(){
            this.emailError = "";
            if(!this.email) return this.emailError ="Email must not empty";
            if(!emailvalidator.validate(this.email)) return this.emailError = "Invalid Email";

            const response = await axios.patch(`${process.env.VUE_APP_serverURL}/api/v1/user/forgotPassword`,
            {
                email:this.email
            },
            {
                headers:config.headers,
                withCredentials:true
            })

            if(response.status === 201){
                this.setData({email:this.email,actions:"register"});
                this.$router.replace("/auth/otp");
            }

        }
    }
}
</script>