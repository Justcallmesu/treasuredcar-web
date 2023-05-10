// Properties
import mutations from "./mutations.js";
import getters from "./getters.js";

const sellers = {
    namespaced: true,
    state() {
        return {
            isSellers: null,
            sellerData: null
        }
    },
    mutations,
    getters
}

export default sellers;