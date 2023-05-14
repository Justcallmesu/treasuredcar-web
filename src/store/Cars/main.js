// Properties
import mutations from "./mutations.js";
import getters from "./getters.js";

const cars = {
    namespaced: true,
    state() {
        carList: []
    },
    mutations,
    getters
}

export default cars;