<template>
    <main class="flex flex-row overflow-hidden">
        <div class="w-1/6 min-h-screen bg-primary p-5">
            <router-link to="/">
                <i class="bi bi-arrow-left text-3xl"></i>
            </router-link>
            <div class="mt-2 text-white flex flex-col gap-4 pl-5 pr-10">
                <div>
                    <h1 class="text-xl font-bold">User</h1>
                    <hr>
                </div>
                <router-link :to="{name:'userProfile'}" exact-active-class="profile" class="flex flex-row items-center gap-5 userPage-link">
                    <i class="bi bi-person-fill text-2xl"></i>
                    <h3>Profile</h3>
                </router-link>
                <router-link to="/account/user/transactions" exact-active-class="profile" class="flex flex-row items-center gap-5 userPage-link">
                    <i class="bi bi-cash text-2xl"></i>
                    <h3>Transactions</h3>
                </router-link>
                <router-link to="/uaser/booking" exact-active-class="profile" class="flex flex-row items-center gap-5 userPage-link">
                    <i class="bi bi-clipboard-check text-2xl"></i>
                    <h3>Booking</h3>
                </router-link>
            </div>
            <div class="mt-20 text-white flex flex-col gap-4 pl-5 pr-10">
                <div>
                    <h1 class="text-xl font-bold">Seller</h1>
                    <hr>
                </div>
                <div v-if="isSellers" class="flex flex-col gap-5">
                    <router-link to="/account/seller/me" exact-active-class="profile" class="flex flex-row items-center gap-5 userPage-link">
                        <i class="bi bi-person-fill text-2xl"></i>
                        <h3>Seller Profile</h3>
                    </router-link>
                    <router-link to="/account/seller/transactions" exact-active-class="profile" class="flex flex-row items-center gap-5 userPage-link">
                        <i class="bi bi-cash text-2xl"></i>
                        <h3>Seller Transactions</h3>
                    </router-link>
                    <router-link to="/uaser/booking" exact-active-class="profile" class="flex flex-row items-center gap-5 userPage-link">
                        <i class="bi bi-clipboard-check text-2xl"></i>
                        <h3>Seller Booking</h3>
                    </router-link>
                </div>
                <div v-else>
                    <router-link :to="{ name: 'login',query:{type:'sellers'} }" exact-active-class="profile" class="flex flex-row items-center gap-5 userPage-link">
                            <i class="bi bi-person-fill text-2xl"></i>
                            <h3>Login As Seller</h3>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="w-full">
            <div class="w-full px-5 py-3 shadow-lg flex items-center">
                <h3 class="text-lg">{{ getTitle }}</h3>
            </div>
            <router-view :key="$route.fullPath" class="px-5 py-5"></router-view>
        </div>
    </main>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const {mapGetters} = createNamespacedHelpers("seller")

export default{
    computed:{
        ...mapGetters(["isSellers"]),
        getTitle(){
            const routeName = this.$route.name;

            if(routeName) return "My Profile"
        }
    }
}
</script>