<template>
    <main class="w-full min-h-screen grid grid-rows-2 md:grid-cols-2 md:grid-rows-none">
        <section class="h-full w-full flex flex-col justify-start bg-gradient-to-b from-[#97e0ab] to-primary p-5">
            <router-link to="/" class="self-start"> <!-- Link to Home Page-->
                <!-- Home SVG -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 600 500" width="35px" height="35px"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
            </router-link>
                <article class="h-full w-full">
                <transition name="fade" mode="out-in"> <!-- Side Information Transition-->
                    <div key="login" v-if="$route.name === 'login'" class="h-full text-center text-white text-lg flex flex-col gap-5 justify-center items-center"> <!-- If Current route == "login" display this-->
                        <h1 class="font-bold text-4xl">Join Us !</h1>
                        <div>
                            <p>Join to access many features such as</p>
                            <p>Buy cars, open a car store and do transactions !</p>
                            <router-link to="/auth/register">
                                <button class="mt-5 bg-white text-primary px-10 py-2 rounded-xl">Sign Up</button>
                            </router-link>
                        </div>
                    </div>
                    <div key="register" v-else class="h-full text-center text-white text-lg flex flex-col gap-5 justify-center items-center">  <!-- else display this-->
                        <h1 class="font-bold text-4xl">Already Have an account ?</h1>
                        <div>
                            <p>Comeback to your account here !</p>
                            <router-link to="/auth/login">
                                <button class="mt-5 bg-white text-primary px-10 py-2 rounded-xl">Login</button>
                            </router-link>
                        </div>
                    </div>
                </transition>
            </article>
        </section>
        <div class="p-10 py-5 flex flex-col-reverse md:flex-col">
            <h1 class="font-poppins font-bold tracking-wide text-xl text-[#3E3E3E]">Treasured<span class="text-primary">Car</span></h1>
                <router-view v-slot="{ Component }">
                    <transition name="fade" mode="out-in">
                        <component :is="Component"></component>
                    </transition>
                </router-view>
        </div>
    </main>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
const { mapGetters } = createNamespacedHelpers("user");

export default{
    computed: {
        ...mapGetters(["isLoggedIn"]),
        checkUser() {
            return this.isLoggedIn;
        }
    },
    watch: {
        // "$store.getters['user/isLoggedIn']":{
        //     handler(val) {
        //         if (this.checkUser) {
        //             this.$router.replace("/");
        //         }
        //     },
        //     deep:true,
        //     immediate:true,
        // }
    }
}

</script>

<style>
.fade-enter-active,
.fade-leave-active{
    transition:1s all ease-in-out;
}

.fade-leave-to,
.fade-enter-from{
    opacity: 0;
}

.fade-enter-to{
    opacity: 1;
}

</style>