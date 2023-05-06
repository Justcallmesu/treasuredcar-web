<template>
    <header class="px-5 py-5 fixed top-0 w-full bg-[#efefef] flex z-30 justify-between items-center shadow-lg lg:px-20">
        <router-link to="/">
            <h1 class="font-poppins font-bold tracking-wide text-xl text-[#3E3E3E]">Treasured<span class="text-primary">Car</span></h1>
        </router-link>
        <div class="hidden md:flex md:flex-row md:gap-10">
            <div class="flex flex-row gap-5 items-center">
                <i class="bi bi-search text-gray-800 text-2xl"></i>
                <i class="bi bi-cart text-gray-800 text-2xl" v-if="isLoggedIn"></i>
                <i class="bi bi-person text-gray-800 text-3xl" v-if="isLoggedIn"></i>
                <button @click="logOut" v-if="isLoggedIn">Logout</button>
            </div>
            <div class="flex flex-row gap-5 items-center" v-if="!isLoggedIn">
                <router-link :to="{ name: 'login' }" class="btn__cta">Login</router-link>
                <router-link :to="{ name: 'register' }" class="btn__cta">Register</router-link>
            </div>
        </div>
    </header>
</template>


<script>
// NPM Modules
import axios from "axios";

// Config
import config from "../../utils/config.js"

import { createNamespacedHelpers } from 'vuex';

const {mapGetters,mapMutations} = createNamespacedHelpers("user");

export default{
    computed:{
        ...mapGetters(["isLoggedIn"])
    },
    methods:{
        ...mapMutations(["setUserId"]),
        async logOut(){
        const response = await axios.get(`${process.env.VUE_APP_serverURL}/api/v1/user/logout`,
                {
                    headers: config.headers,
                    withCredentials: true
                }).catch(({ response }) => {
                    this.passwordError = this.emailError = response.data.message;
                })
        if (response.status === 200) {
            this.setUserId(false);
        }
    }
    }
}
</script>