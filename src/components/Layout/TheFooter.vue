<template>
    <footer class="bg-primary py-8 px-20 w-full">
        <h1 class="text-white text-3xl font-bold text-center">TREASUREDCAR</h1>
        <div class="flex flex-row gap-10 items-center justify-center text-sm mt-5">
            <router-link to="/" exact-active-class="footer">HOME</router-link>
            <router-link to="/cars" exact-active-class="footer">CARS FOR BUY</router-link>
            <router-link to="/cars/sell" exact-active-class="footer" v-if="isSellers">SELL A CAR</router-link>
            <router-link to="/seller/me" exact-active-class="footer" v-if="isSellers">MY STORE</router-link>
            <router-link to="/about" exact-active-class="footer">ABOUT US</router-link>
        </div>
        <hr class="border-white mt-6">
        <p class="text-gray-200 text-sm text-center mt-5">COPYRIGHT &copy; 2023 BY SECONDCAR GROUP TREASUREDCAR</p>
    </footer>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters: sellerGetters } = createNamespacedHelpers("seller");

export default {
    computed: {
        ...sellerGetters(["isSellers"]),
    },
};
</script>