export default {
    setData(state, { email, actions, otpCode }) {
        state.email = email;
        state.actions = actions;
        state.otpCode = otpCode;
    }
}