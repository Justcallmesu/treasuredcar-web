import { createStore } from "vuex";

// Modules
import cars from "./Cars/main.js";
import user from "./User/main.js";
import otp from "./otp/main.js";

const store = createStore({
    modules: {
        cars,
        user,
        otp
    }
})

export default store;