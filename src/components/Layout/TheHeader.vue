<template>
    <header class="px-5 py-5 fixed top-0 w-full bg-[#efefef] flex z-30 justify-between items-center shadow-lg lg:px-20">
        <router-link to="/" exact-active-class="none">
            <h1 class="font-poppins font-bold tracking-wide text-xl text-[#3E3E3E]">Treasured<span class="text-primary">Car</span></h1>
        </router-link>
        <div class="flex flex-row gap-10 items-center text-sm">
            <router-link to="/">HOME</router-link>
            <router-link to="/cars">CARS FOR BUY</router-link>
            <router-link to="/cars/sell">SELL A CAR</router-link>
            <router-link to="/about">ABOUT US</router-link>
            <router-link to="/faqs">FAQS</router-link>
        </div>
            <div class="flex flex-row gap-5 items-center" v-if="!isLoggedIn">
                <router-link :to="{ name: 'login' }" class="text-primary border-primary border-2 px-5 py-1 rounded-lg">Login</router-link>
                <router-link :to="{ name: 'register' }" class="btn__cta">Register</router-link>
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