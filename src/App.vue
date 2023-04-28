<template>
  <router-view/>
</template>

<script>
// Config
import config from "./utils/config.js";

// Vue
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers("user");

// NPM
import axios from 'axios'

export default{
  methods:{
    ...mapMutations(["setUserId"])
  },
  async beforeCreate() {
    try {
      const response = await axios.get(`${process.env.VUE_APP_serverURL}/api/v1/user/getCredentials`,
        {
          withCredentials: true,
          headers: config.headers
        });
      if (response.status === 200) {
        const cookies = [document.cookie.split("=")].reduce((acc, curr) => {
          return {
            ...acc,
            [curr[0]]: curr[1]
          }
        }, {});
        this.setUserId(cookies.userToken);
      }
    } catch { }
  }
}
</script>