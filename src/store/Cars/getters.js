export default {
    getCarsList(state) {
        return state.carList;
    },
    getSelectedCar(state) {
        return (id) => state.carList.find((car) => car._id = id);
    }
}