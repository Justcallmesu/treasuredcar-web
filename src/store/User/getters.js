export default {
    isLoggedIn(state) {
        if (state.userToken) {
            return true;
        }
        return false;
    }
}