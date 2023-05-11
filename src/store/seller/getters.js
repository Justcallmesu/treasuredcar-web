export default {
    isSellers(state) {
        if (state.isSellers) {
            return true;
        }
        return false;
    },
    getSellerData(state) {
        return state.sellerData;
    }
}