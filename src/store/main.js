import { createStore } from "vuex";

// Modules
import cars from "./Cars/main.js";
import user from "./User/main.js";

const store = createStore({
    modules: {
        cars,
        user
    }
})

export default store;