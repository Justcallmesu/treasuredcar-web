import { createStore } from "vuex";

// Modules
import cars from "./Cars/main.js";

const store = createStore({
    modules: {
        cars
    }
})

export default store;