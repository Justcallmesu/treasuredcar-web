<template>
    <div class="flex flex-col gap-5 h-full w-2/4 bg-slate-100 rounded-lg py-12 px-12">
        <h1 class="text-3xl text-center font-bold tracking-wider">Masuk</h1>
        <div class="w-full flex flex-col gap-5 items-center">
            <div class="w-full flex flex-col items-center gap-5">
                <div class="form-control">
                    <label for="email" class="font-bold">Masukkan Email</label>
                    <input type="email" id="email" class="form-input" placeholder="Example@gmail.com" v-model="email">
                    <p class="text-red-400">{{emailError}}</p>
                </div>
                <div class="form-control">
                    <label for="password" class="font-bold">Masukkan Password</label>
                    <div class="w-full relative">
                        <i class="bi absolute right-4 top-2 cursor-pointer scale-150 text-[#5E5E5E]" :class="getIcons" @click="isVisible = !isVisible"></i>
                        <input :type="getType" class="form-input pr-10" placeholder="Password" id="password" v-model="password">
                    </div>
                    <p class="text-red-400">{{ passwordError }}</p>
                </div>
            </div>
            <div class="w-full text-sm flex flex-col gap-1">
                <div class="flex justify-between">
                    <p class="font-bold">Belum punya akun ?</p>
                    <router-link :to="{name:'forgotPassword',query: getQuery }" class="text-primary font-bold">Lupa Password ?</router-link>
                </div>
                <router-link :to="{name:'register',query:getQuery}" class="text-primary font-bold">Daftar</router-link>
            </div>
            <button class="form-button" @click="login()">Login</button>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

// NPM Modules
import axios from "axios";
import emailvalidator from "email-validator";

// Config
import config from "../../../utils/config.js"

const {mapMutations:userMutations} = createNamespacedHelpers("user");
const {mapMutations:sellerMutations} = createNamespacedHelpers("seller");

export default{
    data(){
        return {
            email:"",
            password:"",
            emailError:"",
            passwordError:"",
            isVisible:false,
            valid:true
        }
    },
    computed:{
        getType(){
            if (this.isVisible){
                return "text";
            }
            return "password";
        },
        getIcons(){
            if (this.isVisible){
                return { "bi-eye-slash-fill" : true};
            }
            return {"bi-eye-fill":true};
        },
        getQuery(){
            return this.$route.query;
        }
        
    },  
    methods:{
        ...userMutations(["setUserId","setUserData"]),
        ...sellerMutations(["setIsSeller","setSellerData"]),
        resetError(){
            this.emailError = "";
            this.passwordError = "";
            this.valid = true;
        },
        async getUserData(){
            const userData = await axios.get(`${process.env.VUE_APP_serverURL}/api/v1/user/me`,
                {
                    withCredentials: true,
                    headers: config.headers
                }
            );
            if (!userData.status === 200) return

            const { data } = userData;
            this.setUserData(data.data);

            this.setUserId(true);
            this.$router.replace("/");
        },
        async getSellerData(){
            const sellerData = await axios.get(`${process.env.VUE_APP_serverURL}/api/v1/user/me`,
                {
                    withCredentials: true,
                    headers: config.headers
                }
            );
            if (!sellerData.status === 200) return

            const { data } = sellerData;
            this.setSellerData(data.data);

            this.setIsSeller(true);
            this.$router.replace("/");
        },
        async login(){
            this.resetError();
            // Validate Data
            if(!this.email){
                this.emailError = "Email must not empty";
                this.valid = false;
            }

            if(!this.password){
                this.passwordError = "Password must not empty";
                this.valid = false;
            }

            if (this.email && !emailvalidator.validate(this.email)){
                this.emailError ="Invalid Email"
                this.valid = false;
            }

            if (this.password && this.password.length < 8){
                this.passwordError = "Password length must 8 or more characters"
                this.valid = false;
            }

            if (this.valid){
                const target = this.$route.query.type === "sellers" ? "seller":"user";

                // Send user credentials to server and validate more there
                const response = await axios.post(`${process.env.VUE_APP_serverURL}/api/v1/${target}/login`,
                {
                    email:this.email,
                    password:this.password
                },
                {
                    headers:config.headers,
                    withCredentials:true
                }).catch(({response})=>{
                    this.passwordError = this.emailError= response.data.message;
                })

                // Set Cookie value to the state management
                if(!response.status === 200) return;

                if (!(target === "seller")) this.getUserData();
                else this.getSellerData()


            }
        }
    }
}
</script>