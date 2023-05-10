import getters from "./getters.js"
import mutations from "./mutations.js"

const otp = {
    namespaced: true,
    state() {
        return {
            actions: "",
            email: ""
        }
    },
    getters,
    mutations
}

export default otp;