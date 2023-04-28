import mutations from "./mutations.js";
import getters from "./getters.js";

const user = {
    namespaced: true,
    state() {
        return {
            userToken: null
        }
    },
    mutations,
    getters
}

export default user;