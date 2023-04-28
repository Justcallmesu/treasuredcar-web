import { createNamespacedHelpers } from "vuex"
const { mapMutations } = createNamespacedHelpers("user");


export default {
    methods: {
        ...mapMutations(["setUserId"]),
        parseCookies(target) {
            const cookies = [document.cookie.split("=")].reduce((acc, curr) => {
                return {
                    ...acc,
                    [curr[0]]: curr[1]
                }
            }, {});
            if (target === "user") this.setUserId(cookies.userToken);
        }
    }
}