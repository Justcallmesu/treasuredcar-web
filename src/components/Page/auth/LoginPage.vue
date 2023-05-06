<template>
    <div class="flex flex-col justify-center gap-10 items-center h-full w-full">
        <h1 class="text-3xl font-bold tracking-wider">Login To Your Account</h1>
        <div class="w-full flex flex-col items-center gap-5">
            <div class="form-control">
                <input type="email" class="form-input" placeholder="Example@gmail.com" v-model="email">
                <p class="text-red-400">{{emailError}}</p>
            </div>
            <div class="form-control">
                <div class="w-full relative">
                    <i class="bi absolute right-4 top-2 cursor-pointer scale-150 text-gray-400" :class="getIcons" @click="isVisible = !isVisible"></i>
                    <input :type="getType" class="form-input pr-10" placeholder="Password" v-model="password">
                </div>
                <p class="text-red-400">{{ passwordError }}</p>
            </div>
            <button class="form-button" @click="login()">Login</button>
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
        }
    },  
    methods:{
        resetError(){
            this.emailError = "";
            this.passwordError = "";
            this.valid = true;
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
                // Send user credentials to server and validate more there
                const response = await axios.post(`${process.env.VUE_APP_serverURL}/api/v1/user/login`,
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
                if(response.status === 200){
                    this.setUserId(true);
                    this.$router.replace("/");
                }               
            }
        }
    }
}
</script>