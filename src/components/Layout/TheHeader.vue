<template>
  <header
    class="px-5 py-5 fixed top-0 w-full bg-[#efefef] flex z-30 justify-between items-center shadow-lg lg:px-10"
  >
    <router-link to="/" exact-active-class="none">
      <h1 class="font-poppins font-bold tracking-wide text-xl text-[#3E3E3E]">
        Treasured<span class="text-primary">Car</span>
      </h1>
    </router-link>
    <div class="flex flex-row gap-10 justify-center items-center text-sm">
      <router-link to="/" exact-active-class="header">HOME</router-link>
      <router-link to="/cars" exact-active-class="header"
        >CARS FOR BUY</router-link
      >
      <router-link to="/cars/sell" exact-active-class="header" v-if="isSellers">SELL A CAR</router-link>
      <router-link to="/seller/me" exact-active-class="header" v-if="isSellers">MY STORE</router-link>
      <router-link to="/about" exact-active-class="header"
        >ABOUT US</router-link
      >
    </div>
    <div class="flex flex-row gap-5 items-center" v-if="!isLoggedIn">
      <router-link
        :to="{ name: 'login' }"
        class="text-primary border-primary border-2 px-5 py-1 rounded-lg"
        >Login</router-link
      >
      <router-link :to="{ name: 'register' }" class="btn__cta"
        >Register</router-link
      >
    </div>
    <router-link
      to="/account/user/me"
      class="bg-primary py-2 px-3 rounded-2xl flex flex-row items-center gap-5"
      v-if="getUserData"
    >
      <p class="text-white">{{ getUserData.name }}</p>
      <div class="rounded-full overflow-hidden bg-white">
        <img
          :src="getImg(getUserData.photo)"
          :alt="getUserData.name + ' Photo'"
          class="w-10"
        />
      </div>
    </router-link>
  </header>
</template>


<script>
import { createNamespacedHelpers } from "vuex";

const { mapGetters:userGetters } = createNamespacedHelpers("user");
const { mapGetters:sellerGetters } = createNamespacedHelpers("seller");

export default {
  computed: {
    ...userGetters(["isLoggedIn", "getUserData"]),
    ...sellerGetters(["isSellers"]),
    getImg() {
      return (url) => {
        return `${process.env.VUE_APP_serverURL}/users/${url}`;
      };
    },
  },
};
</script>