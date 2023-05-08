<template>
  <router-view/>
</template>

<script>
// Config
import config from "./utils/config.js";

// Vue
import { createNamespacedHelpers } from 'vuex'
const { mapMutations,mapGetters } = createNamespacedHelpers("user");

// NPM
import axios from 'axios'

export default{
  methods:{
    ...mapMutations(["setUserId","setUserData"])
  },
  computed:{
    ...mapGetters(["isLoggedIn", "getUserData"]),
  },
  async beforeCreate() {
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
  }
}
</script>