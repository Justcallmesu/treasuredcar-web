<template>
    <div class="flex flex-col items-center gap-10 h-full w-2/4 bg-slate-100 rounded-lg py-12 px-12">
        <div class="text-center flex flex-col gap-2" v-if="getActions === 'register'">
            <h1 class="font-bold text-3xl">Daftar</h1>
            <h3>Memastikan Keamanan Akun Anda</h3>
        </div>
        <div class="text-center flex flex-col gap-2" v-if="getActions === 'forgotPassword'">
            <h1 class="font-bold text-3xl">Lupa Password ?</h1>
            <h3>Jangan Khawatir tentang akun anda</h3>
        </div>
        <div>
            <div class="flex justify-center gap-5">
                <input type="text" class="otp" ref="otp-1" @change="changeFocus" maxlength="1">
                <input type="text" class="otp" ref="otp-2" @change="changeFocus" maxlength="1">
                <input type="text" class="otp" ref="otp-3" @change="changeFocus" maxlength="1">
                <input type="text" class="otp" ref="otp-4" @change="changeFocus" maxlength="1">
            </div>
            <p class="text-center text-red-400 mt-5">{{otpError}}</p>
        </div>
        <div class="text-center">
            <p>Kode telah dikirim ke email anda</p>
            <h3 class="font-bold">exampole@gmail.com</h3>
        </div>
        <p>kode ini kadaluarsa dalam 1 jam</p>
        <button class="form-button" @click="sendOTP">Verifikasi</button>
    </div>
</template>

<script>
import axios from 'axios';

// config
import config from '@/utils/config';

import { createNamespacedHelpers } from 'vuex';
const {mapGetters,mapMutations} = createNamespacedHelpers("otp");

export default{
    data(){
        return {
            otpError:""
        }
    },
    computed:{
        ...mapGetters(["getActions","getEmail"]),
        getURL() {
            return (path) => {
                if (this.$route.query.type === "sellers") {
                    return `${path}?type=sellers`
                }
                return path;
            }
        }
    },
    methods:{
        ...mapMutations(["setData"]),
        changeFocus(){
            if(this.$refs["otp-1"].value >= 1){
                this.$refs["otp-2"].focus();
                this.$refs["otp-1"].blur();
            }
            if(this.$refs["otp-2"].value >= 1){
                this.$refs["otp-3"].focus();
                this.$refs["otp-2"].blur();
            }
            if(this.$refs["otp-3"].value >= 1){
                this.$refs["otp-4"].focus();
                this.$refs["otp-3"].blur();
            }
        },
        async sendOTP(){
            this.otpError = "";
            if (!this.$refs["otp-1"].value || !this.$refs["otp-2"].value || !this.$refs["otp-3"].value || !this.$refs["otp-4"].value){
                return this.otpError = "OTP Code must not empty";
            }

            const otpCode = this.$refs["otp-1"].value + this.$refs["otp-2"].value + this.$refs["otp-3"].value + this.$refs["otp-4"].value;
            try{
                const target = this.$route.query.type === "sellers" ? "Seller" : "User";
                const response = await axios.post(`${process.env.VUE_APP_serverURL}/api/v1/otp`,
                {
                    otpCode,
                    email:this.getEmail,
                    type:target
                },
                {
                    headers:config.headers,
                    withCredentials:true
                });

                if(response.status === 200 && this.getActions === "register"){
                    this.setData({email:"",actions:""});
                    this.$router.replace(this.getURL("/auth/login"));
                }

                if(response.status === 200 && this.getActions === "forgotPassword"){
                    this.setData({email:this.getEmail,actions:"forgotPassword",otpCode});
                    this.$router.replace(this.getURL(`/auth/changePassword`));
                }

            }catch(error){
                this.otpError = error?.response?.data.message;
            }
        }
    },
    created(){
        if(!this.getActions) this.$router.replace("/");
    }
}
</script>