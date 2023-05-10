<template>
  <router-view v-slot="{Component}">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script>
// Config
import config from "./utils/config.js";

// Vue
import { createNamespacedHelpers } from 'vuex'

const { mapMutations: userMutations} = createNamespacedHelpers("user");
const { mapMutations: sellerMutations } = createNamespacedHelpers("seller");
// NPM
import axios from 'axios'

export default{
  methods:{
    ...userMutations(["setUserId", "setUserData"]),
    ...sellerMutations(["setIsSeller", "setSellerData"]),
    async getUserData(){
      try {
        const response = await axios.get(`${process.env.VUE_APP_serverURL}/api/v1/user/getCredentials`,
          {
            headers: config.headers,
            withCredentials: true
          });
        if (response.status === 200) {
          this.setUserId(true);

          const userData = await axios.get(`${process.env.VUE_APP_serverURL}/api/v1/user/me`,
            {
              withCredentials: true,
              headers: config.headers
            }
          );
          if (userData.status === 200) {
            const { data } = userData;
            this.setUserData(data.data);
          }
        }

      } catch { }
    },
    async getSellerData(){
      try {
        const response = await axios.get(`${process.env.VUE_APP_serverURL}/api/v1/seller/getCredentials`,
          {
            headers: config.headers,
            withCredentials: true
          });
        if (response.status === 200) {
          this.setIsSeller(true);

          const sellerData = await axios.get(`${process.env.VUE_APP_serverURL}/api/v1/seller/me`,
            {
              withCredentials: true,
              headers: config.headers
            }
          );
          if (sellerData.status === 200) {
            const { data } = sellerData;
            this.setSellerData(data.data);
          }
        }
      } catch { }
    }
  },
  async created() {
      await Promise.all([this.getUserData(),this.getSellerData()])
  }
}
</script>