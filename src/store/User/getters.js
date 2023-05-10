export default {
    isLoggedIn(state) {
        if (state.userToken) {
            return true;
        }
        return false;
    },
    getUserData(state) {
        return state.userData;
    }
}