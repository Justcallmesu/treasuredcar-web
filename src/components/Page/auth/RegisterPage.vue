<template>
    <div class="flex flex-col justify-center gap-10 items-center h-full w-full">
        <h1 class="text-3xl font-bold tracking-wider">Create Your Account</h1>
        <div class="w-full flex flex-col items-center gap-5">
            <div class="form-control">
                <input type="text" class="form-input" placeholder="Full Name" v-model="fullName">
                <p class="text-red-400">{{ nameError }}</p>
            </div>
            <div class="form-control">
                <input type="email" class="form-input" placeholder="Example@gmail.com" v-model="email">
                <p class="text-red-400">{{ emailError }}</p>
            </div>
            <div class="form-control">
                <div class="w-full relative">
                    <i class="bi absolute right-4 top-2 cursor-pointer scale-150 text-gray-400" :class="getIcons" @click="isVisible = !isVisible"></i>
                    <input :type="getType" class="form-input pr-10" placeholder="Password" v-model="password">
                </div>
                <p class="text-red-400">{{ passwordError }}</p>
            </div>
            <div class="form-control">
                <div class="w-full relative">
                    <i class="bi absolute right-4 top-2 cursor-pointer scale-150 text-gray-400" :class="getIcons" @click="isVisible = !isVisible"></i>
                    <input :type="getType" class="form-input pr-10" placeholder="Confirm Password" v-model="confirmPassword">
                </div>
                <p class="text-red-400">{{ passwordError }}</p>
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
                        this.$router.replace({name:"login"});
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
