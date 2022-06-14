import { createStore } from "redux";
import allReducers from "./Reducers/AllReducers";

const store= createStore(allReducers);

export default store;