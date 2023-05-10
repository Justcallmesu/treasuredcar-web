import { createStore } from "vuex";

// Modules
import cars from "./Cars/main.js";
import user from "./User/main.js";
import otp from "./otp/main.js";
import seller from "./seller/main.js";

const store = createStore({
    modules: {
        cars,
        user,
        otp,
        seller
    }
})

export default store;